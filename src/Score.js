import React from "react";

import { Paper, Box } from "@material-ui/core";
import CloudRoundedIcon from "@material-ui/icons/CloudRounded";
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    flexGrow: 1,
    alignSelf: "center",
    textAlign: "center",
    padding: theme.spacing(1),
  },
}));

const Score = (props) => {
  const classes = useStyles();

  const clouds = props.scoreList.map((elm, i) => {
    return elm === "correct" ? (
      <Box className={classes.box}>
        <CloudRoundedIcon style={{ fontSize: 40 }} color="secondary" />
      </Box>
    ) : (
      <Box className={classes.box}>
        <CloudOutlinedIcon
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

export default Score;
