import React from "react";

export default function page() {
  return (
    <>
      <div className="p-4 w-full h-full">
        <div className="mb-5">
          <h1 className="text-4xl font-bold text-white">Levels</h1>
        </div>
        <div className="flex flex-col space-y-4 mt-5 mb-10 w-full">
          <div className="bg-red-200 rounded-lg box-border border-1 border-red-300 h-32">
            <div className="p-3">
              <p className="text-xl">Beginner</p>
              <p className="text-sm">30 words</p>
            </div>
          </div>
          <div className="bg-yellow-200 rounded-lg box-border border-1 border-yellow-300 h-32">
            <div className="p-3">
              <p className="text-xl">Intermediate</p>
            </div>
          </div>
          <div className="bg-green-200 rounded-lg box-border border-1 border-green-300 h-32">
            <div className="p-3">
              <p className="text-xl">Advanced</p>
            </div>
          </div>
          <div className="bg-blue-200 rounded-lg box-border border-1 border-blue-300 h-32">
            <div className="p-3">
              <p className="text-xl">Expert</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
