import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // members 테이블 생성
    await sql`
      CREATE TABLE IF NOT EXISTS members (
        no SERIAL PRIMARY KEY,
        id VARCHAR(255) NOT NULL,
        pw VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE,
        member_level INT
      );
    `;

    // vocas 테이블 생성
    await sql`
      CREATE TABLE IF NOT EXISTS vocas (
        no SERIAL PRIMARY KEY,
        word VARCHAR(255) NOT NULL,
        definition TEXT NOT NULL,
        example TEXT,
        pronunce TEXT,
        word_level INT
      );
    `;

    // likes 테이블 생성
    await sql`
      CREATE TABLE IF NOT EXISTS likes (
        member_id INT NOT NULL,
        voca_id INT NOT NULL,
        liked_at DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY (member_id) REFERENCES members(no),
        FOREIGN KEY (voca_id) REFERENCES vocas(no)
      );
    `;

    return NextResponse.json({ message: 'Tables created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}