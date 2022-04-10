import React from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Paper, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { NUMBER_OF_QUESTIONS } from "../utils/utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  typography1: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "23px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
    },
  },
  typography2: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "25px",
    },
  },
}));

const Result = (props) => {
  const classes = useStyles();

  let navigate = useNavigate();

  const correct = (props.correctAnswers / NUMBER_OF_QUESTIONS) * 100;
  const incorrect = 100 - (props.correctAnswers / NUMBER_OF_QUESTIONS) * 100;

  const resultHeaders = [correct, incorrect].map((result, i) => {
    return (
      <Box m={1} mt={3}>
        <Typography className={classes.typography2} gutterBottom>
          {result}% {i === 0 ? "correct" : "incorrect"}
        </Typography>
      </Box>
    );
  });

  const resultBars = ["#4db6ac", "#f6a5c0"].map((color, i) => {
    return (
      <Box
        m={1}
        sx={{
          width: "100px",
          height: i === 0 ? `${correct}%` : `${incorrect}%`,
          backgroundColor: color,
        }}
      ></Box>
    );
  });

  const playerName = localStorage.getItem("playerName");

  let cheeringPhrase1, cheeringPhrase2, finishPhrase;

  if (props.score === props.totalScore) {
    cheeringPhrase1 = "Wow!";
    cheeringPhrase2 = `Congratulations, ${playerName}!`;
    finishPhrase = "Would you like to challenge yourself again?";
  } else {
    cheeringPhrase1 = "Not bad!";
    cheeringPhrase2 = `But you can do better, ${playerName} :)`;
    finishPhrase = "Would you like to try again?";
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box className={classes.box}>
        <Box mx={2} mt={3}>
          <Typography className={classes.typography1}>
            {cheeringPhrase1} You scored{" "}
            <Box component="span" color="secondary.main">
              {props.score}
            </Box>{" "}
            out of{" "}
            <Box component="span" color="primary.main">
              {props.totalScore}
            </Box>{" "}
            points. {cheeringPhrase2}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="flex-end">
          {resultHeaders}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          sx={{ height: "250px" }}
        >
          {resultBars}
        </Box>
        <Box m={1} mt={3}>
          <Typography className={classes.typography2}>
            {finishPhrase}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box p={1} mb={3}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                props.setCorrectAnswers(0);
                props.setScore(0);
                props.setTotalScore(0);
                props.setShowBackButton(false);
                navigate("/start");
              }}
            >
              play again
            </Button>
          </Box>
          <Box p={1} mb={3}>
            <Button
              variant="contained"
              color="default"
              size="large"
              onClick={() => {
                props.setCorrectAnswers(0);
                props.setScore(0);
                props.setTotalScore(0);
                props.setShowBackButton(false);
                localStorage.removeItem("playerName");
                navigate("/");
              }}
            >
              exit
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Result;
