import { EyeIcon, TrashIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { fetchLikeWords, fetchLikeWord, fetchMember } from "@/app/api/actions";
import { useEffect, useState } from "react";
import LikeWordsList from "@/ui/Likes/LikeWordsList";
import Header from "@/ui/Likes/Header";
import { auth } from "@/auth";

export default async function LikesPage() {
  const member = await fetchMember();
  const memberId = member.no; //임시
  return (
    <>
      <div className="p-4 w-full h-full">
        <LikeWordsList memberId={memberId} />
      </div>
    </>
  );
}
