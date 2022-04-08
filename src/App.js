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
      light: "#70c4bc",
      main: "#4db6ac",
      dark: "#357f78",
    },
    secondary: {
      light: "#f7b7cc",
      main: "#f6a5c0",
      dark: "#ad8291",
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
        <Grid item xs={12}>
          <Appbar
            setTotalAnswers={setTotalAnswers}
            setCorrectAnswers={setCorrectAnswers}
          />
        </Grid>
        <Grid item xs={12}>
          <Toolbar />
          <Box m={2}>{routes}</Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
