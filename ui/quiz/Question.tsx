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
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [count, setCount] = useState(0);
  const [isSelectable, setIsSelectable] = useState(true);

  const handleClick = (isAnswer: boolean, word: string, index: number) => {
    console.log('Selected choice:', { isAnswer, word, index });
    setSelectedChoice(index);
    setIsCorrect(isAnswer);
    
    setIsSelectable(false);
    
    setTimeout(() => {
      nextQuiz(isAnswer, word);
      setIsSelectable(true);
    }, 1000);
  };

  const nextQuiz = (isAnswer: boolean, clicked: string) => {
    setScore((prevScore) => prevScore + (isAnswer ? 1 : 0));

    setAnswersList((prev) => [
      ...prev,
      {
        example: quiz[currentIndex].example,
        example_kr: quiz[currentIndex].example_kr,
        answer: quiz[currentIndex].word,
        choice_answer: clicked,
      },
    ]);

    setCount((prevCount) => prevCount + 1);

    if (count + 1 === quiz.length) {
      setIsQuizFinished(true);
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      fetchNewChoices();
      // 선택 상태와 정답 여부 초기화
      setSelectedChoice(null);
      setIsCorrect(null);
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
          style={{ width: `${(count / quiz.length) * 100}%` }}
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
            onClick={() => handleClick(choice.isAnswer, choice.word, index)}
            className={`
              bg-white rounded-lg text-center justify-center items-center py-2 font-bold cursor-pointer
              $ {selectedChoice === index 
                ? choice.isAnswer 
                  ? 'text-green-500' 
                  : 'text-red-500'
                : 'text-gray-800 hover:bg-gray-100'
              }
              transition-colors duration-300
            `}
          >
            {choice.word}
          </div>
        ))}
      </div>
    </>
  );
};

export default Question;
