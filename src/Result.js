import React from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Paper, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    height: "300px",
    width: "1000px",
  },
}));

const Result = (props) => {
  const classes = useStyles();

  let navigate = useNavigate();

  let text;
  if (props.results.correctAnswers / props.results.totalAnswers < 0.5) {
    text = (
      <Box>
        <Typography variant="h4" align="center">
          It's OK!
        </Typography>
        <Typography variant="h4" align="center">
          You answered correctly {props.results.correctAnswers} questions out of{" "}
          {props.results.totalAnswers}.
        </Typography>
        <Typography variant="h4" align="center">
          May be it was a bad luck. Wanna try once more?
        </Typography>
      </Box>
    );
  }
  if (
    props.results.correctAnswers / props.results.totalAnswers >= 0.8 &&
    props.results.correctAnswers / props.results.totalAnswers < 1
  ) {
    text = (
      <Box>
        <Typography variant="h4" align="center">
          Not bad!
        </Typography>
        <Typography variant="h4" align="center">
          You answered correctly {props.results.correctAnswers} questions out of{" "}
          {props.results.totalAnswers}.
        </Typography>
        <Typography variant="h4" align="center">
          Congratulations! Wanna try once more?
        </Typography>
      </Box>
    );
  }
  if (props.results.correctAnswers / props.results.totalAnswers === 1) {
    text = (
      <Box>
        <Typography variant="h4" align="center">
          Wow! Look, someone smart is here!
        </Typography>
        <Typography variant="h4" align="center">
          You answered correctly {props.results.correctAnswers} questions out of{" "}
          {props.results.totalAnswers}.
        </Typography>
        <Typography variant="h4" align="center">
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
        sx={{ height: 300 }}
      >
        <Box p={3} mx={5}>
          {text}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box p={1}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                navigate("/start");
              }}
            >
              play again
            </Button>
          </Box>
          <Box p={1}>
            <Button
              variant="contained"
              color="default"
              size="large"
              onClick={() => {
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
