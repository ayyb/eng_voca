'use client'
// pages/index.js
import Head from 'next/head';
import React from 'react';

export default function Page() {
    const handleStartClick = () =>{
        //
    }

    const handleLikeBoxClick = () => {
        //
    }

    function handleQuizBoxClick(){
        //
    }
  return (
    <>
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Daily English Voca Main Page</title>
    </Head>
    <div className="p-4">
      <h1 className="text-3xl font-bold">Hello, MyeongSeop!</h1>
      <h2 className="text-xl mt-2">Your learning Progress 5/30</h2>

      <div className="bg-gray-200 p-4 my-4">
        progress bar
      </div>

      <div className="like_box bg-blue-100 p-4 my-4 cursor-pointer" onClick={handleLikeBoxClick}>
        <p>Likes</p>
        <p>33 words</p>
        <p>icon</p>
      </div>
      <div className="quiz_box bg-green-100 p-4 my-4 cursor-pointer" onClick={handleQuizBoxClick}>
        <p>Quiz</p>
        <p>Latest 10/30</p>
        <p>icon</p>
      </div>

      <h2 className="text-xl mt-4">Today's Learning</h2>
      <div className="bg-gray-100 p-4 my-4">
        <p>Vocabulary</p>
        <p>Today's random 30 words</p>
        <button className="bg-blue-500 text-white p-2 mt-2" id="start" onClick={handleStartClick}>Start</button>
      </div>
      
      <h2 className="text-xl mt-4">Themes</h2>
      <div className="bg-yellow-100 p-4 my-4">level1</div>
      <div className="bg-yellow-200 p-4 my-4">level2</div>
      <div className="bg-yellow-300 p-4 my-4">level3</div>
      <div className="bg-yellow-400 p-4 my-4">level4</div>

      <button className="bg-blue-500 text-white p-2 mt-2">More</button>
      <nav className="bg-gray-800 text-white p-4 mt-4">
        하단 네비게이션 바
      </nav>
    </div>
  </>
  );
};