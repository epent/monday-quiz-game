import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Grid, Box, Toolbar } from "@material-ui/core";

import Appbar from "./Appbar/Appbar";
import Rules from "./BeforeGame/Rules";
import Welcome from "./BeforeGame/Welcome";
import Start from "./BeforeGame/Start";
import Board from "./Game/Board";
import Result from "./Result/Result";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4db6ac",
    },
    secondary: {
      main: "#f6a5c0",
    },
  },
});

function App() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showExitButton, setShowExitButton] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  const routes = (
    <Routes>
      <Route
        path="/"
        element={<Welcome setShowExitButton={setShowExitButton} />}
      />
      <Route path="/rules" element={<Rules />} />
      <Route
        path="/start"
        element={<Start setShowBackButton={setShowBackButton} />}
      />
      <Route
        path="/game/:categoryName"
        element={
          <Board
            setCorrectAnswers={setCorrectAnswers}
            setScore={setScore}
            setTotalScore={setTotalScore}
            setShowBackButton={setShowBackButton}
          />
        }
      />
      <Route
        path="/result"
        element={
          <Result
            correctAnswers={correctAnswers}
            score={score}
            totalScore={totalScore}
            setCorrectAnswers={setCorrectAnswers}
            setScore={setScore}
            setTotalScore={setTotalScore}
            setShowBackButton={setShowBackButton}
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
            setCorrectAnswers={setCorrectAnswers}
            setScore={setScore}
            setTotalScore={setTotalScore}
            setShowExitButton={setShowExitButton}
            showExitButton={showExitButton}
            setShowBackButton={setShowBackButton}
            showBackButton={showBackButton}
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
