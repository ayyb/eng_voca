// app/vocabulary/[level]/page.tsx
import VocabularyPage from "@/components/VocabularyPage";
import { fetchLevelWords } from "@/app/api/actions";
import { auth } from "@/auth";

export default async function Page({ params }: { params: { level: string } }) {
  const session = await auth();
  const level = parseInt(params.level);
  const memberId = session?.user?.id ?? "";
  console.log(session?.user?.id);

  // 초기 데이터만 서버에서 가져옴
  const initialWords = await fetchLevelWords(level, memberId);

  // 클라이언트 컴포넌트에 초기 데이터 전달
  return <VocabularyPage words={initialWords} memberId={memberId} />;
}