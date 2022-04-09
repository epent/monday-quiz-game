import React from "react";

import { Paper, Box } from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    flexGrow: 1,
    alignSelf: "center",
    textAlign: "center",
    padding: theme.spacing(1),
  },
}));

const ProgressList = (props) => {
  const classes = useStyles();

  const clouds = props.progressList.map((elm, i) => {
    return elm === "correct" ? (
      <Box key={elm + i} className={classes.box}>
        <CheckCircleIcon style={{ fontSize: 40 }} color="secondary" />
      </Box>
    ) : elm === "wrong" ? (
      <Box key={elm + i} className={classes.box}>
        <CancelIcon style={{ fontSize: 40 }} color="secondary" />
      </Box>
    ) : (
      <Box key={elm + i} className={classes.box}>
        <RadioButtonUncheckedIcon
          style={{ fontSize: 40 }}
          color={props.questionCount === i ? "primary" : "secondary"}
        />
      </Box>
    );
  });

  return (
    <Paper elevation={3}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {clouds}
      </Box>
    </Paper>
  );
};

export default ProgressList;
