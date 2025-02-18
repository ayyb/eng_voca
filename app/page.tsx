import React from "react";
import "../public/reset.css";
import "../public/font.css";
import "../public/main.css";
import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full max-w-md mx-auto h-screen flex flex-col p-8 
                      border border-gray-200 rounded-2xl shadow-lg">
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
          <Link href="/home" className="block">
            <button 
              className="w-full bg-customBlue text-white font-bold rounded-lg 
                         text-xl sm:text-2xl p-4 transition-colors duration-200 
                         hover:bg-blue-400" 
              type="button"
            >
              Start as Guest
            </button>
          </Link>
          <Link href="/login" className="block">
            <button 
              className="w-full bg-customBlue text-white font-bold rounded-lg 
                         text-xl sm:text-2xl p-4 transition-colors duration-200 
                         hover:bg-blue-400" 
              type="button"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
