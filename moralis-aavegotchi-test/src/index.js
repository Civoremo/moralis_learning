/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Home from "./components/home";
import reportWebVitals from "./reportWebVitals";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MoralisProvider } from "react-moralis";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
      <MoralisProvider
        appId='HiPViMfdJFx1ONt8MXXZ2DnWZBltNROQe6VQoblt'
        serverUrl='https://wer5c4varm9b.moralisweb3.com:2053/server'
      >
        <Switch>
          <Route exact={true} path={"/"} component={App} />
          <Route exact={true} path={"/home"} component={Home} />
        </Switch>
      </MoralisProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
