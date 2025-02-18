"use client";

import Link from "next/link";
import { signIn } from "@/auth"
import Button from "@/components/common/Button";

export default function SignInPage() {
  const handleInput = (value: string) => {
    console.log(value);
  };
  return (
    <>
      <div className="p-3 w-full h-full">
        <div className="flex h-1/3">
          <p className="text-6xl font-bold items-center flex">Sign in</p>
        </div>
        <form action={async (formData)=>{
          await signIn("credentials", formData);
        }}>
          <div className="space-y-4 flex-1 h-1/4 ">
            <div className="flex flex-col w-full">
              <input
                type="text"
                name="id"
                className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                placeholder="ID"
                onChange={(e) => {
                  handleInput(e.target.value);
                }}
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
                onChange={(e) => {
                  handleInput(e.target.value);
                }}
              />
            </div>
            <span className="text-red-600 text-sm">비밀번호가 틀립니다.</span>
          </div>
          {/* 버튼 */}
          <div className="flex flex-col flex-1 h-1/3 gap-4">
            <Button>
              <Link href="/home" className="flex items-center justify-center h-full w-full">
                Sign in
              </Link>
            </Button>

            <Button>
              <Link href="/signup" className="flex items-center justify-center h-full w-full">
                Sign up
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
