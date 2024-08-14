'use server' // authV5 사용시 필요함.
import { QueryResultRow, sql } from "@vercel/postgres";
import { Word } from "@/app/lib/types";
import { Words, Voca,QuizResult,Answers } from "@/app/lib/definitions";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { MemberInfo,Choice } from "../lib/definitions";

import { signIn,auth } from "@/auth";
import { AuthError } from "next-auth";



export async function createMember(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log("작동함?");
  console.log(formData.get("id"));
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
    console.log("데이터 받음", data);
    await sql`
      INSERT INTO members (id, pw, name, created_at, member_level)
      VALUES (${data.id}, ${data.pw}, ${data.name}, now(), 1);
    `;
    // 페이지를 다시 검증하여 최신 데이터로 갱신
    revalidatePath("/home");
    // redirect('/login');
    return { message: `Added to new Member` };
  } catch (error) {
    return { message: "Failed to create member" };
  }
}

export async function fetchMember(userId : string): Promise<MemberInfo> {
  try {
    const data = await sql<MemberInfo>`
        SELECT no, id, pw, name, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at, member_level FROM members WHERE id = ${userId};
      `;

    if (data.rowCount === 0) {
      throw new Error("Member not found");
    }

    // return NextResponse.json({ member: result.rows[0] }, { status: 200 });
    // const latestInvoices = .map((invoice) => ({
    //   ...invoice,
    // }));
    console.log('data', data.rows[0]);
    return data.rows[0];
  } catch (error) {
    throw new Error("Error");
  }
}

export async function fetchLevelWords(
  level: number,
  memberId: number
): Promise<Word[]> {
  try {
    let result;

    // If level is 9, fetch all words randomly
    if (level === 9) {
      result = await sql<Word>`
             SELECT 
        vocas.*,
        EXISTS (
          SELECT 1 
          FROM likes 
          WHERE likes.voca_id = vocas.word_no 
          AND likes.member_id = ${memberId}
        ) as liked
      FROM vocas
      ORDER BY RANDOM()
      LIMIT 30;
      `;
    } else {
      result = await sql<Word>`
              SELECT 
        vocas.*,
        EXISTS (
          SELECT 1 
          FROM likes 
          WHERE likes.voca_id = vocas.word_no 
          AND likes.member_id = ${memberId}
        ) as liked
      FROM vocas
      WHERE vocas.word_level = ${level};
      `;
    }

    if (result.rowCount === 0) {
      throw new Error("No words found for this level");
    }

    return result.rows;
  } catch (error) {
    throw new Error("error");
  }
}

export async function addLikeWord(Likes: { member: number; word: number }) {
  try {
    const result = await sql`
      INSERT INTO likes (member_id, voca_id, liked_at) VALUES (${Likes.member}, ${Likes.word}, CURRENT_DATE);
    `;
    return { message: `Added to new Like Word` };
  } catch (error) {
    throw new Error("error");
  }
}

export async function deleteLikeWord(Likes: { member: number; word: number }) {
  try {
    const result = await sql`
          DELETE FROM likes
      WHERE member_id = ${Likes.member} AND voca_id = ${Likes.word};
    `;

    return { message: `deleted to new Like Word` };
  } catch (error) {
    throw new Error("error");
  }
}

export async function fetchLikeWords(member: number): Promise<Words[]> {
  try {
    const data = await sql<Words>`
      SELECT * FROM likes WHERE member_id = ${member};
    `;

    if (data.rowCount === 0) {
      throw new Error("No words found for this level");
    }

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
    }));
    return latestInvoices;
  } catch (error) {
    throw new Error("error");
  }
}

//단어자체 조회
export async function fetchWord(vocaId: number): Promise<Voca> {
  try {
    const data = await sql<Voca>`
      SELECT * FROM vocas WHERE no = ${vocaId};
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Error fetching word:", error);
    throw new Error("Error fetching word");
  }
}

//특정회원의 좋아요한 단어를 조회
export async function fetchLikeWord(member: string): Promise<Words[]> {
  try {
    const data = await sql<Words>`
  SELECT vocas.word_no, vocas.word, vocas.definition, likes.liked_at, vocas.word_kr, vocas.example, vocas.example_kr
FROM
  likes
JOIN
  vocas ON likes.voca_id = vocas.word_no
WHERE
  likes.member_id = (select no from members where id= ${member});
    `;

    return data.rows;
  } catch (error) {
    console.error("Error fetching word:", error);
    throw new Error("Error fetching word");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  console.log("Formdata", formData);
  try {
    await signIn("credentials", {
      redirect: true,
      redirectTo: "/home",
      ...Object.fromEntries(formData),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

//vocas에서 example과 word를 추출해서 새로운 data로 생성
export async function fetchQuiz() {
  try {
    const data = await sql<Answers>`
      SELECT word, example, example_kr
      FROM vocas
      ORDER BY RANDOM()
      LIMIT 10;
    `;

    return data.rows;
  } catch (error) {
    throw new Error("error");
  }
}

//vocas에서 단어만 추출해서 choice목록으로 만듬
export async function fetchChoiceWords() {
  try {
    const data = await sql<Choice>`
      SELECT word
      FROM vocas
      ORDER BY RANDOM()
      LIMIT 3;
    `;

    return data.rows;
  } catch (error) {
    throw new Error("error");
  }
}

//점수 계산
const result = {score:0, total:0};

//정답
export async function scoreCalculation(correct: number, sum: number) {
  console.log("점수", correct);
  result.score = correct;
  result.total = sum;
}

export async function fetchScore() {
  return result;
}

let reviewQuizList:QuizResult[] = [];

export async function setQuizList(content : QuizResult) {// 리뷰를 위한 데이터
  // answers 배열을 JSON 문자열로 변환
  const answersJson = JSON.stringify(content.answers);
  try{
    await sql `
        INSERT INTO QuizResults (userId, score, total_count, answers)
        VALUES (${content.userId}, ${content.score}, ${content.total_count}, ${answersJson})
        RETURNING *;
      `
      return { message: `success` };
  }catch(error){
    console.error('Error saving quiz result:');
  }
  // console.log('추가됨')
  // reviewQuizList.push(content);
  // console.log(reviewQuizList);
}

export async function startNewQuiz() {
  // 퀴즈를 시작할 때 이전 데이터 초기화
  reviewQuizList = [];
  console.log('새 퀴즈 시작, 리스트 초기화됨');
  console.log('초기화됨?',reviewQuizList)
  // 이후 퀴즈를 시작하는 로직 추가
}

export async function getQuizList() {
  try{
    const data = await sql`
      SELECT answers FROM QuizResults ORDER BY created_at DESC limit 1;
      `;
      return data.rows[0].answers;
  }catch(error){
    console.error('Error fetching quiz result:', error);
  }
  console.log('리턴값',reviewQuizList);
  return reviewQuizList;
}

export async function updatePassword(pw: string | number, id:string) {
  try {
    await sql<Choice>`
      update members set pw = ${pw} where id = ${id};
    `;

    return { message: `success` };
  } catch (error) {
    throw new Error("error");
  }
}

