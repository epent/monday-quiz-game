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
import { withStyles } from "@material-ui/core/styles";

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
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(2),
      },
    },
    buttonGreen: {
      backgroundColor: "#6fbf73",
    },
    buttonGrey: {
      backgroundColor: "#90a4ae",
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

  const questionData = {
    question: "",
    answers: [],
  };
  if (gameData && props.questionCount !== NUMBER_OF_QUESTIONS) {
    gameData[props.questionCount].incorrect_answers.forEach((answer) => {
      questionData.answers.push(he.decode(answer));
    });

    const randomNum = Math.floor(Math.random() * 4);

    questionData.answers.splice(
      randomNum,
      0,
      he.decode(gameData[props.questionCount].correct_answer)
    );

    questionData.question = he.decode(gameData[props.questionCount].question);
  }

  const AnswerButton = withStyles({})(Button);

  const answerButtons = questionData.answers.map((answer) => {
    return (
      <AnswerButton
        key={answer}
        className={
          !props.showCorrectAnswer
            ? classes.buttonPink
            : answer === he.decode(gameData[props.questionCount].correct_answer)
            ? classes.buttonGreen
            : classes.buttonGrey
        }
        variant="contained"
        size="large"
        onClick={() => {
          props.setShowCorrectAnswer(true);
          props.updateQuestionHandler(
            answer === he.decode(gameData[props.questionCount].correct_answer),
            gameData[props.questionCount].difficulty
          );
        }}
      >
        {answer}
      </AnswerButton>
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
            <Typography className={classes.typography} color="primary">
              {questionData.question}
            </Typography>
          </Paper>
        </Box>
        <Box
          sx={{
            position: "absolute",
          }}
        >
          <Slide
            direction="up"
            in={props.showAddScore}
            mountOnEnter
            unmountOnExit
          >
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
                +{props.addScore}
              </Typography>
            </Box>
          </Slide>
        </Box>
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
