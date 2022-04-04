import React, { useState } from "react";

import Game from "./Game";
import Result from "./Result";
import Timer from "./Timer";

const NUMBER_OF_QUESTIONS = 10;

const Board = () => {
  const [questionCount, setQuestionCount] = useState(0);

  const [totalAnswers, setTotalAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const updateQuestionHandler = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers((prevState) => prevState + 1);
    }
    setTotalAnswers((prevState) => prevState + 1);
    setQuestionCount((prevState) => prevState + 1);
  };

  return (
    <div>
      {questionCount !== NUMBER_OF_QUESTIONS && (
        <Game
          questionCount={questionCount}
          updateQuestionHandler={updateQuestionHandler}
        />
      )}
      {questionCount === NUMBER_OF_QUESTIONS && (
        <Result totalAnswers={totalAnswers} correctAnswers={correctAnswers} />
      )}
      <Timer startTimer={questionCount} />
    </div>
  );
};

export default Board;
