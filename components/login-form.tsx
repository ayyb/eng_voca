"use client";
import { authenticate } from "@/app/api/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import Button from "@/components/common/Button";
import BackButton from "@/components/common/BackButton";

type State = {
  message: string;
  errors: {
    id?: string;
    password?: string;
  };
};

export default function LoginForm() {
  const initialState: State = { message: "", errors: {} };
  const [errorMessage, formAction] = useFormState(authenticate, initialState);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full max-w-md mx-auto h-screen flex flex-col p-8 
                    border border-gray-200 rounded-2xl shadow-lg relative">
        <BackButton />
        
        {/* 상단 텍스트 영역 */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-6">
            <p className="font-bold text-5xl sm:text-7xl text-black">Sign in</p>
          </div>
        </div>

        {/* 폼 영역 */}
        <form action={formAction} className="flex-1 flex flex-col">
          {/* 입력 필드 영역 */}
          <div className="flex-1 space-y-16">
            <div className="space-y-12">
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  name="id"
                  className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                  placeholder="ID"
                />
                {errorMessage?.errors.id && (
                  <span className="text-red-600 text-sm mt-1">
                    {errorMessage.errors.id}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full">
                <input
                  type="password"
                  name="pw"
                  className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                  minLength={4}
                />
                {errorMessage?.errors.password && (
                  <span className="text-red-600 text-sm mt-1">
                    {errorMessage.errors.password}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="space-y-6 w-full mb-12">
            <Button type="submit">
              Sign in
            </Button>

            <Link href="/signup" className="block">
              <Button variant="white">
                Sign up
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
