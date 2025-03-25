"use client";

import React, { useState } from "react";
import "../public/reset.css";
import "../public/font.css";
import "../public/main.css";
import Link from "next/link";
import Button from "@/components/common/Button";
import { createGuestAccount } from "@/app/api/actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGuestMode = async () => {
    try {
      setIsLoading(true);
      
      // 게스트 계정 생성
      const { user, tempPassword } = await createGuestAccount();
      
      // 게스트 계정으로 로그인 (생성된 임시 비밀번호 사용)
      const result = await signIn("credentials", {
        id: user.username,
        pw: tempPassword, // 생성된 임시 비밀번호 사용
        redirect: false,
      });

      if (result?.error) {
        console.error("게스트 모드 로그인 실패:", result.error);
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error("게스트 모드 전환 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div
        className="w-full max-w-md mx-auto h-screen flex flex-col p-8 
                      border border-gray-200 rounded-2xl shadow-lg"
      >
        {/* 상단 텍스트 영역 */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-6">
            <p className="font-bold text-5xl sm:text-7xl text-black">Daily</p>
            <p className="font-bold text-5xl sm:text-7xl text-black">English</p>
            <p className="font-bold text-5xl sm:text-7xl text-black">Voca</p>
            <p className="text-lg sm:text-xl text-black mt-8">
              매일매일 외우는 영어단어장
            </p>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="space-y-6 w-full mb-12">
          <Button 
            variant="secondary" 
            onClick={handleGuestMode}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Start as Guest"}
          </Button>

          <Button variant="secondary">
            <Link href="/login" className="block">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
