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

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 300 }}
      >
        <Box p={3}>
          <Typography variant="h5">
            You answered correctly {props.correctAnswers} questions out of{" "}
            {props.totalAnswers}.
          </Typography>
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
