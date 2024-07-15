'use client';

import { useState } from "react";
import { EyeIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { HeartIcon as EmptyHeart } from "@heroicons/react/24/outline";
import { Word } from '@/app/lib/types';

interface VocabularyPageProps {
  words: Word[];
}

export default function VocabularyPage({ words }: VocabularyPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWord = words[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  return (
    <>
      <div className="p-4 w-full h-full">
        <div className="flex items-center justify-between h-20">
          <p><EmptyHeart className="size-6 text-black-500"/></p>
          <p><EyeIcon className="size-6 text-black-500"/></p>
          <p><SpeakerWaveIcon className="size-6 text-black-500"/></p>
        </div>

        {/* 영어단어 */}
        <div className="flex justify-center items-center flex-col h-1/2">
          <p className="font-bold text-6xl m-5">{currentWord.word}</p>
          <p className="m-5">{currentWord.part_of_speech}</p>
          {/* 한글뜻 */}
          <p className="font-bold text-4xl m-8">{currentWord.definition}</p>
          {/* 예문 */}
          <div className="flex justify-between w-full px-4">
            <div className="mt-2">
              <p>{currentWord.example}</p>
              <p>{currentWord.translation}</p>
            </div>
            <p className="flex justify-center items-center"><SpeakerWaveIcon className="size-6 text-black-500"/></p>
          </div>
        </div>

        {/* 페이징 */}
        <div className="flex justify-between px-4">
          <button
            className="bg-white hover:bg-blue-200 text-black font-bold py-2 px-4 rounded-xl"
            onClick={handlePrev}
          >
            이전
          </button>
          <p className="justify-center items-center flex">{currentIndex + 1}/{words.length}</p>
          <button
            className="bg-white hover:bg-blue-200 text-black font-bold py-2 px-4 rounded-xl"
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}