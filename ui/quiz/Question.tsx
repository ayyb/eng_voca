"use client";
import { useEffect, useState } from "react";
import {
  fetchChoiceWords,
  scoreCalculation,
  setQuizList,
} from "@/app/api/actions";
import { useRouter } from "next/navigation";
import { QuizResultDetail } from "@/app/lib/definitions";

// Fisher-Yates Shuffle 알고리즘을 사용하여 배열을 랜덤으로 섞는 함수
const shuffleArray = (array: Choice[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

interface Quiz {
  word: string;
  example: string;
  example_kr: string;
}

interface Choice {
  word: string;
  isAnswer: boolean;
}

interface QuestionProps {
  initialQuiz: Quiz[];
  initialChoices: Choice[];
}

const Question = ({ initialQuiz, initialChoices }: QuestionProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quiz, setQuiz] = useState(initialQuiz);
  const [choices, setChoices] = useState(initialChoices);
  const [answersList, setAnswersList] = useState<QuizResultDetail[]>([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 정답/오답 여부 상태 추가
  const [count, setCount] = useState(0);

  const [selectedChoice, setSelectedChoice] = useState(null); // 선택한 항목 상태 추가

  const handleClick = (isAnswer:boolean, word:string, index) => {
    //정답 여부를 보여주고 다음 문제로 이동
    setSelectedChoice(index); // 클릭한 항목의 인덱스를 상태로 설정

    nextQuiz(isAnswer, word); // 원래 있던 nextQuiz 함수 호출
  };  

  const nextQuiz = (isAnswer: boolean, clicked: string) => {
    setIsCorrect(isAnswer); // 정답/오답 여부 업데이트
    // 만약 답을 클릭했을경우 초록색으로 표시
    setScore((prevScore) => prevScore + (isAnswer ? 1 : 0));

    //클릭하면 리뷰데이터에 추가
    setAnswersList((prev) => [
      ...prev,
      {
        example: quiz[currentIndex].example,
        example_kr: quiz[currentIndex].example_kr,
        answer: quiz[currentIndex].word,
        choice_answer: clicked,
      },
    ]);

    // 클릭 횟수 증가
    setCount((prevCount) => prevCount + 1);
    
  
    

    // 1. 퀴즈 종료 조건 먼저 확인
    if (count + 1 === quiz.length ) {
      setIsQuizFinished(true);
    } else {
      console.log('끝나지않음')
      // 2. 퀴즈가 끝나지 않았다면 currentIndex 업데이트 및 다음 문제 로직 실행
      const nextIndex = (currentIndex + 1) 
      setCurrentIndex(nextIndex);
      fetchNewChoices();
    }
  };

  useEffect(() => {
    if (isQuizFinished) {
      const reviewData = {
        score: score,
        total_count: quiz.length,
        answers: answersList,
      };
      setQuizList(reviewData);
      alert("끝났습니다.");
      router.push("/quiz/result");
    }
  }, [isQuizFinished, score]);

  const fetchNewChoices = async () => {
    //랜덤한 선택지를 가져옴
    const newAnswers = await fetchChoiceWords();

    const updatedAnswers = newAnswers.map((answer: Choice) => ({
      word: answer.word,
      isAnswer: false,
    }));

    const nextIndex = currentIndex + 1;
    if (nextIndex < quiz.length) {
      const newChoices = [
        ...updatedAnswers,
        { word: quiz[currentIndex + 1].word, isAnswer: true },
      ];
      const shuffledChoices = shuffleArray(newChoices);
      setChoices(shuffledChoices);
    }
  };
  const progress = (count / 10) * 100; // 퀴즈를 10번 풀기로 가정
  return (
    <>
      {/* 진행바 */}
      <h2 className="mt-2">
        진행도 : {count}/{quiz.length}
      </h2>
      {/* 프로그래스바 */}
      <div className="w-full bg-gray-200 rounded-full h-6 my-4">
        <div
          className="bg-progress h-6 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* 문제 */}
      <div className="flex flex-col py-3 h-1/2 justify-center">
        <p className="font-bold text-3xl mb-4 text-center">
          {quiz[currentIndex].example}
        </p>
        <p className="text-center">{quiz[currentIndex].example_kr}</p>
      </div>
      {/* 선택지 */}
      <div className="flex flex-col space-y-4 w-full">
        {choices.map((choice, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg text-center justify-center items-center py-2 font-bold ${
              selectedChoice === index ? (choice.isAnswer ? 'text-gray-500' : 'text-red-500') : ''
            }`}
            onClick={() => handleClick(choice.isAnswer, choice.word, index)}
          >
            {choice.word}
          </div>
        ))}
      </div>
    </>
  );
};

export default Question;
