import QuizReview from "@/ui/quiz/QuizReview";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { getQuizList } from "@/app/api/actions";

export default async function ReviewPage() {
  //사용자의 퀴즈 결과를 보여준다
  //퀴즈결과를 받아와서 보여줌
  //예제
  const QuizResults = await getQuizList();
  return (
    <>
      <div className="p-3 w-full h-full">
        {QuizResults.map((item, idx) => (
          <QuizReview key={idx} item={item} />
        ))}

        {/* <div className="bg-white rounded-xl flex flex-col p-4 mb-4">
          <div className="ml-auto">
            <XCircleIcon className="size-7 text-red-500" />
          </div>
          <div className="mb-5 pl-2">
            <p className="font-bold mb-2 text-xl">
              He ate the apple, stalk and all.
            </p>
            <p>그는 그 사과를 속심까지 다 먹었다.</p>
          </div>
          <div className="py-3 flex pl-2">
            <div className="flex-1 flex">
              <div className="w-1/2">
                <p>정답</p>
                <p>내가 고른 답</p>
              </div>
              <div>
                <p>apple</p>
                <p>apologize</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-xl flex flex-col p-4">
          <div className="ml-auto">
            <CheckCircleIcon className="size-7 text-green-500" />
          </div>
          <div className="mb-5 pl-2">
            <p className="font-bold mb-2 text-xl">
              Everyone there knew that he was just a sour grape.
            </p>
            <p>
              거기 있는 모든 사람은 그가 오기를 부리는 것이라는 것을 알았다.
            </p>
          </div>
          <div className="py-3 flex pl-2">
            <div className="flex-1 flex">
              <div className="w-1/2 ">
                <p>정답</p>
                <p>내가 고른 답</p>
              </div>
              <div>
                <p>grape</p>
                <p>grape</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
