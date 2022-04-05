import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    [theme.breakpoints.up("xs")]: {
      width: 300,
    },
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  typography: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "25px",
    },
  },
}));

const Welcome = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("");

  let navigate = useNavigate();

  const updateNameHandler = (event) => {
    setName(event.target.value);
  };

  const submitNameHandler = (event) => {
    event.preventDefault();

    if (name.length > 0) {
      localStorage.setItem("playerName", name);
      navigate("/start");
    }
  };

  const form = (
    <form onSubmit={submitNameHandler}>
      <Box className={classes.box} p={1} flexDirection="row">
        <Box p={1}>
          <TextField
            variant="outlined"
            color="primary"
            label="Your Name"
            value={name}
            onChange={updateNameHandler}
          />
        </Box>
        <Box p={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={submitNameHandler}
            className={classes.button}
            disabled={name.length === 0 ? true : false}
          >
            submit
          </Button>
        </Box>
      </Box>
    </form>
  );

  return (
    <Paper elevation={3} className={classes.paper} sx={{ height: 300 }}>
      <Box className={classes.box} flexDirection="column" sx={{ height: 300 }}>
        <Box p={3}>
          <Typography className={classes.typography} gutterBottom>
            Welcome dear friend! What's your name?
          </Typography>
        </Box>
        {form}
      </Box>
    </Paper>
  );
};

export default Welcome;
