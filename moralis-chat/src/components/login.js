/** @format */

import React, { useEffect } from "react";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";
import moralisBadge from "../assets/Powered-by-Moralis-Badge-Green.svg";
import "boxicons";

const Login = () => {
  let historyRedirect = useHistory();
  const { authenticate, isAuthenticated } = useMoralis();

  const doAuthentication = async () => {
    authenticate();
  };

  useEffect(() => {
    console.log(isAuthenticated);
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
        // border: "1px solid red",
      }}
    >
      <a
        href='https://github.com/Civoremo/moralis_learning/tree/main/moralis-chat'
        target='_blank'
        rel='noopener noreferrer'
      >
        <box-icon type='logo' name='github'></box-icon>
      </a>
      <h1>Moralis Chat: Weekly Challenge</h1>
      <a href='https://moralis.io/' target='_blank' rel='noopener noreferrer'>
        <img src={moralisBadge} alt='Moralis.io badge' />
      </a>
      <h3>Authenticate to start chatting!</h3>
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
