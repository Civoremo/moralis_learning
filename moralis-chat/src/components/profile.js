/** @format */

import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";

const Profile = () => {
  const { setUserData, user } = useMoralis();
  const [userNameInput, setUserNameInput] = useState("");

  const checkForDuplicate = async e => {
    e.preventDefault();
    if (userNameInput.length >= 3) {
      const Users = Moralis.Object.extend("User");
      const query = new Moralis.Query(Users);
      query.contains("username", userNameInput);
      const result = await query
        .find()
        .then(result => {
          return JSON.stringify(result, null, 2);
        })
        .then(result => {
          return JSON.parse(result);
        });
      console.log("users result", result);

      if (result.length === 0) {
        updateUserData(result);
        setUserNameInput("");
      }
    } else {
      console.log("username is to short");
    }
  };

  const updateUserData = result => {
    console.log("update name to ", result);
    setUserData({
      username: userNameInput,
    });
  };

  if (!user) {
    return <>Loading</>;
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          margin: "10px 0",
          padding: "0 10px",
          fontWeight: "bolder",
          // maxWidth: "100px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          // border: "1px solid red",
        }}
      >
        {console.log(typeof user.get("username"))}
        {user.get("username")}
      </div>

      <form
        onSubmit={event => checkForDuplicate(event)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <input
          style={{ width: "120px", maxWidth: "120px" }}
          type='text'
          placeholder='Username'
          value={userNameInput}
          onChange={event => setUserNameInput(event.target.value)}
        />
        <button
          style={{ marginTop: "5px" }}
          onClick={event => checkForDuplicate(event)}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
