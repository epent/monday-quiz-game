import React from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Button, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { NUMBER_OF_QUESTIONS } from "./utils/utils";

const useStyles = makeStyles((theme) => ({
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
  },
  flexbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  typographySmall: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "25px",
    },
  },
  typographyBig: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
    },
  },
  colorLight: {
    color: "#70c4bc",
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
    },
  },
  colorDark: {
    color: "#357f78",
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
    },
  },
}));

const Rules = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const playerName = localStorage.getItem("playerName");

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box className={classes.flexbox}>
        <Box m={3} mb={1}>
          <Typography className={classes.typographyBig} gutterBottom>
            Nice to meet you, {playerName}!
          </Typography>
        </Box>
        <Box m={3} mb={1}>
          <Typography className={classes.typographySmall} gutterBottom>
            The game consists of {NUMBER_OF_QUESTIONS} questions with different
            levels of difficulty. For each correct answer you get points
          </Typography>
          <Box m={4}>
            <Typography className={classes.colorLight} gutterBottom>
              Easy: 10 points
            </Typography>
            <Typography
              className={classes.typographyBig}
              gutterBottom
              color="primary"
            >
              Medium: 20 points
            </Typography>
            <Typography className={classes.colorDark} gutterBottom>
              Hard: 30 points
            </Typography>
          </Box>
          <Typography className={classes.typographySmall} gutterBottom>
            Try to answer correctly as many questions as possible!
          </Typography>
        </Box>
        <Box m={3} mt={1} sx={{ width: "80%" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
            onClick={() => {
              navigate("/start");
            }}
          >
            next
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Rules;
