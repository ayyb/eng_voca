"use client";
import { EyeIcon, TrashIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { LikeWordsProps } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { deleteLikeWord } from "@/app/api/actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export default function LikeWords({ likeWord,memberId }: LikeWordsProps) {
  const router = useRouter();
  console.log('멤버아이디',memberId)
  console.log("test", likeWord);
  if (!likeWord) {
    return <div>Loading...</div>;
  }
  const [isHidden, setIsHidden] = useState(false);
  const handleHidden = () => {
    setIsHidden(!isHidden);
  }
  const handleDelete = async() => {
    if(confirm("정말 삭제하시겠습니까?")){
    const targetWord ={
      word: likeWord.no,
      member: memberId,
    }
    await deleteLikeWord(targetWord);
      console.log("삭제");
      //삭제후 새로고침
      router.refresh();
    }else{
      return;
    }
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
