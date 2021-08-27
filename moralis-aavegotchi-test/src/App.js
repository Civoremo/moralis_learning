/** @format */

import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useHistory } from "react-router-dom";
import { useMoralis } from "react-moralis";

const App = () => {
  const { authenticate, isAuthenticated } = useMoralis();
  const historyRedirect = useHistory();
  const authenticateUser = async () => {
    authenticate();
  };

  useEffect(() => {
    console.log("auth checking");
    if (isAuthenticated) {
      historyRedirect.push("/home");
    }
  }, [isAuthenticated, historyRedirect]);

  return (
    <div className='App'>
      <h2>Login with Metamask Wallet</h2>
      <button onClick={() => authenticateUser()}>Authenticate</button>
    </div>
  );
};

export default App;
