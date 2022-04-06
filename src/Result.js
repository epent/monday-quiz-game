import React from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Paper, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    // [theme.breakpoints.up("xs")]: {
    //   width: 300,
    //   height: 500,
    // },
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

const Result = (props) => {
  const classes = useStyles();

  let navigate = useNavigate();

  let text;
  if (props.correctAnswers / props.totalAnswers < 0.5) {
    text = (
      <Box>
        <Typography className={classes.typography}>It's OK!</Typography>
        <Typography className={classes.typography}>
          You answered correctly {props.correctAnswers} questions out of{" "}
          {props.totalAnswers}.
        </Typography>
        <Typography className={classes.typography}>
          May be it was a bad luck. Wanna try once more?
        </Typography>
      </Box>
    );
  }
  if (
    props.correctAnswers / props.totalAnswers >= 0.8 &&
    props.correctAnswers / props.totalAnswers < 1
  ) {
    text = (
      <Box>
        <Typography className={classes.typography}>Not bad!</Typography>
        <Typography className={classes.typography}>
          You answered correctly {props.correctAnswers} questions out of{" "}
          {props.totalAnswers}.
        </Typography>
        <Typography className={classes.typography}>
          Congratulations! Wanna try once more?
        </Typography>
      </Box>
    );
  }
  if (props.correctAnswers / props.totalAnswers === 1) {
    text = (
      <Box>
        <Typography className={classes.typography}>
          Wow! Look, someone smart is here!
        </Typography>
        <Typography className={classes.typography}>
          You answered correctly {props.correctAnswers} questions out of{" "}
          {props.totalAnswers}.
        </Typography>
        <Typography className={classes.typography}>
          Congratulations! Wanna try once more?
        </Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box m={5}>{text}</Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box p={1} mb={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                props.setTotalAnswers(0);
                props.setCorrectAnswers(0);
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
                props.setTotalAnswers(0);
                props.setCorrectAnswers(0);
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
