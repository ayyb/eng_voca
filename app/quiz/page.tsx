"use client";
import Link from "next/link";
import Button from "@/components/common/Button";
import BackButton from "@/components/common/BackButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLikesCount } from "@/app/api/actions";

export default function QuizPage({
  searchParams
}: {
  searchParams: { error?: string }
}) {
  const router = useRouter();
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [count, setCount] = useState<number>(10);
  const [error, setError] = useState<string | null>(searchParams.error || null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleStart = async () => {
    if (selectedLevels.length === 0) {
      alert("최소 한개의 카테고리를 선택해주세요.");
      return;
    }

    try {
      // likes만 선택된 경우 먼저 확인
      if (selectedLevels.includes('likes') && selectedLevels.length === 1) {
        const count = await getLikesCount();
        console.log("좋아요 단어 개수", count);
        if (count === 0) {
          alert("좋아요된 단어가 없습니다. 다른 카테고리를 선택해주세요.");
          return;
        }
      }
      
      router.push(`/quiz/problem?levels=${selectedLevels.join(',')}&count=${count}`);
    } catch (error) {
      alert("퀴즈 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-8 w-full h-screen flex flex-col">
      <BackButton />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* 상단 제목 */}
      <div className="h-20">
        <p className="text-4xl font-bold text-white">Quiz</p>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1">
        <p className="text-2xl mt-4 mb-8">Select a range</p>
        <div className="flex flex-col justify-between h-[70%]">
          {[
            { id: 'likes', label: 'Likes' },
            { id: 'basic', label: 'Beginner' },
            { id: 'middle', label: 'Intermediate' },
            { id: 'advance', label: 'Advanced' },
            { id: 'expert', label: 'Expert' }
          ].map(level => (
            <div key={level.id} className="bg-white rounded-lg h-14">
              <div className="p-3 flex ml-4">
                <p className="text-xl">{level.label}</p>
                <div className="flex ml-auto px-4 items-center">
                  <input 
                    type="checkbox"
                    checked={selectedLevels.includes(level.id)}
                    onChange={() => handleLevelChange(level.id)}
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="flex-1 justify-end">
        {/* Count 선택 */}
        <div className="mb-8 flex flex-col">
          <p className="text-xl font-bold mb-2">Count</p>
          <select 
            className="w-1/3 h-10 border-2 border-gray-300 rounded-lg p-2"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        {/* Start 버튼 */}
        <Button
          onClick={handleStart}
          variant="white"
        >
          Start
        </Button>
      </div>
    </div>
  );
}
