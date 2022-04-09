import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";

import Appbar from "./Appbar";
import Rules from "./Rules";
import Welcome from "./Welcome";
import Start from "./Start";
import Board from "./Board";
import Result from "./Result";

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
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [showExitButton, setShowExitButton] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  const routes = (
    <Routes>
      <Route path="/" element={<Welcome setShowExitButton={setShowExitButton} />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/start" element={<Start setShowBackButton={setShowBackButton} />} />
      <Route
        path="/game/:categoryName"
        element={
          <Board
            setTotalAnswers={setTotalAnswers}
            setCorrectAnswers={setCorrectAnswers}
            setScore={setScore}
          />
        }
      />
      <Route
        path="/result"
        element={
          <Result
            totalAnswers={totalAnswers}
            correctAnswers={correctAnswers}
            score={score}
            setTotalAnswers={setTotalAnswers}
            setCorrectAnswers={setCorrectAnswers}
            setScore={setScore}
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
            setTotalAnswers={setTotalAnswers}
            setCorrectAnswers={setCorrectAnswers}
            setScore={setScore}
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
