'use server';
import { QueryResultRow, sql } from "@vercel/postgres";
import { Word } from "@/app/lib/types";
import { z } from "zod";
import { revalidatePath } from 'next/cache';

export async function createMember(
  
  prevState: {
    message: string;
  },
  formData: FormData
) {
  console.log('작동함?')
  console.log(formData.get("id"))
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
    console.log("데이터 받음",data)
    await sql`
      INSERT INTO members (id, pw, name, created_at, member_level)
      VALUES (${data.id}, ${data.pw}, ${data.name}, CURRENT_DATE, 1);
    `;
     // 페이지를 다시 검증하여 최신 데이터로 갱신
    revalidatePath('/home');
    console.log('등록됨?')
    return { message: `Added to new Member` };
  } catch (error) {
    return { message: "Failed to create member" };
  }
}

export async function fetchMember() {
  try {
    const id = "narii";
    const result = await sql`
        SELECT * FROM members WHERE id = ${id};
      `;

    if (result.rowCount === 0) {
      throw new Error("Member not found");
    }

    // return NextResponse.json({ member: result.rows[0] }, { status: 200 });
    return result.rows[0];
  } catch (error) {
    throw new Error("Error");
  }
}

// Function to map the database result to Word type
function mapToWord(row:QueryResultRow): Word {
  return {
    word: row.word,
    definition: row.definition,
    example: row.example,
    pronunce: row.pronunce,
    word_level: row.word_level,
    part_of_speech: row.part_of_speech,
    translation: row.translation,
  };
}

export async function fetchLevelWords(level: number): Promise<Word[]> {
  try {
    let result;

    // If level is 9, fetch all words randomly
    if (level === 9) {
      result = await sql`
        SELECT * FROM vocas ORDER BY RANDOM() LIMIT 30;
      `;
    } else {
      result = await sql`
        SELECT * FROM vocas WHERE word_level = ${level};
      `;
    }

    if (result.rowCount === 0) {
      throw new Error("No words found for this level");
    }

    return result.rows.map(mapToWord);
  } catch (error) {
    throw new Error("error");
  }
}
