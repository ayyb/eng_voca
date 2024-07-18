"use server";
import { QueryResultRow, sql } from "@vercel/postgres";
import { Word } from "@/app/lib/types";
import { Words, Voca } from "@/app/lib/definitions";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { MemberInfo } from "../lib/definitions";

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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
      VALUES (${data.id}, ${data.pw}, ${data.name}, CURRENT_DATE, 1);
    `;
    // 페이지를 다시 검증하여 최신 데이터로 갱신
    revalidatePath("/home");
    console.log("등록됨?");
    return { message: `Added to new Member` };
  } catch (error) {
    return { message: "Failed to create member" };
  }
}

export async function fetchMember(): Promise<MemberInfo[]> {
  try {
    const id = "narii";
    const data = await sql<MemberInfo>`
        SELECT * FROM members WHERE id = ${id};
      `;

    if (data.rowCount === 0) {
      throw new Error("Member not found");
    }

    // return NextResponse.json({ member: result.rows[0] }, { status: 200 });
    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
    }));
    return latestInvoices;
  } catch (error) {
    throw new Error("Error");
  }
}

export async function fetchLevelWords(level: number, memberId:number): Promise<Word[]> {
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
          WHERE likes.voca_id = vocas.no 
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
          WHERE likes.voca_id = vocas.no 
          AND likes.member_id = ${memberId}
        ) as liked
      FROM vocas
      WHERE vocas.word_level = ${level};
      `;
    }

    if (result.rowCount === 0) {
      throw new Error("No words found for this level");
    }

    return result.rows
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
export async function fetchLikeWord(member: number): Promise<Words[]> {
  try {
    const data = await sql<Words>`
        SELECT vocas.no, vocas.word, vocas.definition, likes.liked_at
FROM
  likes
JOIN
  vocas ON likes.voca_id = vocas.no
WHERE
  likes.member_id = ${member};
    `;

    return data.rows;
  } catch (error) {
    console.error("Error fetching word:", error);
    throw new Error("Error fetching word");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}