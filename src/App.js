import React, { useState } from "react";

import "./index.css";
import Routes from "./routes";
import store from "./store";
import { Provider } from "react-redux";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function App() {
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? "dark" : "light"
        }
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Routes />
        </Provider>
    </ThemeProvider>
  );
}

export default App;
