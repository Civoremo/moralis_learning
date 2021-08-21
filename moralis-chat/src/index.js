/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MoralisProvider } from "react-moralis";
import "./index.css";

import App from "./App";
import Home from "./components/home";
import Profile from "./components/profile";

const history = createBrowserHistory();

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
      <MoralisProvider
        appId={process.env.REACT_APP_MORALIS_ID}
        serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
      >
        <Switch>
          <Route exact={true} path={"/"} component={App} />
          <Route exact={true} path={"/dashboard"} component={Home} />
          <Route exact={true} path={"/dashboard/profile"} component={Profile} />
        </Switch>
      </MoralisProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
