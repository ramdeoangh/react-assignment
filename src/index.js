import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import App from "./App";

const store = createStore(reducer, applyMiddleware(thunk));

const rootEl = document.getElementById("root");
const render = (App, el) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    el
  );
};
render(App, rootEl);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
