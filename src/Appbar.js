import React from "react";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Appbar = (props) => {
  const classes = useStyles();

  let navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Link
            component="button"
            color="textPrimary"
            variant="h6"
            onClick={() => {
              props.setTotalAnswers(0);
              props.setCorrectAnswers(0);
              localStorage.removeItem("playerName");
              navigate("/");
            }}
          >
            EXIT
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
