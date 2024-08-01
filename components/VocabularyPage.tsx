"use client";

import { useState } from "react";
import { EyeIcon, HeartIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as EmptyHeart,
  EyeIcon as EmptyEye,
} from "@heroicons/react/24/outline";
import { Word } from "@/app/lib/types";
import { addLikeWord, deleteLikeWord } from "@/app/api/actions";
import WordComponent from "./WordComponent";

interface VocabularyPageProps {
  words: Word[];
  memberId: number;
}

export default function VocabularyPage({ words,memberId }: VocabularyPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const currentWord = words[currentIndex];
  console.log("currentWord", currentWord);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + words.length) % words.length
    );
  };
  

  const handleClick = async () => {
    //isFilled가 false 라면 단어장에 추가
    if (!currentWord.liked) {
      //좋아요 한 단어에 추가
      const Likes = {
        word: currentWord.word_no,
        member: memberId,
      };
      await addLikeWord(Likes);
    } else {
      //좋아요 취소
      const Likes = {
        word: currentWord.word_no,
        member: memberId,
      };
      await deleteLikeWord(Likes);
    }

    currentWord.liked = !currentWord.liked;
  };

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div className="p-4 w-full h-full">
        <div className="flex items-center justify-between h-20">
          <WordComponent currentWord={currentWord} memberId={memberId} />
          {/* <p onClick={handleClick} className="cursor-pointer">
            {currentWord.liked ? (
              <HeartIcon className="size-6 text-black-500" />
            ) : (
              <EmptyHeart className="size-6 text-black-500" />
            )}
          </p> */}
          <p onClick={handleHidden} className="cursor-pointer">
            {isHidden ? (
              <EmptyEye className="size-6 text-black-500" />
            ) : (
              <EyeIcon className="size-6 text-black-500" />
            )}
          </p>
          <p>
            <SpeakerWaveIcon className="size-6 text-black-500" />
          </p>
        </div>

        {/* 영어단어 */}
        <div className="flex justify-center items-center flex-col h-1/2">
          <p className="font-bold text-6xl m-5">{currentWord.word}</p>
          <p>None</p>
          <p className="m-5">[{currentWord.pronunce}]</p>
          {/* 한글뜻 */}
          <p className="font-bold text-4xl m-8">{currentWord.word_kr}</p>
          {/* 예문 */}
          <div className="flex justify-between w-full px-4">
            <div className="mt-2">
              <p>{currentWord.example}</p>
              <p>{currentWord.example_kr}</p>
              <p>{currentWord.translation}</p>
            </div>
            <p className="flex justify-center items-center">
              <SpeakerWaveIcon className="size-6 text-black-500" />
            </p>
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
          <p className="justify-center items-center flex">
            {currentIndex + 1}/{words.length}
          </p>
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
