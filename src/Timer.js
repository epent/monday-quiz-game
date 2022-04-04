import React, { useState, useEffect } from "react";

import { Typography, Paper, Box, Grid } from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    height: "300px",
    width: "200px",
  },
}));

const Timer = (props) => {
  const classes = useStyles();

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
  }, [runTimer, props.startTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
      props.setShowNextButton(true);
    }
  }, [countDown, runTimer]);

  useEffect(() => {
    setRunTimer(true);
  }, [props.startTimer]);

  let timer;
  countDown >= 10 ? (timer = `00:${countDown}`) : (timer = `00:0${countDown}`);

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 300 }}
      >
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
