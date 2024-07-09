import { HeartIcon, EyeIcon,SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { HeartIcon as EmptyHeart } from "@heroicons/react/24/outline";


export default function VocabularyPage() {
  return (
    <>
      <div className="p-4 w-full h-full">
        <div className="flex items-center justify-between h-20">
          <p><EmptyHeart className="size-6 text-black-500"/></p>
          <p><EyeIcon className="size-6 text-black-500"/></p>
          <p><SpeakerWaveIcon className="size-6 text-black-500"/></p>
        </div>

        {/* 영어단어 */}
        <div className="flex justify-center items-center flex-col h-1/2">
          <p className="font-bold text-6xl m-5">Apple</p>
          <p className="m-5">noun [a pl]</p>
          {/* 한글뜻 */}
          <p className="font-bold text-4xl m-8">사과</p>
          {/* 예문 */}
          <div className="flex justify-between w-full px-4">
            <div className="mt-2">
              <p>He ate the <strong className="italic">apple</strong>, stalk and all.</p>
              <p>그는 그 사과를 속심까지 다 먹었다.</p>
            </div>
            <p className="flex justify-center items-center"><SpeakerWaveIcon className="size-6 text-black-500"/></p>
          </div>
        </div>

        {/* 페이징 */}
        <div className="flex justify-between px-4">
          <button className="bg-white hover:bg-blue-200 text-black font-bold py-2 px-4 rounded-xl">
            이전
          </button>
          <p className="justify-center items-center flex">1/30</p>
          <button className="bg-white hover:bg-blue-200 text-black font-bold py-2 px-4 rounded-xl">
            다음
          </button>
        </div>
      </div>
    </>
  );
}
