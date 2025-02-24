import { sql } from "@vercel/postgres";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await sql`
      SELECT COUNT(*) as count 
      FROM likes 
      WHERE user_id = ${session.user.id}
    `;

    return NextResponse.json({ count: result.rows[0].count });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch likes count" }, 
      { status: 500 }
    );
  }
} 