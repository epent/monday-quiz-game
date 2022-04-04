import React from "react";

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

  let text;
  if (props.correctAnswers / props.totalAnswers < 0.5) {
    text = (
      <Box>
        <Typography variant="h4" align="center">
          It's OK!
        </Typography>
        <Typography variant="h4" align="center">
          You answered correctly {props.correctAnswers} questions out of
          {props.totalAnswers}.
        </Typography>
        <Typography variant="h4" align="center">
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
        <Typography variant="h4" align="center">
          Not bad!
        </Typography>
        <Typography variant="h4" align="center">
          You answered correctly {props.correctAnswers} questions out of
          {props.totalAnswers}.
        </Typography>
        <Typography variant="h4" align="center">
          Congratulations! Wanna try once more?
        </Typography>
      </Box>
    );
  }
  if (props.correctAnswers / props.totalAnswers === 1) {
    text = (
      <Box>
        <Typography variant="h4" align="center">
          Wow! Look, someone smart is here!
        </Typography>
        <Typography variant="h4" align="center">
          You answered correctly {props.correctAnswers} questions out of
          {props.totalAnswers}.
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
        <Box p={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={props.updateQuestionHandler}
          >
            play again
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Result;
