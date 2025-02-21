// app/vocabulary/[level]/page.tsx
import VocabularyPage from "@/components/VocabularyPage";
import { fetchLevelWords } from "@/app/api/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { level: string } }) {
  const session = await auth();
  const level = params.level;
  // const memberId = parseInt(session?.user?.id ?? "0");

  // 또는 더 안전한 방식:
  if (!session?.user?.id) {
    redirect('/login');
  }
  const memberId = parseInt(session.user.id);

  // 초기 데이터만 서버에서 가져옴
  const initialWords = await fetchLevelWords(level);

  // 클라이언트 컴포넌트에 초기 데이터 전달
  return <VocabularyPage words={initialWords} memberId={memberId} />;
}