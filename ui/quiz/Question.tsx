"use client";
import { useEffect, useState } from "react";
import { fetchChoiceWords } from "@/app/api/actions";
import { useRouter } from "next/navigation";
interface Quiz {
  correctanswer: string;
  sentence: string;
}

interface Choice {
  word: string;
  isAnswer?: boolean;
}

interface QuestionProps {
  initialQuiz: Quiz[];
  initialChoices: Choice[];
}

const Question: React.FC<QuestionProps> = ({ initialQuiz, initialChoices }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [quiz, setQuiz] = useState(initialQuiz);
  const [choices, setChoices] = useState(initialChoices);
  useEffect(() => {}, [currentIndex]);
  const nextQuiz = (isAnswer: boolean) => {
    console.log(isAnswer);
    // 만약 답을 클릭했을경우 초록색으로 표시
    if (isAnswer) {
      alert("정답입니다!");
    } else {
      alert("틀렸습니다!");
    }
    const nextIndex = (currentIndex + 1) % quiz.length;
    if (currentIndex === quiz.length - 1) {
      alert("끝났습니다.");
      //결과페이지로 이동 QuizResult
      router.push("/quiz/result");
    } else {
      setCurrentIndex(nextIndex);
      fetchNewChoices();
    }
  };

  const fetchNewChoices = async () => {
    const newAnswers = await fetchChoiceWords();
    const updatedAnswers = newAnswers.map((answer: Choice) => ({
      word: answer.word,
      isAnswer: false,
    }));
    setChoices([
      ...updatedAnswers,
      { word: quiz[currentIndex+1].correctanswer, isAnswer: true },
    ]);
  };

  return (
    <>
      {/* 문제 */}
      <div className="flex flex-col py-3 h-1/2 justify-center">
        <p className="font-bold text-3xl mb-4 text-center">
          {quiz[currentIndex].sentence}
        </p>
        <p className="text-center">일하기 위해 살래, 살기 위해 일할래?</p>
      </div>
      {/* 선택지 */}
      <div className="flex flex-col space-y-4 w-full">
        {choices.map((choice, index) => (
          <div
            key={index}
            className="bg-white rounded-lg text-center justify-center items-center py-2 font-bold"
            onClick={() => nextQuiz(choice.isAnswer as boolean)}
          >
            {choice.word}
          </div>
        ))}
      </div>
    </>
  );
};

export default Question;
