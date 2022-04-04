import React, { useState, useEffect } from "react";
import he from "he";

import { Typography, Button, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const NUMBER_OF_QUESTIONS = 10;

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

  useEffect(() => {
    fetch("/.netlify/functions/game-data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results.slice(0, NUMBER_OF_QUESTIONS));
        setGameData(data.results.slice(0, NUMBER_OF_QUESTIONS));
      });
  }, []);

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
      onClick={props.updateQuestionHandler}
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
      </Box>
    </Paper>
  );
};

export default Game;
