// pages/index.js
import React from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { fetchMember, fetchScore, fetchLearningProgress } from "@/app/api/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LearningProgress } from "@/ui/home/LearningProgress";
import { QuizScore } from "@/ui/home/QuizScore";
import { UserInfo } from "@/components/UserInfo";
import { LikeWords } from "@/ui/home/LikeWords";

export default async function Page() {
  const session = await auth();
  
  // 1. 명시적인 타입 체크와 리다이렉트
  if (!session?.user) {
    redirect('/login');
  }

  // 병렬로 데이터 fetching
  const [member, userScore, learningProgress] = await Promise.all([
    fetchMember(),
    fetchScore(),
    fetchLearningProgress(6)
  ]);

  // 3. 데이터가 없는 경우 처리
  if (!member) {
    throw new Error('Member not found');
  }

  return (
    <div className="p-4 h-full">
      <UserInfo member={member} />
      <LearningProgress initialProgress={learningProgress.progress} />

      <div className="flex space-x-4 w-full">
        <LikeWords />
        <QuizScore score={userScore} />
      </div>

      <h2 className="text-3xl font-bold mt-6 mb-6 text-white">Today's Learning</h2>
      <div className="bg-white p-10 my-4 rounded-xl">
        <p className="text-3xl font-bold">Vocabulary</p>
        <p className="text-sm mt-3">Today's random 10 words</p>
        <Link href="/home/vocabulary/9">
          <button
            className="bg-blue-200 text-white p-2 mt-2 rounded"
            id="start"
          >
            Start
          </button>
        </Link>
      </div>

      {/* 하단 레벨 바로가기 */}
      <h2 className="mt-4 text-3xl text-white mb-6 font-bold">Levels</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/home/vocabulary/1">
          <div className="bg-red-100 rounded-lg h-32 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl">Beginner</h3>
              <p className="text-sm mt-1">30 words</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Level 1</p>
            </div>
          </div>
        </Link>

        <Link href="/home/vocabulary/2">
          <div className="bg-yellow-100 rounded-lg h-32 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl">Intermediate</h3>
              <p className="text-sm mt-1">30 words</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Level 2</p>
            </div>
          </div>
        </Link>

        <Link href="/home/vocabulary/3">
          <div className="bg-blue-100 rounded-lg h-32 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl">Advanced</h3>
              <p className="text-sm mt-1">30 words</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Level 3</p>
            </div>
          </div>
        </Link>

        <Link href="/home/vocabulary/4">
          <div className="bg-green-100 rounded-lg h-32 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl">Expert</h3>
              <p className="text-sm mt-1">30 words</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Level 4</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
