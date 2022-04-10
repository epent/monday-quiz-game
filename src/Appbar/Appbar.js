import React from "react";
import { useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Link, Grid, Box } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
          <Box
            sx={{
              visibility: props.showBackButton ? "visible" : "hidden",
            }}
          >
            <Link
              color="textPrimary"
              variant="button"
              onClick={() => {
                props.setCorrectAnswers(0);
                props.setScore(0);
                props.setTotalScore(0);
                if (localStorage.getItem("playerName")) {
                  props.setShowBackButton(false);
                  navigate("/start");
                } else {
                  navigate("/");
                }
              }}
            >
              <ArrowBackIosIcon />
            </Link>
          </Box>

          {props.showExitButton && (
            <Link
              color="textPrimary"
              variant="button"
              onClick={() => {
                props.setCorrectAnswers(0);
                props.setScore(0);
                props.setTotalScore(0);
                props.setShowExitButton(false);
                props.setShowBackButton(false);
                localStorage.removeItem("playerName");
                navigate("/");
              }}
            >
              EXIT
            </Link>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
