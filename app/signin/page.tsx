export default function SignInPage() {
  return (
    <>
      <div className="p-3 w-full h-full">
        <div className="flex h-1/3">
          <p className="text-6xl font-bold items-center flex">Sign in</p>
        </div>
        <div className="space-y-4 flex-1 h-1/4 ">
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value=""
              placeholder="ID"
            />
          </div>
          <span className="text-red-600 text-sm">존재하지 않는 아이디입니다.</span>
          <div className="flex flex-col w-full ">
            <input
              type="password"
              className="border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              value=""
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}
