import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import Game from "./Game";
import Timer from "./Timer";
import Score from "./Score";
import { NUMBER_OF_QUESTIONS } from "./utils/utils";

const Board = (props) => {
  const [questionCount, setQuestionCount] = useState(0);

  const [showNextButton, setShowNextButton] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const [scoreList, setScoreList] = useState(
    Array.from({ length: 10 }, () => "empty")
  );

  let navigate = useNavigate();

  const updateQuestionHandler = (correct, difficulty) => {
    const updatedScoreList = [...scoreList];

    if (correct) {
      props.setCorrectAnswers((prevState) => prevState + 1);

      updatedScoreList[questionCount] = "correct";
      setScoreList(updatedScoreList);

      // difficulty === "easy"
      //   ? props.setScore((prevState) => prevState + 10)
      //   : difficulty === "medium"
      //   ? props.setScore((prevState) => prevState + 20)
      //   : props.setScore((prevState) => prevState + 30);
    } else {
      updatedScoreList[questionCount] = "wrong";
      setScoreList(updatedScoreList);
    }

    props.setTotalAnswers((prevState) => prevState + 1);
    setShowNextButton(false);

    setTimeout(() => {
      setShowCorrectAnswer(false);
      setQuestionCount((prevState) => prevState + 1);
    }, 2000);

    if (questionCount === NUMBER_OF_QUESTIONS - 1) {
      navigate("/result");
    }
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
        />
      </Grid>
      <Hidden smDown>
        <Grid item  md={3} sx={{ height: "100%" }}>
          <Timer
            startTimer={questionCount}
            setShowNextButton={setShowNextButton}
            bigTimer
          />
        </Grid>
      </Hidden>
      <Grid item xs={12}>
        <Score scoreList={scoreList} questionCount={questionCount} />
      </Grid>
    </Grid>
  );
};

export default Board;
