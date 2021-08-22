/** @format */

import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useHistory, Link } from "react-router-dom";
import "boxicons";

import NewGroup from "./newGroup";
import ChatDisplay from "./chatDisplay";

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
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <h1>Welcome {user.get("username")}</h1>
        <div
          style={{
            marginLeft: "20px",
            border: "1px solid #222",
            borderRadius: "5px",
          }}
        >
          <Link to='/dashboard/profile'>
            <box-icon type='regular' name='edit-alt'></box-icon>
          </Link>
        </div>
      </div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <hr style={{ width: "100vw" }} />
      <br />
      <br />
      <h3>Create New Group</h3>
      <NewGroup />
      <hr style={{ width: "100vw" }} />
      <br />
      <ChatDisplay />
    </div>
  );
};

export default Home;
