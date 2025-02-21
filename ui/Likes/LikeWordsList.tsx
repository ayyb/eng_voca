// LikeWordsList.tsx (클라이언트 컴포넌트)
"use client";
import { useEffect, useState } from "react";
import LikeWords from "@/components/LikeWords";
import SortOptions from "@/ui/Likes/SortOptions";
import { Words, LikeWordsListProps } from "@/app/lib/definitions";
import { EyeIcon, TrashIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { deleteLikeWord,fetchLikeWord } from "@/app/api/actions";

const LikeWordsList: React.FC<LikeWordsListProps> = ({
  // initialWords,
  memberId,
}) => {
  // console.log("좋아요 단어리스트", initialWords);

  const [likeWords, setLikeWords] = useState<Words[]>([]); //likes List
  // console.log("좋아요 단어리스트", likeWords);
  const [sortOrder, setSortOrder] = useState<string>("abc");

  useEffect(() => {
    async function fetchAndSetLikeWords() {
      try {
        const words = await fetchLikeWord(); // userId 값을 사용하여 데이터 페칭
        console.log("좋아요 단어리스트", words);
        const wordsWithHiddenState = words.map((word) => ({
          ...word,
          isHidden: false,
        }));
        console.log('wordsWithHiddenState',wordsWithHiddenState);
        setLikeWords(wordsWithHiddenState);
      } catch (error) {
        console.error("Error fetching like words:", error);
      }
    }

    fetchAndSetLikeWords();
  }, []);

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    const sortedWords = [...likeWords];
    if (order === "abc") {
      console.log("abc", sortedWords);
      sortedWords.sort((a, b) => a.word.localeCompare(b.word));
    } else if (order === "recent") {
      sortedWords.sort(
        (a, b) =>
          new Date(b.liked_at).getTime() - new Date(a.liked_at).getTime()
      );
    }
    setLikeWords(sortedWords);
  };
  //삭제되면 새로 likeWokds를 불러옴
  const handleDelete = async (word: Words) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const targetWord = {
        word: word.id,
        user: memberId,
      };
      await deleteLikeWord(targetWord);
      console.log("삭제");
    } else {
      return;
    }
    const newWords = likeWords.filter((likeWord) => likeWord.word_no !== word.word_no);
    setLikeWords(newWords);
  };

  // 개별 단어의 숨김 상태를 토글하는 함수
  const handleHidden = (id: number) => {
    setLikeWords((prev) =>
      prev.map((word) =>
        word.id === id ? { ...word, isHidden: !word.isHidden } : word
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="mt-4 mb-12">
        <h1 className="text-5xl text-white font-bold mb-4">You Like</h1>
        <h1 className="text-5xl text-white font-bold">
          <strong className="italic text-blue-500">{likeWords.length}</strong>{" "}
          Words
        </h1>
      </div>
      <div className="space-y-6 mt-8">
        <SortOptions onSortChange={handleSortChange} />
        <div className="flex flex-col space-y-4 w-full">
          {likeWords.map((likeWord) => (
            <div key={likeWord.id} className="bg-white rounded-sm h-14">
              <div className="p-3 grid grid-cols-3 gap-6">
                <p className="text-xl">{likeWord.word}</p>
                <p className="text-xl">
                  {likeWord.isHidden ? '' : likeWord.definition_kr }
                </p>
                <div className="flex space-x-4 ml-auto">
                  {likeWord.isHidden ? (
                    <EyeSlashIcon
                      className="h-6 text-gray-500 cursor-pointer hover:text-black"
                      onClick={() => handleHidden(likeWord.id)}
                    />
                  ) : (
                    <EyeIcon
                      className="h-6 text-gray-500 cursor-pointer hover:text-black"
                      onClick={() => handleHidden(likeWord.id)}
                    />
                  )}
                  <TrashIcon
                    className="h-6 text-gray-500 cursor-pointer hover:text-black"
                    onClick={() => handleDelete(likeWord)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikeWordsList;
