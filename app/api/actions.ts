"use server"; // authV5 사용시 필요함.
import { sql } from "@vercel/postgres";
import { Word } from "@/app/lib/types";
import { Words, Voca, QuizResult, Answers } from "@/app/lib/definitions";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { MemberInfo, Choice } from "../lib/definitions";
import { redirect } from "next/navigation";
import { signIn, auth, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { useUserStore } from "@/store/userStore";
import { VocaLevel } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';

type State = {
  message: string;
  errors: {
    id?: string;
    password?: string;
    name?: string;
    passwordConfirm?: string;
  };
};


// ✅ 회원 생성
export async function createMember(prevState: State, formData: FormData): Promise<State> {
  try {
    const schema = z.object({
      id: z.string().min(1),
      pw: z.string().min(1),
      name: z.string().min(1),
    });

    const data = schema.parse({
      id: formData.get("id"),
      pw: formData.get("pw"),
      name: formData.get("name"),
    });

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(data.pw, 10);

    await sql`
      INSERT INTO users (username, password, name, created_at, member_level)
      VALUES (${data.id}, ${hashedPassword}, ${data.name}, NOW(), 'BRONZE');
    `;

    revalidatePath("/home");
    return { message: `Added new member`, errors: {} };
  } catch (error) {
    return { message: "Failed to create member", errors: { id: "Error creating member" } };
  }
}

// ✅ 회원 정보 조회
export async function fetchMember(): Promise<MemberInfo> {
  try {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const userId = session.user.id;

    const data = await sql<MemberInfo>`
      SELECT id, username, name, 
             TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at, member_level 
      FROM users WHERE id = ${userId};
    `;

    if (data.rowCount === 0) throw new Error("Member not found");
    return data.rows[0];
  } catch (error) {
    throw new Error("Error fetching member");
  }
}

// ✅ 단어 조회 (레벨별)
export async function fetchLevelWords(level: string): Promise<Word[]> {
  try {
    let wordLevel: VocaLevel;
    const TODAY_LIMIT = 10;
    const LEVEL_LIMIT = 30;
    const session = await auth();
    const userId = session?.user?.id;

    switch (level) {
      case 'today':
        // 오늘 날짜 구하기
        const today = new Date().toISOString().split('T')[0];
        
        // 1. 먼저 오늘 날짜에 해당하는 단어 세트가 있는지 확인
        const existingSet = await sql`
          SELECT voca_ids FROM daily_word_sets 
          WHERE user_id = ${userId} AND study_date = ${today}::date;
        `;
        
        // 2. 이미 오늘 날짜의 단어 세트가 있으면 해당 단어들 반환
        if (existingSet.rows.length > 0 && existingSet.rows[0].voca_ids) {
          // JSON 문자열에서 배열로 변환
          const vocaIds = JSON.parse(existingSet.rows[0].voca_ids);
          
          // 각 ID에 대해 개별적으로 쿼리하고 결과를 합침
          const words: Word[] = [];
          for (const id of vocaIds) {
            const result = await sql<Word>`
              SELECT * FROM vocas WHERE id = ${id};
            `;
            if (result.rows.length > 0) {
              words.push(result.rows[0]);
            }
          }
          
          return words;
        }
        
        // 3. 오늘 날짜의 단어 세트가 없으면 랜덤으로 10개 선택하여 저장
        const randomWords = await sql<Word>`
          SELECT * FROM vocas 
          ORDER BY RANDOM() 
          LIMIT ${TODAY_LIMIT};
        `;
        
        if (randomWords.rows.length > 0) {
          // 선택된 단어 ID 배열 생성
          const vocaIds = randomWords.rows.map(word => word.id);
          // 배열을 JSON 문자열로 변환
          const vocaIdsJson = JSON.stringify(vocaIds);
          
          // 날짜별 단어 세트 저장
          await sql`
            INSERT INTO daily_word_sets (user_id, study_date, voca_ids, created_at)
            VALUES (${userId}, ${today}::date, ${vocaIdsJson}, NOW())
            ON CONFLICT (user_id, study_date)
            DO UPDATE SET voca_ids = ${vocaIdsJson}, updated_at = NOW();
          `;
        }
        
        return randomWords.rows;
      case 'basic':
        wordLevel = VocaLevel.BASIC;
        break;
      case 'middle':
        wordLevel = VocaLevel.MIDDLE;
        break;
      case 'advance':
        wordLevel = VocaLevel.ADVANCE;
        break;
      case 'expert':
        wordLevel = VocaLevel.EXPERT;
        break;
      default:
        throw new Error("Invalid level");
    }

    const result = await sql<Word>`
      SELECT * FROM vocas 
      WHERE word_level = ${wordLevel}
      ORDER BY RANDOM() 
      LIMIT ${LEVEL_LIMIT};
    `;

    if (result.rowCount === 0) throw new Error("No words found");
    return result.rows;
  } catch (error) {
    console.error("단어 조회 중 오류 발생:", error);
    throw new Error("Error fetching words");
  }
}

// ✅ 좋아요 추가
export async function addLikeWord(Likes: { user: number; word: number }) {
  try {
    await sql`
      INSERT INTO likes (user_id, voca_id, created_at) 
      VALUES (${Likes.user}, ${Likes.word}, NOW());
    `;
    return { message: "Added to Like Word" };
  } catch (error) {
    throw new Error("Error adding like word");
  }
}

// ✅ 좋아요 삭제
export async function deleteLikeWord(Likes: { user: number; word: number }) {
  try {
    await sql`
      DELETE FROM likes WHERE user_id = ${Likes.user} AND voca_id = ${Likes.word};
    `;
    return { message: "Deleted Like Word" };
  } catch (error) {
    throw new Error("Error deleting like word");
  }
}

// ✅ 좋아요한 단어 조회
export async function fetchLikeWords(user: number): Promise<Word[]> {
  try {
    const data = await sql<Word>`
      SELECT vocas.* 
      FROM likes 
      JOIN vocas ON likes.voca_id = vocas.id 
      WHERE likes.user_id = ${user};
    `;
    return data.rows;
  } catch (error) {
    throw new Error("Error fetching liked words");
  }
}

// ✅ 단어 조회
export async function fetchWord(vocaId: number): Promise<Voca> {
  try {
    const data = await sql<Voca>`
      SELECT * FROM vocas WHERE id = ${vocaId}; -- 'no' → 'id' 변경
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    throw new Error("Error fetching word");
  }
}

// ✅ 특정 회원이 좋아요한 단어 조회
export async function fetchLikeWord(): Promise<Words[]> {
  try {
    const session = await auth();
    console.log("session", session);

    if (!session?.user?.id) {
      redirect("/login");
    }

    const userId = session?.user?.id;

    const data = await sql<Words>`
      SELECT 
        vocas.id AS voca_id, 
        vocas.word, 
        vocas.definition, 
        likes.created_at AS liked_at, 
        vocas.definition_kr,
        vocas.example, 
        vocas.example_kr
      FROM likes
      JOIN vocas ON likes.voca_id = vocas.id
      WHERE likes.user_id = (SELECT id FROM users WHERE id = ${userId});
    `;
    console.log("data", data.rows);
    return data.rows;
  } catch (error) {
    console.error("Error fetching liked words:", error);
    throw new Error("Error fetching liked words");
  }
}


export async function authenticate(
  state: State | undefined,
  formData: FormData
): Promise<State | undefined> {
  try {
    const id = formData.get("id") as string;
    const pw = formData.get("pw");

    if(!id || !pw) {
      return {
        message: "",
        errors: {
          id: id ? "" : "아이디를 입력해주세요.",
          password: pw ? "" : "비밀번호를 입력해주세요."
        }
      }
    }

    // 로그인 시도
    await signIn("credentials", {
      redirect: false,  // 자동 리다이렉트 방지
      ...Object.fromEntries(formData),
    });

    // 로그인 성공 시 store 업데이트
    useUserStore.getState().setUser(id, id); // 실제 이름 데이터로 수정 필요
    // return { message: "로그인 성공", errors: {} };
    // 리다이렉트
    redirect("/home");

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "로그인에 실패했습니다",
            errors: {
              id: "존재하지 않는 아이디입니다",
              password: "비밀번호가 틀립니다"
            }
          };
        default:
          return {
            message: "로그인 실패, 아이디 또는 패스워드를 확인해주세요.",
            errors: {
              id: "",
              password: ""
            }
          };
      }
    }
    throw error;
  }
}

// ✅ 퀴즈용 단어 조회
export async function fetchQuiz(levels: string[], count: number): Promise<Word[]> {
  try {
    const hasLikes = levels.includes('likes');
    const otherLevels = levels.filter(level => level !== 'likes');
    
    // likes만 선택된 경우 먼저 확인
    if (hasLikes && otherLevels.length === 0) {
      const session = await auth();
      if (!session?.user?.id) redirect('/login');
      
      // 좋아요 단어 수 먼저 확인
      const likeCount = await sql`
        SELECT COUNT(*) as count 
        FROM likes 
        WHERE user_id = ${session.user.id}
      `;
      
      if (likeCount.rows[0].count === 0) {
        throw new Error("좋아요된 단어가 없습니다. 다른 카테고리를 선택해주세요.");
      }
    }

    const wordsPerLevel = Math.floor(count / (hasLikes ? levels.length : otherLevels.length));
    let queries = [];
    
    if (hasLikes) {
      const session = await auth();
      if (!session?.user?.id) redirect('/login');
      
      queries.push(sql<Word>`
        SELECT DISTINCT vocas.* 
        FROM vocas 
        JOIN likes ON vocas.id = likes.voca_id 
        WHERE likes.user_id = ${session.user.id}
        ORDER BY RANDOM() 
        LIMIT ${wordsPerLevel}
      `);
    }
    
    // 레벨별 단어 쿼리
    otherLevels.forEach(level => {
      let wordLevel;
      switch (level) {
        case 'basic': wordLevel = VocaLevel.BASIC; break;
        case 'middle': wordLevel = VocaLevel.MIDDLE; break;
        case 'advance': wordLevel = VocaLevel.ADVANCE; break;
        case 'expert': wordLevel = VocaLevel.EXPERT; break;
      }
      
      queries.push(sql<Word>`
        SELECT * FROM vocas 
        WHERE word_level = ${wordLevel}
        ORDER BY RANDOM() 
        LIMIT ${wordsPerLevel}
      `);
    });
    
    // 모든 쿼리 실행
    const results = await Promise.all(queries);
    
    // 결과 합치기 및 섞기
    const allWords = results.flatMap(result => result.rows);
    
    // 결과를 랜덤하게 섞기
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
    
    return allWords.slice(0, count);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error fetching quiz");
  }
}

// ✅ 퀴즈 보기 선택지 생성 (랜덤 3개)
export async function fetchChoiceWords() {
  try {
    const data = await sql<Choice>`
      SELECT word FROM vocas ORDER BY RANDOM() LIMIT 3;
    `;
    return data.rows;
  } catch (error) {
    throw new Error("Error fetching choice words");
  }
}







// //점수 계산
// const result = { score: 0, total: 0 };

// //정답
// export async function scoreCalculation(correct: number, sum: number) {
//   console.log("점수", correct);
//   result.score = correct;
//   result.total = sum;
// }

// ✅ 퀴즈 점수 조회
export async function fetchScore() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    console.log("userId", userId);

    const data = await sql`
      SELECT score, total_count 
      FROM quiz_results 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC 
      LIMIT 1;
    `;
    
    // 데이터가 없는 경우 기본값 반환
    if (data.rows.length === 0) {
      return { score: 0, total: 0 };
    }
    
    return { 
      score: data.rows[0].score, 
      total: data.rows[0].total_count 
    };
  } catch (error) {
    console.error("점수 조회 중 오류 발생:", error);
    return { score: 0, total: 0 };
  }
}

// ✅ 퀴즈 결과 저장
export async function setQuizList(content: QuizResult) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    
    // answers 배열을 JSON 문자열로 변환 후 JSONB로 변환
    const answersJson = JSON.stringify(content.answers);

    await sql`
      INSERT INTO quiz_results (user_id, score, total_count, answers)
      VALUES (${userId}, ${content.score}, ${content.total_count}, ${answersJson}::jsonb);
    `;

    return { message: 'Quiz result saved' };
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Error saving quiz result");
  }
}

// ✅ 학습 진행도 조회
export async function fetchLearningProgress() {
  const session = await auth();
  const userId = session?.user?.id;
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜

  console.log("학습 진행도 조회 - userId:", userId);
  console.log("학습 진행도 조회 - today:", today);

  try {
    const data = await sql`
      SELECT current_progress, total_words, study_date 
      FROM learning_progress 
      WHERE user_id = ${userId}
      ORDER BY study_date DESC
      LIMIT 1;
    `;
    
    if (data.rows.length === 0) {
      console.log("학습 진행도 없음, 초기값 반환");
      return { progress: 0, total: 0, date: today };
    }
    
    const result = {
      progress: data.rows[0].current_progress,
      total: data.rows[0].total_words,
      date: data.rows[0].study_date ? new Date(data.rows[0].study_date).toISOString().split('T')[0] : today
    };
    
    console.log("학습 진행도 조회 결과:", result);
    return result;
  } catch (error) {
    console.error('학습 진행도 조회 중 오류 발생:', error);
    return { progress: 0, total: 0, date: today };
  }
}

// ✅ 최근 퀴즈 결과 조회
export async function getQuizList() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const data = await sql`
      SELECT answers 
      FROM quiz_results 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC 
      LIMIT 1;
    `;

    return data.rows[0].answers;
  } catch (error) {
    console.error("Error fetching quiz result:", error);
    return [];
  }
}


// ✅ 학습 진행도 업데이트
export async function updateLearningProgress(progress: number, total: number) {
  const session = await auth();
  const userId = parseInt(session?.user?.id ?? "0");
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜

  console.log("학습 진행도 업데이트 요청:", { userId, progress, total, today });

  try {
    // 1. 먼저 현재 저장된 진행도를 확인
    const currentProgress = await sql`
      SELECT current_progress 
      FROM learning_progress 
      WHERE user_id = ${userId} AND study_date = ${today}::date;
    `;
    
    // 2. 현재 저장된 진행도가 있고, 새로운 진행도가 더 작거나 같으면 업데이트하지 않음
    if (currentProgress.rows.length > 0) {
      const savedProgress = currentProgress.rows[0].current_progress;
      
      if (progress <= savedProgress) {
        console.log("이미 더 높은 진행도가 저장되어 있어 업데이트하지 않습니다:", { savedProgress, newProgress: progress });
        return { 
          success: true, 
          message: "이미 더 높은 진행도가 저장되어 있어 업데이트하지 않습니다.",
          progress: savedProgress
        };
      }
    }
    
    // 3. 진행도가 더 크거나 저장된 진행도가 없는 경우에만 업데이트
    console.log("진행도 업데이트:", { progress, total });
    await sql`
      INSERT INTO learning_progress (user_id, current_progress, total_words, study_date, created_at, updated_at)
      VALUES (${userId}, ${progress}, ${total}, ${today}::date, NOW(), NOW())
      ON CONFLICT (user_id, study_date) 
      DO UPDATE SET 
        current_progress = ${progress}, 
        total_words = ${total}, 
        updated_at = NOW();
    `;

    return { 
      success: true,
      message: "진행도가 성공적으로 업데이트되었습니다.",
      progress
    };
  } catch (error) {
    console.error("Error updating learning progress:", error);
    throw new Error("Error updating learning progress");
  }
}


// ✅ 현재 비밀번호 확인
export async function verifyCurrentPassword(currentPassword: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const data = await sql`
      SELECT password FROM users 
      WHERE id = ${session.user.id} 
      AND password = ${currentPassword};
    `;
    
    return { isValid: data.rows.length > 0 };

  } catch (error) {
    throw new Error('비밀번호 확인 실패');
  }
}

// ✅ 비밀번호 변경
export async function updatePassword(newPassword: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    await sql`
      UPDATE users 
      SET 
        password = ${newPassword},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${session.user.id};
    `;
    
    return { message: "success" };
  } catch (error) {
    throw new Error('비밀번호 변경 실패');
  }
}

// ✅ 좋아요 개수 조회
export async function getLikesCount(): Promise<number> {
  try {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const result = await sql`
      SELECT COUNT(*) as count 
      FROM likes 
      WHERE user_id = ${session.user.id}
    `;
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Error fetching likes count:', error);
    throw new Error('Failed to fetch likes count');
  }
}
