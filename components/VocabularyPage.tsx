"use client";

import { useState, useEffect } from "react";
import { EyeIcon, HeartIcon, SpeakerWaveIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon as EmptyHeart,
} from "@heroicons/react/24/outline";
import { Word } from "@/app/lib/types";
import { addLikeWord, deleteLikeWord, updateLearningProgress, fetchLearningProgress } from "@/app/api/actions";

interface VocabularyPageProps {
  words: Word[];
  memberId: number;
}

export default function VocabularyPage({ words, memberId }: VocabularyPageProps) {
  const [localWords, setLocalWords] = useState(words);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isKoreanHidden, setIsKoreanHidden] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // 학습 상태 관리
  const [viewedWords, setViewedWords] = useState<boolean[]>([]);
  const [viewedCount, setViewedCount] = useState(0);

  const currentWord = localWords[currentIndex];

  // 컴포넌트가 마운트될 때 학습 진행도 확인 및 설정
  useEffect(() => {
    const checkAndSetProgress = async () => {
      if (isInitialized) return;
      
      try {
        // 현재 학습 진행도 조회
        const progressData = await fetchLearningProgress();
        const today = new Date().toISOString().split('T')[0];
        const isToday = progressData.date === today;
        
        console.log('학습 진행도 확인:', progressData);
        
        // 초기 "본 상태" 배열 생성
        const initialViewedWords = new Array(localWords.length).fill(false);
        let startIndex = 0;
        
        // 오늘 이미 학습을 시작했고 진행도가 있다면
        if (isToday && progressData.progress > 0 && progressData.total === localWords.length) {
          console.log('오늘 이미 학습을 시작했습니다. 진행도:', progressData.progress);
          
          // 이미 본 단어 상태 설정
          for (let i = 0; i < progressData.progress; i++) {
            initialViewedWords[i] = true;
          }
          
          // 아직 보지 않은 첫 번째 단어부터 시작
          startIndex = progressData.progress < localWords.length 
            ? progressData.progress 
            : localWords.length - 1;
          
          // 진행도 설정
          setViewedCount(progressData.progress);
        }
        
        // 상태 업데이트
        setViewedWords(initialViewedWords);
        setCurrentIndex(startIndex);
        setIsInitialized(true);
      } catch (error) {
        console.error('학습 진행도 확인 중 오류 발생:', error);
        setViewedWords(new Array(localWords.length).fill(false));
        setIsInitialized(true);
      }
    };

    checkAndSetProgress();
    
    return () => {
      console.log('학습 페이지를 나갔습니다.');
    };
  }, [localWords.length, isInitialized]);

  // 현재 단어를 "본 상태"로 표시
  const markCurrentWordAsViewed = async () => {
    // 이미 본 단어라면 아무것도 하지 않음
    if (viewedWords[currentIndex]) {
      return;
    }
    
    console.log('새로운 단어를 확인했습니다:', currentIndex + 1);
    
    // 현재 단어를 "본 상태"로 표시
    const newViewedWords = [...viewedWords];
    newViewedWords[currentIndex] = true;
    
    // 본 단어 수 계산
    const newViewedCount = newViewedWords.filter(viewed => viewed).length;
    
    // 상태 업데이트
    setViewedWords(newViewedWords);
    setViewedCount(newViewedCount);
    
    // 서버에 진행도 업데이트 (서버에서 검증)
    try {
      const result = await updateLearningProgress(newViewedCount, localWords.length);
      console.log('진행도 업데이트 결과:', result);
    } catch (error) {
      console.error('진행도 저장 중 오류 발생:', error);
    }
  };

  const handleNext = async () => {
    // 현재 단어를 "본 상태"로 표시
    await markCurrentWordAsViewed();
    
    // 다음 단어로 이동
    const nextIndex = (currentIndex + 1) % localWords.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    // 이전 단어로 이동
    const prevIndex = (currentIndex - 1 + localWords.length) % localWords.length;
    setCurrentIndex(prevIndex);
  };

  const handleClick = async () => {
    try {
      const Likes = {
        user: memberId,
        word: currentWord.id,
      };
  
      // UI를 먼저 업데이트 -> optimistic update
      setLocalWords(prevWords => prevWords.map(word => 
        word.id === currentWord.id 
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
        word.id === currentWord.id 
          ? { ...word, liked: currentWord.liked } // 기존 상태로 복구
          : word
      ));
    }
  };

  const toggleKorean = () => {
    setIsKoreanHidden(!isKoreanHidden);
    // 한글 뜻을 보는 것은 단어를 확인한 것으로 간주
    markCurrentWordAsViewed();
  };

  // 발음 듣기
  const playPronunciation = () => {
    // 실제 발음 재생 코드는 여기에 구현
    console.log('발음 재생:', currentWord.word);
    // 발음을 듣는 것은 단어를 확인한 것으로 간주
    markCurrentWordAsViewed();
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
          <p onClick={playPronunciation} className="cursor-pointer">
            <SpeakerWaveIcon className="size-6 text-black-500" />
          </p>
        </div>

        {/* 영어단어 */}
        <div className="flex justify-center items-center flex-col h-1/2">
          <p className="font-bold text-6xl m-5">{currentWord.word}</p>
          <p>None</p>
          <p className="m-5">[{currentWord.pronunciation}]</p>
          {/* 한글뜻 */}
          {!isKoreanHidden && (
            <p className="font-bold text-4xl m-8">{currentWord.definition_kr}</p>
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
            <p onClick={playPronunciation} className="flex justify-center items-center cursor-pointer">
              <SpeakerWaveIcon className="size-6 text-black-500" />
            </p>
          </div>
        </div>

        {/* 진행 상태 표시 */}
        <div className="mt-4 mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">학습 진행도</span>
            <span className="text-sm">{viewedCount}/{localWords.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${(viewedCount / localWords.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 페이징 */}
        <div className="flex justify-between px-4 mt-4">
          <button
            className="bg-white hover:bg-blue-200 text-black font-bold py-2 px-4 rounded-xl"
            onClick={handlePrev}
          >
            이전
          </button>
          <div className="flex flex-col items-center justify-center">
            <p>{currentIndex + 1}/{words.length}</p>
            <div className="flex mt-1">
              {localWords.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 mx-1 rounded-full ${
                    index === currentIndex 
                      ? 'bg-blue-500' 
                      : viewedWords[index] 
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <button
            className={`font-bold py-2 px-4 rounded-xl ${
              viewedWords[currentIndex]
                ? 'bg-gray-200 text-gray-700' // 이미 본 단어
                : 'bg-blue-500 text-white hover:bg-blue-600' // 아직 보지 않은 단어
            }`}
            onClick={handleNext}
          >
            {viewedWords[currentIndex] ? '다음 (이미 확인)' : '다음'}
          </button>
        </div>
      </div>
    </>
  );
}
