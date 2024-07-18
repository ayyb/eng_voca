import { EyeIcon, TrashIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { fetchLikeWords,fetchLikeWord } from "@/app/api/actions";
import { useEffect, useState } from "react";
import LikeWordsList from "@/ui/Likes/LikeWordsList";
import Header from "@/ui/Likes/Header";

export default async function LikesPage() {
  const words = await fetchLikeWord(2); //member Id 값 넘기기
  return (
    <>
      <div className="p-4 w-full h-full">
        <Header length={words.length}/>
        <LikeWordsList initialWords={words} />
      </div>
    </>
  );
}
