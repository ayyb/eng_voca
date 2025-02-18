"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="뒤로 가기"
    >
      <ArrowLeftIcon className="w-6 h-6" />
    </button>
  );
} 