import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import Game from "./Game";
import Timer from "./Timer";

const NUMBER_OF_QUESTIONS = 10;

const Board = (props) => {
  const [questionCount, setQuestionCount] = useState(0);

  const [totalAnswers, setTotalAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [showNextButton, setShowNextButton] = useState(false);

  let navigate = useNavigate();

  const updateQuestionHandler = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers((prevState) => prevState + 1);
    }
    setTotalAnswers((prevState) => prevState + 1);
    setQuestionCount((prevState) => prevState + 1);
    setShowNextButton(false);

    if (questionCount === NUMBER_OF_QUESTIONS - 1) {
      props.setResults({
        totalAnswers: totalAnswers,
        correctAnswers: correctAnswers,
      });
      navigate("/result");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Game
          questionCount={questionCount}
          updateQuestionHandler={updateQuestionHandler}
          showNextButton={showNextButton}
        />
      </Grid>
      <Grid item>
        <Timer
          startTimer={questionCount}
          setShowNextButton={setShowNextButton}
        />
      </Grid>
    </Grid>
  );
};

export default Board;
