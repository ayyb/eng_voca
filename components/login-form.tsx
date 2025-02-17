"use client";
import { useActionState } from "react";
import { authenticate } from "@/app/api/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

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
          {errorMessage &&
            <span className="text-red-600 text-sm">
              {errorMessage.errors.id}
            </span>
          }
          <div className="flex flex-col w-full p-2">
            <input
              type="password"
              name="pw"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              minLength={4}
            />
          </div>
          {errorMessage &&
              <span className="text-red-600 text-sm">
              {errorMessage.errors.password}
            </span>
          }
        </div>

        {/* {errorMessage && (
          <>
            <p className="text-sm text-red-500">
              {typeof errorMessage === "string"
                ? errorMessage
                : errorMessage.message}
            </p>
          </>
        )} */}
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
