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

export default function VocabularyPage({ words, memberId }: VocabularyPageProps) {
  // words 배열의 각 단어에 대한 liked 상태를 관리
  const [localWords, setLocalWords] = useState(words);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const currentWord = localWords[currentIndex];
  console.log("currentWord", currentWord);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % localWords.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + localWords.length) % localWords.length
    );
  };
  

  const handleClick = async () => {
    try {
      const Likes = {
        word: currentWord.word_no,
        member: memberId,
      };
  
      // UI를 먼저 업데이트 -> optimistic update
      setLocalWords(prevWords => prevWords.map(word => 
        word.word_no === currentWord.word_no 
          ? { ...word, liked: !word.liked }
          : word
      ));
  
      if (!currentWord.liked) {
        await addLikeWord(Likes);
      } else {
        await deleteLikeWord(Likes);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
  
      // 오류 발생 시 원래 상태로 복구
      setLocalWords(prevWords => prevWords.map(word => 
        word.word_no === currentWord.word_no 
          ? { ...word, liked: currentWord.liked } // 기존 상태로 복구
          : word
      ));
    }
  };

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div className="p-4 w-full h-full">
        <div className="flex items-center justify-between h-20">
          {/* <WordComponent currentWord={currentWord} memberId={memberId} /> */}
          <p onClick={handleClick} className="cursor-pointer">
            {currentWord.liked ? (
              <HeartIcon className="size-6 text-red-500" />
            ) : (
              <EmptyHeart className="size-6 text-black-500" />
            )}
          </p>
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
