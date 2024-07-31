"use client";
import { useActionState } from "react";
import { authenticate } from "@/app/api/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function LoginForm() {
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined
  // );
  const initialState = { message: "", errors: {} };
  const [errorMessage, formAction] = useFormState(authenticate, undefined);
  return (
    <>
      <form action={formAction} className="h-2/3">
        <div className="space-y-4 flex-1 h-1/3">
          <div className="flex flex-col w-full p-2 space-y-4 ">
            <input
              type="text"
              name="id"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="ID"
            />
          </div>
          {/* <span className="text-red-600 text-sm">
            존재하지 않는 아이디입니다.
          </span> */}
          <div className="flex flex-col w-full p-2">
            <input
              type="password"
              name="pw"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              minLength={4}
            />
          </div>
          {/* <span className="text-red-600 text-sm">비밀번호가 틀립니다.</span> */}
        </div>

        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
        {/* 버튼 그룹*/}
        <div className="flex flex-col flex-1 space-y-6 p-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            // aria-disabled={isPending}
          >
            Sign in
          </button>

          <Link href="/signup">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Sign up
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}
