import React from "react";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";

import Appbar from "./Appbar";
import Board from "./Board";

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
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item>
          <Appbar />
        </Grid>
        <Grid item>
          <Toolbar />
          <Box m={3}>
            <Board />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
