import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // daily_word_sets 테이블 생성
    await sql`
      CREATE TABLE IF NOT EXISTS daily_word_sets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        study_date DATE NOT NULL,
        voca_ids TEXT NOT NULL, -- JSON 문자열로 저장
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, study_date)
      );
    `;

    return NextResponse.json({ 
      message: 'daily_word_sets 테이블이 성공적으로 생성되었습니다.' 
    });
  } catch (error) {
    console.error('테이블 생성 중 오류 발생:', error);
    return NextResponse.json({ 
      error: '테이블 생성 중 오류가 발생했습니다.' 
    }, { status: 500 });
  }
} 