import { fetchQuiz,fetchChoiceWords } from "@/app/api/actions";
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
    const regex = new RegExp(row.word, "gi");
    return {
      ...row,
      // replace 메서드를 사용하여 문장을 업데이트합니다.
      example: row.example.replace(regex, "___"),
    };
  });
  console.log('퀴즈',updateQuiz);

  const TOTAL_CHOICES = 4;
  // 첫 번째 문제의 정답을 제외한 선택지들을 가져옴
  const answers = await fetchChoiceWords();
  
  // 중복 제거된 오답 3개 선택
  const wrongChoices = answers
    .slice(0, TOTAL_CHOICES - 1)
    .map((answer: Choice) => ({
      word: answer.word,
      isAnswer: false
    }));

  const allChoices = [
    ...wrongChoices,
    { word: quiz[0].word, isAnswer: true }
  ];

  const shuffledChoices = shuffleArray(allChoices);
  console.log('선택지 리스트',shuffledChoices);

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="bg-customBlue p-4 w-full max-w-md h-screen flex flex-col">
        <Question 
          initialQuiz={updateQuiz} 
          initialChoices={shuffledChoices} 
        />
      </div>
    </div>
  );
}
