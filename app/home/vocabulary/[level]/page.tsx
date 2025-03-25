// app/vocabulary/[level]/page.tsx
import VocabularyPage from "@/components/VocabularyPage";
import { fetchLevelWords } from "@/app/api/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { level: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }
  const memberId = parseInt(session.user.id);

  // level 파라미터 전달
  const initialWords = await fetchLevelWords(params.level);

  return <VocabularyPage words={initialWords} memberId={memberId} level={params.level} />;
}