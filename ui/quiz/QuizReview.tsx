import {
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

interface QuizReviewProps {
  item: {
    example: string;
    example_kr: string;
    answer: string;
    choice_answer: string;
  };
}

const QuizReview = ({ item }: QuizReviewProps) => {
  console.log(item);
  return (
    <>
      <div className="bg-white rounded-xl flex flex-col p-4 mb-4">
        {/* 예문 */}
        <div className="w-6 h-6 ml-auto">
          {/* 정답인 경우 */}
          {item.answer === item.choice_answer ? (
            <CheckCircleIcon className="w-full h-full text-green-500" />
          ) : (
            <XCircleIcon className="w-full h-full text-red-500" />
          )}
        </div>

        <div className="mb-5 pl-2">
          <p className="font-bold mb-2 text-xl">{item.example}</p>
          <p>{item.example_kr}</p>
        </div>
        <div className="py-3 flex pl-2">
          <div className="flex-1 flex">
            <div className="w-1/2">
              <p>정답</p>
              <p>내가 고른 답</p>
            </div>
            <div>
              <p>{item.answer}</p>
              <p>{item.choice_answer}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizReview;
