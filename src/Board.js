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

  const [scoreList, setScoreList] = useState(
    Array.from({ length: 10 }, () => "empty")
  );

  let navigate = useNavigate();

  const updateQuestionHandler = (correct) => {
    const updatedScoreList = [...scoreList];

    if (correct) {
      props.setCorrectAnswers((prevState) => prevState + 1);

      updatedScoreList[questionCount] = "correct";
      setScoreList(updatedScoreList);
    } else {
      updatedScoreList[questionCount] = "wrong";
      setScoreList(updatedScoreList);
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
      <Grid item xs={12} md={9}>
        <Game
          questionCount={questionCount}
          updateQuestionHandler={updateQuestionHandler}
          showNextButton={showNextButton}
          setShowNextButton={setShowNextButton}
        />
      </Grid>
      <Hidden smDown>
        <Grid item xs={0} md={3} sx={{ height: "100%" }}>
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
