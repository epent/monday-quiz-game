import React, { useState, useEffect } from "react";
import he from "he";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Typography, Button, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { categoriesList, NUMBER_OF_QUESTIONS } from "./utils/utils";
import ProgressBar from "./ProgressBar";

const useStyles = makeStyles((theme) => ({
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    width: "1000px",
    height: "300px",
  },
}));

const Game = (props) => {
  const classes = useStyles();

  const [gameData, setGameData] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${
          categoriesList[params.categoryName]
        }`
      );
      const data = response.data.results;

      setGameData(data);
      console.log(data);
    };

    fetchData();
  }, [params.categoryName]);

  const questionData = {
    question: "",
    answers: [],
  };
  if (gameData && props.questionCount !== NUMBER_OF_QUESTIONS) {
    gameData[props.questionCount].incorrect_answers.forEach((answer) => {
      questionData.answers.push(he.decode(answer));
    });

    let max;
    questionData.answers.length > 1 ? (max = 4) : (max = 2);
    const randomNum = Math.floor(Math.random() * max);

    questionData.answers.splice(
      randomNum,
      0,
      he.decode(gameData[props.questionCount].correct_answer)
    );

    questionData.question = he.decode(gameData[props.questionCount].question);
  }

  const answerButtons = questionData.answers.map((answer) => {
    return (
      <Button
        key={answer}
        variant="contained"
        color="primary"
        onClick={() =>
          props.updateQuestionHandler(
            answer === he.decode(gameData[props.questionCount].correct_answer)
          )
        }
      >
        {answer}
      </Button>
    );
  });

  const nextButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={() => props.updateQuestionHandler(false)}
    >
      next
    </Button>
  );

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 300 }}
      >
        <Box p={3} mx={5}>
          <Typography variant="h4" align="center" gutterBottom>
            {questionData.question}
          </Typography>
        </Box>
        <Box
          p={3}
          className={classes.button}
          display="flex"
          justifyContent="center"
        >
          {props.showNextButton ? nextButton : answerButtons}
        </Box>
        <ProgressBar progress={props.questionCount} />
      </Box>
    </Paper>
  );
};

export default Game;
