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
  userId,
  memberId,
}) => {
  // console.log("좋아요 단어리스트", initialWords);

  const [likeWords, setLikeWords] = useState<Words[]>([]); //likes List
  // console.log("좋아요 단어리스트", likeWords);
  const [sortOrder, setSortOrder] = useState<string>("abc");

  useEffect(() => {
    async function fetchAndSetLikeWords() {
      try {
        console.log("멤버아이디", userId); 
        const words = await fetchLikeWord(userId); // userId 값을 사용하여 데이터 페칭
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
        word: word.word_no,
        member: memberId,
      };
      await deleteLikeWord(targetWord);
      console.log("삭제");
    } else {
      return;
    }
    const newWords = likeWords.filter((likeWord) => likeWord.word_no !== word.word_no);
    setLikeWords(newWords);
  };

  const [isHidden, setIsHidden] = useState(false);
  const handleHidden = (id) => {
    console.log('id',id)
    setLikeWords((prev) =>
      prev.map((word) =>
        word.word_no === id ? { ...word, isHidden: !word.isHidden } : word
      )
    );
  };

  return (
    <>
      <div className="mb-5">
        <p className="text-4xl font-bold text-white">You Like</p>
        <p className="text-4xl font-bold text-white">
          <strong className="italic text-blue-500">{likeWords.length}</strong>{" "}
          Words
        </p>
      </div>
      <SortOptions onSortChange={handleSortChange} />
      <div className="flex flex-col space-y-4 mt-5 mb-10 w-full">
        {likeWords.map((likeWord) => (
          <div className="bg-white rounded-sm h-14">
            <div className="p-3 grid grid-cols-3 gap-6">
              {/* 영어단어 */}
              <p className="text-xl">{likeWord.word}</p>
              {/* 한글뜻 */}
              {!isHidden ? (
                <p className="text-xl">{likeWord.word_kr}</p>
              ) : (
                <p className="text-xl"></p>
              )}
              <div className="flex space-x-4 ml-auto">
                {/* 숨김처리 */}
                <EyeIcon
                  className=" h-6 text-black-500"
                  onClick={() => handleHidden(likeWord.word_no)}
                />
                {/* 삭제 */}
                <TrashIcon
                  className=" h-6 text-black-500"
                  onClick={() => handleDelete(likeWord)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LikeWordsList;
