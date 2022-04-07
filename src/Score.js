import React from "react";

import { Paper, Box } from "@material-ui/core";
import CloudRoundedIcon from "@material-ui/icons/CloudRounded";
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";

const Score = (props) => {
  const clouds = props.scoreList.map((elm, i) => {
    return elm === "correct" ? (
      <Box p={1}>
        <CloudRoundedIcon style={{ fontSize: 40 }} color="secondary" />
      </Box>
    ) : (
      <Box p={1}>
        <CloudOutlinedIcon
          style={{ fontSize: 40 }}
          color={props.questionCount === i ? "primary" : "secondary"}
        />
      </Box>
    );
  });

  return (
    <Paper elevation={3}>
      <Box display="flex">{clouds}</Box>
    </Paper>
  );
};

export default Score;
