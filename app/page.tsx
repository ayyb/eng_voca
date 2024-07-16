import React from "react";
import "../public/reset.css";
import "../public/font.css";
import "../public/main.css";
import Link from "next/link";

const HomePage = async () => {
  return (
    <>
      <div className="p-3w-full h-full">
        <div className="bg-black flex items-center justify-center min-h-screen">
          <div className="bg-white p-4 w-full max-w-md h-screen flex flex-col items-center justify-center bg-custom">
            <div className="gap-5 flex flex-col w-full mb-5 h-1/3">
              <p className="font-bold text-7xl">Daily</p>
              <p className="font-bold text-7xl">English</p>
              <p className="font-bold text-7xl">Voca</p>
              <p className="flex text-left text-xl pl-2">
                매일매일 외우는 영어단어장
              </p>
            </div>
            {/* 버튼그룹 */}
            <div className="flex flex-col h-1/6 gap-8 w-full px-4">
              <button className="bg-customBlue text-white font-bold rounded-lg text-2xl p-2" type="button">
                <Link href="/home">Start as Guest</Link>
              </button>
              <button className="bg-customBlue text-white font-bold rounded-lg text-2xl p-2" type="button">
                <Link href="/login">Login</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
