import Link from "next/link";
import Button from "@/components/common/Button";
import BackButton from "@/components/common/BackButton";

export default function QuizPage() {
  return (
    <div className="p-8 w-full h-screen flex flex-col">
      <BackButton />
      
      {/* 상단 제목 */}
      <div className="h-20">
        <p className="text-4xl font-bold text-white">Quiz</p>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1">
        <p className="text-2xl mt-4 mb-8">Select a range</p>
        <div className="flex flex-col justify-between h-[70%]">
          <div className="bg-white rounded-lg box-border h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Likes</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg box-border border-1  h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Beginner</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg box-border border-1  h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Intermediate</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg box-border border-1  h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Advanced</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg box-border border-1 border-red-300 h-14">
            <div className="p-3 flex ml-4">
              <p className="text-xl">Expert</p>
              <div className="flex ml-auto px-4 items-center">
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="flex-1 justify-end">
        {/* Count 선택 */}
        <div className="mb-8 flex flex-col">
          <p className="text-xl font-bold mb-2">Count</p>
          <select className="w-1/3 h-10 border-2 border-gray-300 rounded-lg p-2">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        {/* Start 버튼 */}
        <Link href="/quiz/problem">
          <Button
            id="start"
            variant="white"
          >
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
}
