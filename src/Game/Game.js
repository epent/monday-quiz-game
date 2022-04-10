import React, { useState, useEffect } from "react";
import he from "he";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Typography,
  Button,
  Paper,
  Box,
  Hidden,
  Slide,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { categoriesList, NUMBER_OF_QUESTIONS } from "../utils/utils";
import ProgressBar from "./Progress/ProgressBar";
import Timer from "./Timer";
import images from "../images";

const Game = (props) => {
  const params = useParams();

  const [gameData, setGameData] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswerPlace, setCorrectAnswerPlace] = useState();

  const image = images[params.categoryName];

  const useStyles = makeStyles((theme) => ({
    button: {
      "& > *": {
        margin: theme.spacing(1),
      },
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(2),
      },
    },
    buttonGreen: {
      backgroundColor: "#6fbf73",
      "&:hover": {
        backgroundColor: "#6fbf73",
      },
    },
    buttonGrey: {
      backgroundColor: "#90a4ae",
      "&:hover": {
        backgroundColor: "#90a4ae",
      },
    },
    buttonPink: {
      backgroundColor: "#f6a5c0",
    },
    paper: {
      backgroundImage: `url(${image})`,
      backgroundRepeat: "repeat",
      borderRadius: 10,
    },
    typographyPaper: {
      border: "2px dashed",
      borderColor: "#4db6ac",
      borderRadius: 15,
    },
    typography: {
      textAlign: "center",
      [theme.breakpoints.up("xs")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "30px",
      },
      padding: theme.spacing(5),
    },
    typographyBox: {
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(3),
      },
    },
    difficulty: {
      textAlign: "center",
      color: "#f6a5c0",
      [theme.breakpoints.up("xs")]: {
        fontSize: "18px",
        marginTop: theme.spacing(1),
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "20px",
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${
          categoriesList[params.categoryName]
        }&type=multiple`
      );
      const data = response.data.results;

      setGameData(data);
      console.log(data);
    };

    fetchData();
  }, [params.categoryName]);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 4);
    setCorrectAnswerPlace(randomNum);
  }, [props.questionCount]);

  const questionData = {
    question: "",
    answers: [],
  };
  const fillQuestionData = () => {
    if (gameData && props.questionCount !== NUMBER_OF_QUESTIONS) {
      const addIncorrectAnswers = () => {
        gameData[props.questionCount].incorrect_answers.forEach((answer) => {
          questionData.answers.push(he.decode(answer));
        });
      };
      const addCorrectAnswer = () => {
        questionData.answers.splice(
          correctAnswerPlace,
          0,
          he.decode(gameData[props.questionCount].correct_answer)
        );
      };
      const addQuestion = () => {
        questionData.question = he.decode(
          gameData[props.questionCount].question
        );
      };
      addIncorrectAnswers();
      addCorrectAnswer();
      addQuestion();
    }
  };
  fillQuestionData();

  const answerButtons = questionData.answers.map((answer) => {
    const isCorrect =
      answer === he.decode(gameData[props.questionCount].correct_answer);

    return (
      <Button
        key={answer}
        className={
          !showCorrectAnswer
            ? classes.buttonPink
            : isCorrect
            ? classes.buttonGreen
            : classes.buttonGrey
        }
        variant="contained"
        size="large"
        onClick={() => {
          setShowCorrectAnswer(true);
          props.updateQuestionHandler(
            isCorrect,
            gameData[props.questionCount].difficulty
          );
          setTimeout(() => {
            setShowCorrectAnswer(false);
          }, 1000);
        }}
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

  const points = (
    <Box
      sx={{
        position: "absolute",
      }}
    >
      <Slide direction="up" in={props.showPoints} mountOnEnter unmountOnExit>
        <Box
          p={1}
          mb={1}
          sx={{
            backgroundColor: "#FFFFFF",
            border: "2px solid #f6a5c0",
            borderRadius: 15,
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography variant="h5" align="center" color="secondary">
            +{props.points}
          </Typography>
        </Box>
      </Slide>
    </Box>
  );

  return (
    <Paper elevation={3} className={classes.paper}>
      <Hidden mdUp>
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
        <Box className={classes.typographyBox}>
          <Paper elevation={0} className={classes.typographyPaper}>
            {gameData && props.questionCount < 10 && (
              <Typography className={classes.difficulty}>
                Difficulty: {gameData[props.questionCount].difficulty}
              </Typography>
            )}
            <Typography className={classes.typography} color="primary">
              {questionData.question}
            </Typography>
          </Paper>
        </Box>
        {points}
        <Box
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
