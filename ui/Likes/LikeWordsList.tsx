// LikeWordsList.tsx (클라이언트 컴포넌트)
"use client";
import { useState } from "react";
import LikeWords from "@/components/LikeWords";
import SortOptions from "@/ui/Likes/SortOptions";
import { Words, LikeWordsListProps } from "@/app/lib/definitions";

const LikeWordsList: React.FC<LikeWordsListProps> = ({ initialWords,memberId }) => {
    console.log("좋아요 단어리스트",initialWords)
  const [likeWords, setLikeWords] = useState<Words[]>(initialWords); //likes List
  console.log("좋아요 단어리스트",likeWords)
  const [sortOrder, setSortOrder] = useState<string>('abc');

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    const sortedWords = [...likeWords];
    if (order === 'abc') {
      console.log("abc",sortedWords)
      sortedWords.sort((a, b) => a.word.localeCompare(b.word));
    } else if (order === 'recent') {
      sortedWords.sort((a, b) => new Date(b.liked_at).getTime() - new Date(a.liked_at).getTime());
    }
    setLikeWords(sortedWords);
  };
  //삭제되면 새로 likeWokds를 불러옴
  const handleDelete = async (word: Words) => {
    const newWords = likeWords.filter((likeWord) => likeWord.no !== word.no);
    setLikeWords(newWords);
  };
  

  return (
    <>
      <SortOptions onSortChange={handleSortChange} />
      <div className="flex flex-col space-y-4 mt-5 mb-10 w-full">
        {likeWords.map((likeWord) => (
          <LikeWords key={likeWord.no} likeWord={likeWord} memberId={memberId}/>
        ))}
      </div>
    </>
  );
};

export default LikeWordsList;