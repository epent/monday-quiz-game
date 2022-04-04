import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";

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

  const game = (
    <Grid item>
      <Game
        questionCount={questionCount}
        updateQuestionHandler={updateQuestionHandler}
      />
    </Grid>
  );

  const timer = (
    <Grid item>
      <Timer startTimer={questionCount} />
    </Grid>
  );

  return (
    <Grid container spacing={3}>
      {questionCount !== NUMBER_OF_QUESTIONS && game}
      {questionCount !== NUMBER_OF_QUESTIONS && timer}
      {questionCount === NUMBER_OF_QUESTIONS && (
        <Result totalAnswers={totalAnswers} correctAnswers={correctAnswers} />
      )}
    </Grid>
  );
};

export default Board;
