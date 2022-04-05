import React, { useState, useEffect } from "react";

import { Typography, Paper, Box } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    height: "300px",
    width: "200px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
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

  let timer;
  countDown >= 10 ? (timer = `00:${countDown}`) : (timer = `00:0${countDown}`);

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box className={classes.box}>
        <Box p={1}>
          <Typography variant="h4" align="center">
            Timer
          </Typography>
        </Box>
        <Box p={1}>
          <TimerIcon color="primary" style={{ fontSize: 80 }} />
        </Box>
        <Box p={1}>
          <Typography variant="h3" align="center">
            {timer}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Timer;
