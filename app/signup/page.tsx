"use client";
import { useState } from "react";
import { createMember } from "@/app/api/route";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    id: '',
    pw: '',
    name: ''
  });

  const buttonClick = async (formData) => {
    console.log('Form Data on Submit:', formData);
    console.log(formData)
    alert("Hello World");
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(`Updated ${name}:`, value);
    console.log('Current Form Data:', formData);
  };

  return (
    <>
      <form action={buttonClick}>
        <div className="p-3 w-full h-full">
          <div className="flex h-1/3">
            <p className="text-6xl font-bold items-center flex">Sign up</p>
          </div>
          <div className="space-y-4 flex-1 h-1/4 ">
            <div className="flex flex-col w-full">
              <input
                type="text"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <input
                type="text"
                id="id"
                name="id"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                placeholder="ID"
                onChange={handleChange}
              />
            </div>
            <span className="text-red-600 text-sm">
              이미 존재하는 아이디입니다.
            </span>
            <div className="flex flex-col w-full ">
              <input
                type="password"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full ">
              <input
                type="password"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                placeholder="reconfirm Password"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* 버튼 */}
          <div className="flex flex-col flex-1 h-1/3 gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
