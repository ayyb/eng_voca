import { fetchQuiz } from "@/app/api/actions";
import { fetchChoiceWords } from "@/app/api/actions";
import Question from "@/ui/quiz/Question";

interface Choice {
  word: string;
  isAnswer: boolean;
}


export default async function ProblemPage() {
  const quiz = await fetchQuiz();
  const updateQuiz = quiz.map((row: any) => {
    // 정규식을 올바르게 생성합니다.
    const regex = new RegExp(row.correctanswer, 'gi');
    return {
      ...row,
      // replace 메서드를 사용하여 문장을 업데이트합니다.
      sentence: row.sentence.replace(regex, '___'),
    };
  });
  console.log('퀴즈 리스트',updateQuiz);
  const answers = await fetchChoiceWords();
  const updatedAnswer = answers.map((answer : Choice) => {
    return {
      word: answer.word,
      answer: false,
    };
  });
  const choices = [...updatedAnswer, { word: quiz[0].correctanswer, answer: true }];
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
        <Question initialQuiz={updateQuiz} initialChoices={choices} />
        {/* 선택지 */}
        {/* <div className="flex flex-col space-y-4 w-full">
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
        </div> */}
      </div>
    </>
  );
}
