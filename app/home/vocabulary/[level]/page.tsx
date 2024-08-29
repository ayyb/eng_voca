// app/vocabulary/[level]/page.tsx
import { fetchLevelWords,fetchMember } from '@/app/api/actions';
import VocabularyPage from '@/components/VocabularyPage';
import { Word } from '@/app/lib/types';
import { auth } from '@/auth';

interface VocabularyPageProps {
  params: { level: string };
}

export default async function Page({ params }: VocabularyPageProps) {
  const member = await fetchMember();
  const level = parseInt(params.level, 10);
  const memberId = member.no; //임시
  const words: Word[] = await fetchLevelWords(level, memberId);

  return <VocabularyPage words={words} memberId={memberId}/>;
}