import { EyeIcon, TrashIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
export default function LikesPage() {
  return (
    <>
      <div className="p-4 w-full h-full">
        <div className="mb-5">
          <p className="text-4xl font-bold text-white">You Like</p>
          <p className="text-4xl font-bold text-white" ><strong className="italic text-blue-500">83</strong> Words</p>
        </div>
        <div className="flex flex-col space-y-4 mt-5 mb-10 w-full">
          <div className="bg-white flex w-1/2 ml-auto p-3 justify-between">
            <p className="font-bold">ABC순</p>
            <p className="font-bold">최근저장순</p>
          </div>
          <div className="bg-white rounded-sm h-14">
            <div className="p-3 grid grid-cols-3 gap-6">
              {/* 영어단어 */}
              <p className="text-xl">Apple</p>
              {/* 한글뜻 */}
              <p className="text-xl">사과</p>
              <div className="flex space-x-4 ml-auto">
                {/* 숨김처리 */}
                <EyeIcon className=" h-6 text-black-500" />
                {/* 삭제 */}
                <TrashIcon className=" h-6 text-black-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-sm h-14">
            <div className="p-3 grid grid-cols-3 gap-6">
              {/* 영어단어 */}
              <p className="text-xl">Banana</p>
              {/* 한글뜻 */}
              <p className="text-xl">바나나</p>
              <div className="flex space-x-4 ml-auto">
                {/* 숨김처리 */}
                <EyeSlashIcon className="h-6 text-black-500" />
                {/* 삭제 */}
                <TrashIcon className=" h-6 text-black-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
