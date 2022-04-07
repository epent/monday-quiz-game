import React, { useState, useEffect } from "react";

import { Typography, Paper, Box } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    [theme.breakpoints.up("xs")]: {
      height: "100%",
    },
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  typography: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "30px",
    },
  },
}));

const Timer = (props) => {
  const classes = useStyles();

  const { setShowNextButton, startTimer } = props;

  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(15);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [runTimer, startTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
      setShowNextButton(true);
    }
  }, [countDown, runTimer, setShowNextButton]);

  useEffect(() => {
    setRunTimer(true);
  }, [startTimer]);

  let seconds;
  countDown >= 10
    ? (seconds = `00:${countDown}`)
    : (seconds = `00:0${countDown}`);

  let timer;

  props.bigTimer
    ? (timer = (
        <Paper elevation={3} className={classes.paper}>
          <Box className={classes.box} sx={{ height: "100%" }}>
            <Box p={1}>
              <Typography className={classes.typography}>Timer</Typography>
            </Box>
            <Box p={1}>
              <TimerIcon color="primary" style={{ fontSize: 80 }} />
            </Box>
            <Box p={1}>
              <Typography variant="h3" align="center">
                {seconds}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))
    : (timer = (
        <Typography variant="h5" align="center">
          {seconds}
        </Typography>
      ));

  return <Box sx={{ height: "100%" }}>{timer}</Box>;
};

export default Timer;
