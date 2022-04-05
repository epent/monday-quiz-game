import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";

import Appbar from "./Appbar";
import Welcome from "./Welcome";
import Start from "./Start";
import Board from "./Board";
import Result from "./Result";

const theme = createTheme({
  palette: {
    primary: {
      light: "#80deea",
      main: "#00bcd4",
      dark: "#00838f",
    },
    secondary: {
      // This is green.A700 as hex.
      light: "#33bfff",
      main: "#00b0ff",
      dark: "#007bb2",
    },
  },
});

function App() {
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const routes = (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/start" element={<Start />} />
      <Route
        path="/game/:categoryName"
        element={
          <Board
            setTotalAnswers={setTotalAnswers}
            setCorrectAnswers={setCorrectAnswers}
          />
        }
      />
      <Route
        path="/result"
        element={
          <Result
            totalAnswers={totalAnswers}
            correctAnswers={correctAnswers}
            setTotalAnswers={setTotalAnswers}
            setCorrectAnswers={setCorrectAnswers}
          />
        }
      />
    </Routes>
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item>
          <Appbar
            setTotalAnswers={setTotalAnswers}
            setCorrectAnswers={setCorrectAnswers}
          />
        </Grid>
        <Grid item>
          <Toolbar />
          <Box m={3}>{routes}</Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
