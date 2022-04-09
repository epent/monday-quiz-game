import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Hidden } from "@material-ui/core";

import Game from "./Game";
import Timer from "./Timer";
import ProgressList from "./ProgressList";
import { NUMBER_OF_QUESTIONS } from "./utils/utils";

const Board = (props) => {
  const navigate = useNavigate();

  const [questionCount, setQuestionCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [progressList, setProgressList] = useState(
    Array.from({ length: 10 }, () => "empty")
  );

  const updateQuestionHandler = (correct, difficulty) => {
    let pointsRate;
    difficulty === "easy"
      ? (pointsRate = 10)
      : difficulty === "medium"
      ? (pointsRate = 20)
      : (pointsRate = 30);

    const updatedProgressList = [...progressList];

    if (correct) {
      props.setCorrectAnswers((prevState) => prevState + 1);
      props.setScore((prevState) => prevState + pointsRate);
      setPoints(pointsRate);
      setShowPoints(true);

      updatedProgressList[questionCount] = "correct";
    } else {
      updatedProgressList[questionCount] = "wrong";
    }

    setProgressList(updatedProgressList);
    setShowNextButton(false);

    setTimeout(() => {
      setShowCorrectAnswer(false);
      setShowPoints(false);
      setQuestionCount((prevState) => prevState + 1);

      if (questionCount === NUMBER_OF_QUESTIONS - 1) {
        navigate("/result");
      }
    }, 1000);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={9}>
        <Game
          questionCount={questionCount}
          updateQuestionHandler={updateQuestionHandler}
          showNextButton={showNextButton}
          setShowNextButton={setShowNextButton}
          setShowCorrectAnswer={setShowCorrectAnswer}
          showCorrectAnswer={showCorrectAnswer}
          points={points}
          showPoints={showPoints}
        />
      </Grid>
      <Hidden smDown>
        <Grid item md={3} sx={{ height: "100%" }}>
          <Timer
            startTimer={questionCount}
            setShowNextButton={setShowNextButton}
            bigTimer
          />
        </Grid>
      </Hidden>
      <Grid item xs={12}>
        <ProgressList
          progressList={progressList}
          questionCount={questionCount}
        />
      </Grid>
    </Grid>
  );
};

export default Board;
