import React, { useState, useEffect } from "react";
import he from "he";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Typography, Button, Paper, Box, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { categoriesList, NUMBER_OF_QUESTIONS } from "./utils/utils";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import {
  general,
  math,
  books,
  film,
  geography,
  history,
  music,
  sports,
  videogames,
} from "./images";

const Game = (props) => {
  const [gameData, setGameData] = useState(null);

  const params = useParams();

  let image;

  if (params.categoryName === "General Knowledge") image = general;
  if (params.categoryName === "Books") image = books;
  if (params.categoryName === "Film") image = film;
  if (params.categoryName === "Geography") image = geography;
  if (params.categoryName === "History") image = history;
  if (params.categoryName === "Mathematics") image = math;
  if (params.categoryName === "Music") image = music;
  if (params.categoryName === "Sports") image = sports;
  if (params.categoryName === "Video Games") image = videogames;

  const useStyles = makeStyles((theme) => ({
    button: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    paper: {
      backgroundColor: "#fafafa",
      backgroundImage: `url(${image})`,
      backgroundRepeat: "repeat",
      borderRadius: 10,
    },
    typography: {
      textAlign: "center",
      [theme.breakpoints.up("xs")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "30px",
      },
    },
  }));
  const classes = useStyles();

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
      <Hidden lgUp>
        <Box p={3}>
          <Timer
            startTimer={props.questionCount}
            setShowNextButton={props.setShowNextButton}
          />
        </Box>
      </Hidden>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box my={5} mx={10}>
          <Typography className={classes.typography} color="primary">
            {questionData.question}
          </Typography>
        </Box>
        <Box
          my={3}
          mx={10}
          className={classes.button}
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
        >
          {props.showNextButton ? nextButton : answerButtons}
        </Box>
        <ProgressBar progress={props.questionCount} />
      </Box>
    </Paper>
  );
};

export default Game;
