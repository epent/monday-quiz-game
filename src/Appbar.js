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
              visibility: props.showBack ? "visible" : "hidden",
            }}
          >
            <Link
              color="textPrimary"
              variant="button"
              onClick={() => {
                props.setTotalAnswers(0);
                props.setCorrectAnswers(0);
                // props.setScore(0);
                if (localStorage.getItem("playerName")) {
                  props.setShowBack(false);
                  navigate("/start");
                } else {
                  navigate("/");
                }
              }}
            >
              <ArrowBackIosIcon />
            </Link>
          </Box>

          {props.showExit && (
            <Link
              color="textPrimary"
              variant="button"
              onClick={() => {
                props.setTotalAnswers(0);
                props.setCorrectAnswers(0);
                // props.setScore(0);
                props.setShowExit(false);
                props.setShowBack(false);
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
