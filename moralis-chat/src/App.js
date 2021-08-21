/** @format */

import logo from "./logo.svg";
import "./App.css";
import { useMoralis } from "react-moralis";

function App() {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();

  if (!isAuthenticated) {
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
          onClick={() => authenticate()}
        >
          Authenticate
        </button>
      </div>
    );
  }

  return (
    <div className='App'>
      <h1>Welcome {user.get("username")}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default App;
