import React from "react";
import Home from "./components/Home";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Home />
    </ThemeProvider>
  );
}

export default App;
