import React from "react";

import { Box } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
}));

const ProgressBar = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} m={3}>
      <LinearProgress variant="determinate" value={props.progress * 10} />
    </Box>
  );
};

export default ProgressBar;
