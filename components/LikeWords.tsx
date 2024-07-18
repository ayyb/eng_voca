"use client";
import { EyeIcon, TrashIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { LikeWordsProps } from "@/app/lib/definitions";
import { useState } from "react";
import { deleteLikeWord } from "@/app/api/actions";
import { revalidatePath } from "next/cache";

export default function LikeWords({ likeWord }: LikeWordsProps) {
  console.log("test", likeWord);
  if (!likeWord) {
    return <div>Loading...</div>;
  }
  const [isHidden, setIsHidden] = useState(false);
  const handleHidden = () => {
    setIsHidden(!isHidden);
  }
  const handleDelete = async() => {
    // Delete the word
    const targetWord ={
      word: likeWord.no,
      member: 2,
    }
    await deleteLikeWord(targetWord);
  }
  return (
    <>
      <div className="bg-white rounded-sm h-14">
        <div className="p-3 grid grid-cols-3 gap-6">
          {/* 영어단어 */}
          <p className="text-xl">{likeWord.word}</p>
          {/* 한글뜻 */}
          {!isHidden ? <p className="text-xl">{likeWord.definition}</p> : <p className="text-xl"></p>}
          <div className="flex space-x-4 ml-auto">
            {/* 숨김처리 */}
            <EyeIcon className=" h-6 text-black-500" onClick={handleHidden}/>
            {/* 삭제 */}
            <TrashIcon className=" h-6 text-black-500" onClick={handleDelete}/>
          </div>
        </div>
      </div>
    </>
  );
}
