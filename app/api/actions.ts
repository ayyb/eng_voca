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

    await sql`
      INSERT INTO users (username, password, name, created_at, member_level)
      VALUES (${data.id}, ${data.pw}, ${data.name}, NOW(), 'BRONZE');
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
export async function fetchLevelWords(level?: string): Promise<Word[]> {
  try {
    const result = await sql<Word>`
      SELECT vocas.*
      FROM vocas
      ORDER BY RANDOM()
      LIMIT 10;
    `;

    if (result.rowCount === 0) throw new Error("No words found");
    return result.rows;
  } catch (error) {
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
        message: "아이디와 비밀번호를 입력해주세요.",
        errors: {
          id: "아이디를 입력해주세요.",
          password: "비밀번호를 입력해주세요."
        }
      }
    }

    // 로그인 시도
    const result = await signIn("credentials", {
      redirect: false,  // 자동 리다이렉트 방지
      ...Object.fromEntries(formData),
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    // 로그인 성공 시 store 업데이트
    useUserStore.getState().setUser(id, id); // 실제 이름 데이터로 수정 필요
    
    // 리다이렉트
    redirect("/home");
    return { message: "로그인 성공", errors: {} };

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
            message: "login fail, 로그인 처리 중 오류가 발생했습니다",
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

// ✅ 퀴즈 문제 생성 (랜덤 10개)
export async function fetchQuiz() {
  try {
    const data = await sql<Answers>`
      SELECT word, example, example_kr FROM vocas ORDER BY RANDOM() LIMIT 10;
    `;
    return data.rows;
  } catch (error) {
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

  try {
    const data = await sql`
      SELECT current_progress, total_words 
      FROM learning_progress 
      WHERE user_id = ${userId};
    `;
    
    if (data.rows.length === 0) {
      return { progress: 0, total: 0 };
    }
    
    return {
      progress: data.rows[0].current_progress,
      total: data.rows[0].total_words
    };
  } catch (error) {
    console.error('학습 진행도 조회 중 오류 발생:', error);
    return { progress: 0, total: 0 };
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

  console.log("userId", userId);
  console.log("progress", progress);
  console.log("total", total);

  try {
    await sql`
      INSERT INTO learning_progress (user_id, current_progress, total_words, study_date, created_at, updated_at)
      VALUES (${userId}, ${progress}, ${total}, CURRENT_DATE, NOW(), NOW())
      ON CONFLICT (user_id, study_date) 
      DO UPDATE SET 
        current_progress = ${progress}, 
        total_words = ${total}, 
        updated_at = NOW();
    `;

    return { success: true };
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
