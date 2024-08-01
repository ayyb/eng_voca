import { fetchQuiz } from "@/app/api/actions";
import { fetchChoiceWords } from "@/app/api/actions";
import Question from "@/ui/quiz/Question";
import { Choice } from "@/app/lib/definitions";

// Fisher-Yates Shuffle 알고리즘을 사용하여 배열을 랜덤으로 섞는 함수
const shuffleArray = (array: Choice[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


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
      isAnswer: false,
    };
  });
  //랜덤으로 섞어서 선택리 리스트 초기화
  const choices = [...updatedAnswer, { word: quiz[0].correctanswer, isAnswer: true }];
  const shuffledChoices = shuffleArray(choices);
  console.log('선택지 리스트',shuffledChoices);
  return (
    <>
      <div className="p-4 w-full h-full">
        {/* 문제 */}
        <Question initialQuiz={quiz} initialChoices={shuffledChoices} />
      </div>
    </>
  );
}
