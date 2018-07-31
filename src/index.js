import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./Common/store";
import App from "./App";
import "./Resources/SASS/main.scss";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
