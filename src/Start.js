import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Button, Paper, Box, Link } from "@material-ui/core";
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
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  typography: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
    },
  },
  link: {
    [theme.breakpoints.up("xs")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "25px",
    },
  },
}));

const Start = (props) => {
  const classes = useStyles();

  const [category, setCategory] = useState(null);

  let navigate = useNavigate();

  const categories = Object.keys(categoriesList).map((cat) => {
    return (
      <Box m={1}>
        <Link
          key={cat}
          className={classes.link}
          component="button"
          underline="none"
          color={category === cat ? "secondary" : "primary"}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </Link>
      </Box>
    );
  });

  const playerName = localStorage.getItem("playerName");

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box className={classes.box} flexDirection="column">
        <Box m={3} mb={1}>
          <Typography className={classes.typography} gutterBottom>
            {playerName}, choose category
          </Typography>
        </Box>
        <Box m={2} display="flex" flexDirection="column" alignItems="center">
          {categories}
        </Box>
        <Box m={3} mt={1} sx={{ width: "80%" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.setShowBackButton(true);
              navigate(`/game/${category}`);
            }}
            className={classes.button}
            disabled={category ? false : true}
            fullWidth
          >
            start
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Start;
