import { fetchQuiz } from "@/app/api/actions";
export default async function ProblemPage() {
  const quiz = await fetchQuiz();
  console.log('퀴즈 리스트',quiz);
  
  return (
    <>
      <div className="p-4 w-full h-full">
        {/* 진행바 */}
        <h2 className="mt-2">Score : 1/20</h2>
        {/* 프로그래스바 */}
        <div className="w-full bg-gray-200 rounded-full h-4 my-4">
          <div className="bg-progress h-4 rounded-full"></div>
        </div>
        {/* 문제 */}
        <div className="flex flex-col py-3 h-1/2 justify-center">
            <p className="font-bold text-3xl mb-4 text-center">
              Would you rather live to ___ or ___ to live?
            </p>
            <p className="text-center">일하기 위해 살래, 살기 위해 일할래?</p>
        </div>
        {/* 선택지 */}
        <div className="flex flex-col space-y-4 w-full">
          <div className="bg-white rounded-lg text-center justify-center items-center py-2 font-bold text-red-500">
            move
          </div>
          <div className="bg-white rounded-lg text-center justify-center items-center py-2 font-bold text-green-500">
            work
          </div>
          <div className="bg-white rounded-lg text-center justify-center items-center py-2 font-bold">
            make
          </div>
          <div className="bg-white rounded-lg text-center justify-center items-center py-2 font-bold">
            dance
          </div>
        </div>
      </div>
    </>
  );
}
