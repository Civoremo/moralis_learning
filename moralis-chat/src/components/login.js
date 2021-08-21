/** @format */

import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";

const Login = () => {
  let historyRedirect = useHistory();
  const { authenticate, isAuthenticated } = useMoralis();

  const doAuthentication = () => {
    authenticate();
  };

  useEffect(() => {
    if (isAuthenticated) {
      historyRedirect.push("/dashboard");
    }
  }, [isAuthenticated, historyRedirect]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        border: "1px solid red",
      }}
    >
      <h1>Welcome to Moralis Chat: Weekly Challenge</h1>
      <h3>Login to start chatting!</h3>
      <button
        style={{ width: "100px", height: "50px" }}
        onClick={() => doAuthentication()}
      >
        Authenticate
      </button>
    </div>
  );
};

export default Login;
