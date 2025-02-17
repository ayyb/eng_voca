import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { memberId, progress, total } = await request.json();

    await sql`
      INSERT INTO learning_progress (member_id, current_progress, total_words)
      VALUES (${memberId}, ${progress}, ${total})
      ON CONFLICT (member_id) 
      DO UPDATE SET 
        current_progress = ${progress},
        total_words = ${total},
        updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating learning progress:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}