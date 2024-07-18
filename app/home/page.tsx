// pages/index.js
import React from "react";
import { HeartIcon, PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { fetchMember } from '@/app/api/actions';

export default async function Page() {
  const [ member ]  = await fetchMember();
  console.log("response",member);

  const score = 5
  const total = 30
  const progress = score / total * 100;
  return (
    <>
      <div className="p-4 h-full">
        <p className="text-3xl font-bold text-white w-full">
          Hello, {member.name ?? 'Guest'}!
        </p>
        <h2 className="text mt-2">Your learning Progress {`${score} / ${total}`}</h2>
        {/* 프로그래스바 */}
        <div className="w-full bg-gray-200 rounded-full h-6 my-4">
          <div
            className="bg-progress h-6 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex space-x-4 w-full">
          <div
            className="like_box bg-white p-4 my-4 cursor-pointer rounded-lg flex-1"
          >
            <Link href="/likes">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">Likes</p>
                  <p className="text-gray-500 text-sm">33 words</p>
                </div>
                <p className="ml-auto">
                  <HeartIcon className="size-6 text-black-500" />
                </p>
              </div>
            </Link>
          </div>
          <div
            className="quiz_box bg-white p-4 my-4 cursor-pointer rounded-lg text-black flex-1 "
          >
            <Link href="/quiz">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">Quiz</p>
                  <p className="text-gray-500 text-sm">Latest 10/30</p>
                </div>
                <p className="ml-auto">
                  <PencilIcon className="size-6 text-black-500" />
                </p>
              </div>
            </Link>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-4 text-white">Today's Learning</h2>
        <div className="bg-white p-10 my-4 rounded-xl">
          <p className="text-3xl font-bold">Vocabulary</p>
          <p className="text-sm mt-3">Today's random 30 words</p>
          <Link href="/home/vocabulary/9">
            <button
              className="bg-blue-200 text-white p-2 mt-2 rounded"
              id="start"
            >
              Start
            </button>
          </Link>
        </div>

        <h2 className="mt-4 text-3xl font-bold text-white mb-4">Levels</h2>
        <div className="flex flex-wrap w-full space-y-4 h-1/4">
          <div className="flex w-full space-x-4 ">
            <Link href="/home/vocabulary/1" className="bg-red-100 p-4 flex-1 rounded-lg">
            Beginner
            </Link>
            <Link href="/home/vocabulary/2" className="bg-yellow-100 p-4 flex-1 rounded-lg">
            Intermediate
            </Link>
          </div>
          <div className="flex w-full space-x-4">
          <Link href="/home/vocabulary/3" className="bg-blue-100 p-4 flex-1 rounded-lg">
          Advanced
            </Link>
            <Link href="/home/vocabulary/4" className="bg-green-100 p-4 flex-1 rounded-lg">
            Expert
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
