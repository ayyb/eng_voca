"use client";
import { useState } from "react";
import { Member } from "@/app/lib/schemas";
// import { useActionState } from "react";
import { createMember } from "@/app/api/actions";

export default function SignUpPage() {
  const initialState = {
    message: "",
  };
  // const [state, formAction] = useActionState(createMember, initialState);

  const [formData, setFormData] = useState<Member>({
    id: "",
    pw: "",
    name: "",
    confirmPw: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(`Updated ${name}:`, value);
    console.log("Current Form Data:", formData);
  };

  useState(() => {
    if(state.message){
      alert(state.message);
    }
  });

  return (
    <>
      <div className="p-3 w-full h-full">
        <div className="flex h-1/3">
          <p className="text-6xl font-bold items-center flex">Sign up</p>
        </div>
        <form action={createMember}>
          <div className="space-y-4 flex-1 mb-20">
            <div className="flex flex-col w-full">
              <input
                type="text"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            {errors.name && (
              <span className="text-red-600 text-sm">{errors.name}</span>
            )}
            <div className="flex flex-col w-full">
              <input
                type="text"
                id="id"
                name="id"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                placeholder="ID"
                onChange={handleChange}
              />
              {/* <button className="border-yellow-200 border-2 w-40" >
                중복확인
              </button> */}
            </div>
            {errors.id && (
              <span className="text-red-600 text-sm">{errors.id}</span>
            )}
            {/* <span className="text-red-600 text-sm">
              이미 존재하는 아이디입니다.
            </span> */}
            <div className="flex flex-col w-full ">
              <input
                type="password"
                name="pw"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                placeholder="Password"
                onChange={handleChange}
              />
              {errors.pw && (
                <span className="text-red-600 text-sm">{errors.pw}</span>
              )}
            </div>
            <div className="flex flex-col w-full ">
              <input
                type="password"
                name="confirmPw"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                placeholder="reconfirm Password"
                onChange={handleChange}
              />
            </div>
            {errors.confirmPw && (
              <span className="text-red-600 text-sm">{errors.confirmPw}</span>
            )}
            <p aria-live="polite" className="sr-only" role="status">
              {state?.message}
            </p>
          </div>
          {/* 버튼 */}
          <div className="flex flex-col flex-1 h-1/3 gap-4">
            <button
              type="submit"
              className="bg-customBlue hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            >
              Sign up
            </button>
            {state && (
              <div className="toast">
                {state.message }
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
