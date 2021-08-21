/** @format */

import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";

const Home = () => {
  let historyRedirect = useHistory();
  const { isAuthenticated, logout, user } = useMoralis();

  useEffect(() => {
    if (!isAuthenticated) {
      historyRedirect.push("/");
    }
  }, [isAuthenticated, historyRedirect]);

  if (!user) {
    return <>Loading ...</>;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Welcome {user.get("username")}</h1>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <hr style={{ width: "100vw" }} />
      <br />
      <br />
    </div>
  );
};

export default Home;
