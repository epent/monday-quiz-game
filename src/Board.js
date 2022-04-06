import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import Game from "./Game";
import Timer from "./Timer";
import { NUMBER_OF_QUESTIONS } from "./utils/utils";

const Board = (props) => {
  const [questionCount, setQuestionCount] = useState(0);

  const [showNextButton, setShowNextButton] = useState(false);

  let navigate = useNavigate();

  const updateQuestionHandler = (isCorrect) => {
    if (isCorrect) {
      props.setCorrectAnswers((prevState) => prevState + 1);
    }
    props.setTotalAnswers((prevState) => prevState + 1);
    setQuestionCount((prevState) => prevState + 1);
    setShowNextButton(false);

    if (questionCount === NUMBER_OF_QUESTIONS - 1) {
      navigate("/result");
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item>
        <Game
          questionCount={questionCount}
          updateQuestionHandler={updateQuestionHandler}
          showNextButton={showNextButton}
          setShowNextButton={setShowNextButton}
        />
      </Grid>
      {/* <Grid item>
        <Timer
          startTimer={questionCount}
          setShowNextButton={setShowNextButton}
          bigTimer
        />
      </Grid> */}
    </Grid>
  );
};

export default Board;
