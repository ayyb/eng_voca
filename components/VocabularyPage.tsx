"use client";

import { useState, useEffect } from "react";
import { EyeIcon, HeartIcon, SpeakerWaveIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as EmptyHeart,
} from "@heroicons/react/24/outline";
import { Word } from "@/app/lib/types";
import { addLikeWord, deleteLikeWord, updateLearningProgress } from "@/app/api/actions";

interface VocabularyPageProps {
  words: Word[];
  memberId: string;
}

export default function VocabularyPage({ words, memberId }: VocabularyPageProps) {
  const [localWords, setLocalWords] = useState(words);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isKoreanHidden, setIsKoreanHidden] = useState(false);

  const currentWord = localWords[currentIndex];
  console.log("currentWord", currentWord);

  const handleNext = async () => {
    const nextIndex = (currentIndex + 1) % localWords.length;
    setCurrentIndex(nextIndex);
    
    try {
      await updateLearningProgress(
        parseInt(memberId),
        nextIndex + 1,
        localWords.length
      );
    } catch (error) {
      console.error('진행도 저장 중 오류 발생:', error);
    }
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

  const toggleKorean = () => {
    setIsKoreanHidden(!isKoreanHidden);
  };

  return (
    <>
      <div className="p-4 w-full h-full">
        <div className="flex items-center justify-between h-20">
          <p onClick={handleClick} className="cursor-pointer">
            {currentWord.liked ? (
              <HeartIcon className="size-6 text-red-500" />
            ) : (
              <EmptyHeart className="size-6 text-black-500" />
            )}
          </p>
          <button onClick={toggleKorean} className="p-2">
            {isKoreanHidden ? (
              <EyeSlashIcon className="h-6 w-6 " />
            ) : (
              <EyeIcon className="h-6 w-6 " />
            )}
          </button>
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
          {!isKoreanHidden && (
            <p className="font-bold text-4xl m-8">{currentWord.word_kr}</p>
          )}
          {/* 예문 */}
          <div className="flex justify-between w-full px-4">
            <div className="mt-2">
              <p>{currentWord.example}</p>
              {!isKoreanHidden && (
                <p>{currentWord.example_kr}</p>
              )}
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
