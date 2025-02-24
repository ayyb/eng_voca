"use client";
import { useEffect, useState } from "react";
import {
  fetchChoiceWords,
  setQuizList,
} from "@/app/api/actions";
import { useRouter } from "next/navigation";
import Alert from "@/ui/common/Alert";

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
  initialQuiz: any[];
  initialChoices: any[];
}

export default function Question({ initialQuiz, initialChoices }: QuestionProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quiz, setQuiz] = useState(initialQuiz);
  const [choices, setChoices] = useState(initialChoices);
  const [answersList, setAnswersList] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [count, setCount] = useState(0);
  const [isSelectable, setIsSelectable] = useState(true);
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const handleClick = (isAnswer: boolean, word: string, index: number) => {
    if (!isSelectable) return;
    
    setSelectedChoice(index);
    setIsSelectable(false);
    
    // 정답 여부에 따른 알림 표시
    setAlert({
      isOpen: true,
      message: isAnswer ? '정답입니다!' : '틀렸습니다.',
      type: isAnswer ? 'success' : 'error'
    });
    
    const timer = setTimeout(() => {
      setSelectedChoice(null);
      setIsSelectable(true);
      // alert 초기화 추가
      setAlert({
        isOpen: false,
        message: '',
        type: 'success'
      });
      nextQuiz(isAnswer, word);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const nextQuiz = (isAnswer: boolean, clicked: string) => {
    setScore((prevScore) => prevScore + (isAnswer ? 1 : 0));
    setAnswersList((prev) => [...prev, {
      example: quiz[currentIndex].example,
      example_kr: quiz[currentIndex].example_kr,
      answer: quiz[currentIndex].word,
      choice_answer: clicked,
    }]);

    setCount((prevCount) => prevCount + 1);

    if (count + 1 === quiz.length) {
      setIsQuizFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
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
      router.push("/quiz/result");
    }
  }, [isQuizFinished, score]);

  const fetchNewChoices = async () => {
    const TOTAL_CHOICES = 4;
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < quiz.length) {
      const currentAnswer = quiz[nextIndex].word;
      // 현재 정답을 제외한 선택지들을 가져옴
      const newAnswers = await fetchChoiceWords();

      // 중복 제거된 오답 3개 선택
      const wrongChoices = newAnswers
        .slice(0, TOTAL_CHOICES - 1)
        .map((answer: Choice) => ({
          word: answer.word,
          isAnswer: false,
        }));

      // 정답과 오답을 합침
      const newChoices = [
        ...wrongChoices,
        { word: currentAnswer, isAnswer: true },
      ];
      
      const shuffledChoices = shuffleArray(newChoices);
      setChoices(shuffledChoices);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Alert 
        isOpen={alert.isOpen}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert(prev => ({ ...prev, isOpen: false }))}
      />

      {/* 상단 진행바 영역 - h-20 고정 높이 */}
      <div className="flex items-center h-20">
        <div className="w-full">
          <h2 className="mb-2">progress : {count}/{quiz.length}</h2>
          <div className="w-full bg-white rounded-xl h-5">
            <div
              className="bg-progress h-5 rounded-xl"
              style={{ width: `${(count / quiz.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 문제 영역 - h-1/2 고정 높이 */}
      <div className="flex justify-center items-center flex-col h-1/2">
        <div className="w-full text-center">
          <p className="font-bold text-3xl mb-4">
            {quiz[currentIndex].example}
          </p>
          <p className="text-xl">
            {quiz[currentIndex].example_kr}
          </p>
        </div>
      </div>

      {/* 선택지 영역 */}
      <div className="flex-1 space-y-4 py-4">
        {choices.map((choice, index) => (
          <div
            key={index}
            onClick={() => handleClick(choice.isAnswer, choice.word, index)}
            className={`
              bg-white rounded-lg text-center py-4 font-bold cursor-pointer
              border-2 transition-all duration-300 ease-in-out
              ${selectedChoice === index 
                ? choice.isAnswer
                  ? 'border-green-500 text-green-500 bg-green-50 scale-105'
                  : 'border-red-500 text-red-500 bg-red-50 scale-105'
                : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            {choice.word}
          </div>
        ))}
      </div>
    </div>
  );
}
