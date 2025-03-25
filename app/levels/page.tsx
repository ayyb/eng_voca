import Link from "next/link";
import React from "react";
import BackButton from "@/components/common/BackButton";

export default function LevelsPage() {
  return (
    <div className="p-8 flex-1 flex flex-col pb-24">
      <BackButton />

      {/* 상단 텍스트 영역 */}
      <div className="mt-8 mb-12">
        <h1 className="font-bold text-4xl text-white">Levels</h1>
      </div>

      {/* 레벨 카드 영역 */}
      <div className="flex-1 flex flex-col gap-6 mt-8">
        <div className="bg-red-200 hover:bg-red-300 rounded-lg box-border border-1 border-red-300 h-40">
          <Link href="/home/vocabulary/basic" className="block h-full">
            <div className="p-3">
              <p className="text-xl">Beginner</p>
              <p className="text-sm">28 words</p>
            </div>
          </Link>
        </div>

        <div className="bg-yellow-200 hover:bg-yellow-300 rounded-lg box-border border-1 border-yellow-300 h-40">
          <Link href="/home/vocabulary/middle" className="block h-full">
            <div className="p-3">
              <p className="text-xl">Intermediate</p>
              <p className="text-sm">28 words</p>
            </div>
          </Link>
        </div>

        <div className="bg-green-200 hover:bg-green-300 rounded-lg box-border border-1 border-green-300 h-40">
          <Link href="/home/vocabulary/advance" className="block h-full">
            <div className="p-3">
              <p className="text-xl">Advanced</p>
              <p className="text-sm">30 words</p>
            </div>
          </Link>
        </div>

        <div className="bg-blue-200 hover:bg-blue-300 rounded-lg box-border border-1 border-blue-300 h-40">
          <Link href="/home/vocabulary/expert" className="block h-full">
            <div className="p-3">
              <p className="text-xl">Expert</p>
              <p className="text-sm">30 words</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
