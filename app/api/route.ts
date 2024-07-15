import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { Word } from "@/app/lib/types";

export async function createMember(request) {
  try {
    const { id, pw, name } = request;

    const result = await sql`
      INSERT INTO members (id, pw, name, created_at, member_level)
      VALUES (${id}, ${pw}, ${name}, CURRENT_DATE, 1);
    `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    throw new Error(error.message);
  }
}

// Function to map the database result to Word type
function mapToWord(row): Word {
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
      throw new Error('No words found for this level');
    }

    return result.rows.map(mapToWord);
  } catch (error) {
    throw new Error(error.message);
  }
}