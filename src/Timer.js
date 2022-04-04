import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);

  useEffect(() => {
    let timer;

    if (runTimer) {
      setCountDown(5);
      timer = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [runTimer, props.startTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  useEffect(() => {
    setRunTimer(true);
  }, [props.startTimer]);

  return (
    <div>
      <p>{`${countDown} sec`}</p>
    </div>
  );
};

export default Timer;
