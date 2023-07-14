import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { BGCustomProvider } from "./context/BGCustomContext";

import "./index.css";
import App from "./App";

function Root() {
  return (
    <Provider store={store}>
      <BGCustomProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BGCustomProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
