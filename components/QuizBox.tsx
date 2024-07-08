// components/QuizBox.js
import React from 'react';

const QuizBox = ({ onClick }) => {
  return (
    <div className="quiz_box flex-1 bg-green-500 p-4 my-4 cursor-pointer rounded-lg text-black w-64 h-32" onClick={onClick}>
      <p>Quiz</p>
      <p>Latest 10/30</p>
      <p>icon</p>
    </div>
  );
};

export default QuizBox;