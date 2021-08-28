import React from "react";
import Home from "./components/Home";

import "./index.css";
import Routes from "./routes";
import store from "./store";
import { Provider } from "react-redux";

function App() {

  return (
        <Provider store={store}>
          <Routes />
        </Provider>
  );
}

export default App;
