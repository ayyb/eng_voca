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

  // useEffect(() => {
  //   fetchNewChoices();
  // }, []);


  const nextQuiz = (isAnswer: boolean, clicked: string) => {
    // 만약 답을 클릭했을경우 초록색으로 표시
    if (isAnswer) {
      setScore((prevScore) => prevScore + 1);
      console.log(score);
      alert("정답입니다!");
    } else {
      alert("틀렸습니다!");
    }

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

    // 1. 퀴즈 종료 조건 먼저 확인
    if (currentIndex === quiz.length - 1) {
      const finalScore = score + (isAnswer ? 1 : 0);
      const reviewData = {
        score: finalScore,
        total_count: quiz.length,
        answers: answersList,
      };

      setQuizList(reviewData);
      setIsQuizFinished(true);
      alert("끝났습니다.");
      //결과페이지로 이동 QuizResult
      router.push("/quiz/result");
    }

    // 2. 퀴즈가 끝나지 않았다면 currentIndex 업데이트 및 다음 문제 로직 실행
    const nextIndex = (currentIndex + 1) % quiz.length;
    setCurrentIndex(nextIndex);
    fetchNewChoices();
  };

  useEffect(() => {
    if (isQuizFinished) {
      console.log("최종점수", score);
      scoreCalculation(score, quiz.length);
    }
  }, [isQuizFinished, score]);

  const fetchNewChoices = async () => {
    //랜덤한 선택지를 가져옴
    const newAnswers = await fetchChoiceWords();


    const updatedAnswers = newAnswers.map((answer: Choice) => ({
      word: answer.word,
      isAnswer: false,
    }));
    const newChoices = [
      ...updatedAnswers,
      { word: quiz[currentIndex].word, isAnswer: true },
    ];
    const shuffledChoices = shuffleArray(newChoices);
    setChoices(shuffledChoices);
  };



  const progress = (currentIndex / quiz.length) * 100;
  return (
    <>
      {/* 진행바 */}
      <h2 className="mt-2">
        Score : {currentIndex}/{quiz.length}
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
            className="bg-white rounded-lg text-center justify-center items-center py-2 font-bold"
            onClick={() => nextQuiz(choice.isAnswer, choice.word)}
          >
            {choice.word}
          </div>
        ))}
      </div>
    </>
  );
};

export default Question;
