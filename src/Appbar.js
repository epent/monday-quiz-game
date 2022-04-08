import React from "react";
import { useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Link, Grid } from "@material-ui/core";

const Appbar = (props) => {
  let navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            color="textPrimary"
            variant="button"
            onClick={() => {
              props.setTotalAnswers(0);
              props.setCorrectAnswers(0);
              if (localStorage.getItem("playerName")) {
                navigate("/start");
              } else {
                navigate("/");
              }
            }}
          >
            EXIT GAME
          </Link>
          <Link
            color="textPrimary"
            variant="button"
            onClick={() => {
              props.setTotalAnswers(0);
              props.setCorrectAnswers(0);
              localStorage.removeItem("playerName");
              navigate("/");
            }}
          >
            LOG OUT
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
