"use client";

import LoginForm from "@/components/login-form";
import Link from "next/link";

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
        <div className="space-y-4 flex-1 h-1/4 ">
        <LoginForm />
        </div>
      </div>
    </>
  );
}
