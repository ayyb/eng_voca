'use client';
import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchLikeWord } from "@/app/api/actions";

export function LikeWords() {
  const [wordsCount, setWordsCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchWords() {
      try {
        const words = await fetchLikeWord();
        setWordsCount(words.length);
      } catch (error) {
        console.error('Failed to fetch liked words:', error);
        setWordsCount(0); // 에러 시 0으로 표시
      }
    }

    fetchWords();
  }, []);

  return (
    <div className="like_box bg-white p-4 my-4 cursor-pointer rounded-lg flex-1">
      <Link href="/likes">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold">Likes</p>
            <p className={`text-gray-500 text-sm transition-opacity duration-200 ${
              wordsCount === null ? 'opacity-50' : 'opacity-100'
            }`}>
              {wordsCount ?? '0'} words
            </p>
          </div>
          <p className="ml-auto">
            <HeartIcon className={`size-6 text-black-500 transition-opacity duration-200 ${
              wordsCount === null ? 'opacity-50' : 'opacity-100'
            }`} />
          </p>
        </div>
      </Link>
    </div>
  );
} 