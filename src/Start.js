import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Button, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { categoriesList } from "./utils/utils";

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
    height: "700px",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Start = (props) => {
  const classes = useStyles();

  const [category, setCategory] = useState(null);

  let navigate = useNavigate();

  const categories = Object.keys(categoriesList).map((cat) => {
    return (
      <Button
        key={cat}
        size="large"
        color={category === cat ? "secondary" : "primary"}
        onClick={() => setCategory(cat)}
      >
        {cat}
      </Button>
    );
  });

  const playerName = localStorage.getItem("playerName");

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box className={classes.box} flexDirection="column" sx={{ height: 700 }}>
        <Box p={3}>
          <Typography variant="h4" align="center" gutterBottom>
            {playerName}, choose category and press{" "}
            <Box component="span" variant="h4" color="primary.main">
              START
            </Box>{" "}
            to play the game.
          </Typography>
        </Box>
        <Box p={3} display="flex" flexDirection="column">
          {categories}
        </Box>
        <Box p={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/game/${category}`);
            }}
            className={classes.button}
            disabled={category ? false : true}
          >
            start
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Start;
