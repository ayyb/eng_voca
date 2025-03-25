"use client";
import { useFormState } from "react-dom";
import { createMember } from "@/app/api/actions";
import Link from "next/link";
import Button from "@/components/common/Button";
import BackButton from "@/components/common/BackButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type State = {
  message: string;
  errors: {
    id?: string;
    password?: string;
    name?: string;
    passwordConfirm?: string;
  };
};

export default function SignUpPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const initialState: State = { 
    message: "", 
    errors: {
      id: undefined,
      password: undefined,
      name: undefined,
      passwordConfirm: undefined
    } 
  };
  
  const handleFormAction = async (prevState: any, formData: FormData) => {
    const result = await createMember(prevState, formData);
    if (!result.errors.id) {  // 에러가 없으면 성공
      setShowModal(true);
      // 회원가입 성공 시 폼 데이터 저장
      setFormData({
        id: formData.get('id') as string,
        pw: formData.get('pw') as string
      });
    }
    return result;
  };

  const [errorMessage, formAction] = useFormState(handleFormAction, initialState);

  const [formData, setFormData] = useState<{ id: string; pw: string } | null>(null);

  const handleStart = async () => {
    if (formData) {
      try {
        await signIn("credentials", {
          redirect: false,
          id: formData.id,
          pw: formData.pw
        });
        router.push('/home');
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className={`w-full max-w-md mx-auto h-screen flex flex-col p-8 
                    border border-gray-200 rounded-2xl shadow-lg relative
                    ${showModal ? 'blur-sm' : ''}`}>
        <BackButton />

        {/* 상단 텍스트 영역 */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-6">
            <p className="font-bold text-5xl sm:text-7xl text-black">Sign up</p>
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
                  name="name"
                  className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                  placeholder="Name"
                />
                {errorMessage?.errors.name && (
                  <span className="text-red-600 text-sm mt-1">
                    {errorMessage.errors.name}
                  </span>
                )}
              </div>

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

              <div className="flex flex-col w-full">
                <input
                  type="password"
                  name="pwConfirm"
                  className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
                  placeholder="Confirm Password"
                  minLength={4}
                />
                {errorMessage?.errors.passwordConfirm && (
                  <span className="text-red-600 text-sm mt-1">
                    {errorMessage.errors.passwordConfirm}
                  </span>
                )}
              </div>

              
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="space-y-6 w-full mb-12">
            <Button type="submit" variant="secondary">
              Sign up
            </Button>

            {/* <Link href="/login" className="block">
              <Button variant="white">
                Sign in
              </Button>
            </Link> */}
          </div>
        </form>
      </div>

      {/* 성공 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">회원가입 완료!</h2>
            <p className="text-gray-600 mb-8">
              회원가입이 성공적으로 완료되었습니다.
              시작하기를 눌러 학습을 시작하세요!
            </p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleStart}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                시작하기
              </button>
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
              >
                로그인 화면으로
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
