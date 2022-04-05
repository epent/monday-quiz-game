import React, { useState } from "react";

import { Typography, Button, Paper, Box, TextField } from "@material-ui/core";
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

const Welcome = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [chooseCategory, setChooseCategory] = useState(false);

  const categories1 = [
    "General Knowledge",
    "Science: Mathematics",
    "Entertainment: Video Games",
  ].map((category) => {
    return (
      <Box key={category}>
        <Button size="large" color="primary">
          {category}
        </Button>
      </Box>
    );
  });
  const categories2 = [
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
  ].map((category) => {
    return (
      <Box key={category}>
        <Button size="large" color="primary">
          {category}
        </Button>
      </Box>
    );
  });
  const categories3 = ["Sports", "Geography", "History"].map((category) => {
    return (
      <Box key={category}>
        <Button size="large" color="primary">
          {category}
        </Button>
      </Box>
    );
  });

  const updateNameHandler = (event) => {
    setName(event.target.value);
  };

  const submitNameHandler = (event) => {
    event.preventDefault();

    setChooseCategory(true);
  };

  const form = (
    <form onSubmit={submitNameHandler}>
      <Box className={classes.box} flexDirection="row">
        <TextField
          variant="outlined"
          color="primary"
          label="Your Name"
          value={name}
          onChange={updateNameHandler}
        />
        <Box p={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={submitNameHandler}
            className={classes.button}
          >
            submit
          </Button>
        </Box>
      </Box>
    </form>
  );

  const welcome1 = (
    <Paper elevation={3} className={classes.paper} sx={{ height: 300 }}>
      <Box className={classes.box} flexDirection="column" sx={{ height: 300 }}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome dear friend! What's your name?
          </Typography>
        </Box>
        {form}
      </Box>
    </Paper>
  );

  const welcome2 = (
    <Paper elevation={3} className={classes.paper} sx={{ height: 500 }}>
      <Box className={classes.box} flexDirection="column" sx={{ height: 500 }}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Hi, {name}! Choose category and press{" "}
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
            onClick={submitNameHandler}
            className={classes.button}
          >
            start
          </Button>
        </Box>
      </Box>
    </Paper>
  );

  return <div>{chooseCategory ? welcome2 : welcome1}</div>;
};

export default Welcome;
