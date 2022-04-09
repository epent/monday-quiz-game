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
  },
  flexbox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("xs")]: {
      height: "300px",
    },
  },
  typography: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: "25px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "30px",
    },
  },
}));

const Welcome = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const updateNameHandler = (event) => {
    setName(event.target.value);
  };

  const submitNameHandler = (event) => {
    event.preventDefault();

    if (name.length > 0) {
      localStorage.setItem("playerName", name);
      props.setShowExitButton(true);
      navigate("/rules");
    }
  };

  const form = (
    <form onSubmit={submitNameHandler}>
      <Box
        p={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
      >
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
            color="secondary"
            className={classes.button}
            disabled={name.length === 0 ? true : false}
            onClick={submitNameHandler}
          >
            submit
          </Button>
        </Box>
      </Box>
    </form>
  );

  return (
    <Paper elevation={3} className={classes.paper}>
      <Box className={classes.flexbox}>
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
