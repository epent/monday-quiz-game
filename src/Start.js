import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Button, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    width: "1000px",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Start = (props) => {
  const classes = useStyles();

  const [category, setCategory] = useState("");

  let navigate = useNavigate();

  const categories1 = ["General Knowledge", "Mathematics", "Video Games"].map(
    (category) => {
      return (
        <Box key={category}>
          <Button
            size="large"
            color="primary"
            onClick={() => setCategory(category)}
          >
            {category}
          </Button>
        </Box>
      );
    }
  );
  const categories2 = ["Books", "Film", "Music"].map((category) => {
    return (
      <Box key={category}>
        <Button
          size="large"
          color="primary"
          onClick={() => setCategory(category)}
        >
          {category}
        </Button>
      </Box>
    );
  });
  const categories3 = ["Sports", "Geography", "History"].map((category) => {
    return (
      <Box key={category}>
        <Button
          size="large"
          color="primary"
          onClick={() => setCategory(category)}
        >
          {category}
        </Button>
      </Box>
    );
  });

  const playerName = localStorage.getItem("playerName");

  return (
    <Paper elevation={3} className={classes.paper} sx={{ height: 500 }}>
      <Box className={classes.box} flexDirection="column" sx={{ height: 500 }}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            {playerName}, choose category and press{" "}
            <Box component="span" variant="h4" color="primary.main">
              START
            </Box>{" "}
            to play the game.
          </Typography>
        </Box>
        <Box p={3} display="flex">
          <Box p={3}>{categories1}</Box>
          <Box p={3}>{categories2}</Box>
          <Box p={3}>{categories3}</Box>
        </Box>
        <Box p={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/game/${category}`);
            }}
            className={classes.button}
          >
            start
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Start;
