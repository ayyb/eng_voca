import { EyeIcon, TrashIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { fetchLikeWords,fetchLikeWord,fetchMember } from "@/app/api/actions";
import { useEffect, useState } from "react";
import LikeWordsList from "@/ui/Likes/LikeWordsList";
import Header from "@/ui/Likes/Header";
import { auth } from "@/auth";

export default async function LikesPage() {
  const session = await auth();
  const userId = session?.user?.id as string;
  const member = await fetchMember(userId);
  const memberId = member.no; //임시
  const words = await fetchLikeWord(session?.user?.id as string); //member Id 값 넘기기
  return (
    <>
      <div className="p-4 w-full h-full">
        {/* <Header length={words.length}/> */}
        <LikeWordsList initialWords={words} memberId={memberId}/>
      </div>
    </>
  );
}
