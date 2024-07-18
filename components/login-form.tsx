"use client";
import { useActionState } from "react";
import { authenticate } from "@/app/api/actions";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <form action={formAction}>
      <div className="space-y-4 flex-1 h-1/4 ">
        <div className="flex flex-col w-full">
          <input
            type="text"
            name="id"
            className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            placeholder="ID"
          />
        </div>
        <span className="text-red-600 text-sm">
          존재하지 않는 아이디입니다.
        </span>
        <div className="flex flex-col w-full ">
          <input
            type="password"
            name="pw"
            className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            placeholder="Password"
          />
        </div>
        <span className="text-red-600 text-sm">비밀번호가 틀립니다.</span>
      </div>
      {/* 버튼 */}
      <div className="flex flex-col flex-1 h-1/3 gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign in
        </button>
      </div>
    </form>
  );
}
