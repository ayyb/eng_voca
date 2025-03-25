import Link from "next/link";
import { HomeIcon, UserIcon, PuzzlePieceIcon, SparklesIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

export default function NavFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white shadow-lg border-t border-gray-200 z-10">
      <div className="max-w-md mx-auto flex justify-around items-center py-3">
        <Link href="/likes" className="flex flex-col items-center">
          <HandThumbUpIcon className="h-6 w-6 text-gray-700 hover:text-blue-500"/>
          <span className="text-xs mt-1 text-gray-600">좋아요</span>
        </Link>
        <Link href="/quiz" className="flex flex-col items-center">
          <PuzzlePieceIcon className="h-6 w-6 text-gray-700 hover:text-blue-500"/>
          <span className="text-xs mt-1 text-gray-600">퀴즈</span>
        </Link>
        <Link href="/home" className="flex flex-col items-center">
          <HomeIcon className="h-6 w-6 text-gray-700 hover:text-blue-500"/>
          <span className="text-xs mt-1 text-gray-600">홈</span>
        </Link>
        <Link href="/levels" className="flex flex-col items-center">
          <SparklesIcon className="h-6 w-6 text-gray-700 hover:text-blue-500"/>
          <span className="text-xs mt-1 text-gray-600">레벨</span>
        </Link>
        <Link href="/member" className="flex flex-col items-center">
          <UserIcon className="h-6 w-6 text-gray-700 hover:text-blue-500"/>
          <span className="text-xs mt-1 text-gray-600">내정보</span>
        </Link>
      </div>
    </div>
  );
}
