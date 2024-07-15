// app/vocabulary/[level]/page.tsx
import { fetchLevelWords } from '@/app/api/actions';
import VocabularyPage from '@/components/VocabularyPage';
import { Word } from '@/app/lib/types';

interface VocabularyPageProps {
  params: { level: string };
}

export default async function Page({ params }: VocabularyPageProps) {
  const level = parseInt(params.level, 10);
  const words: Word[] = await fetchLevelWords(level);

  return <VocabularyPage words={words} />;
}