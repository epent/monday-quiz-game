import React from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Paper, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fafafa",
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

const Result = (props) => {
  const classes = useStyles();

  let navigate = useNavigate();

  const correct = (props.correctAnswers / props.totalAnswers) * 100;
  const incorrect = 100 - (props.correctAnswers / props.totalAnswers) * 100;

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box m={2} mt={3}>
          <Typography variant="h4" align="center">
            Not bad! You scored {props.score} points
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="flex-end">
          <Box m={1} mt={3}>
            <Typography variant="h5" align="center">
              {correct}% correct
            </Typography>
          </Box>
          <Box m={1} mt={3}>
            <Typography variant="h5" align="center">
              {incorrect}% incorrect
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
          sx={{ height: "300px" }}
        >
          <Box
            m={1}
            sx={{
              width: "110px",
              height: `${correct}%`,
              backgroundColor: "#4db6ac",
            }}
          ></Box>
          <Box
            m={1}
            sx={{
              width: "110px",
              height: `${incorrect}%`,
              backgroundColor: "#f6a5c0",
            }}
          ></Box>
        </Box>
        <Box m={1} mt={3}>
          <Typography variant="h5" align="center">
            Would you like to try again?
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box p={1} mb={3}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                props.setTotalAnswers(0);
                props.setCorrectAnswers(0);
                props.setScore(0);
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
                props.setScore(0);
                props.setShowBack(false);
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
