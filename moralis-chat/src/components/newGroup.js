/** @format */

import React, { useState } from "react";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
// import { Moralis } from "moralis";

const NewGroup = () => {
  const [groupNameInput, setGroupNameInput] = useState("");
  const [tokenRestrictionInput, setTokenRestrictionInput] = useState("");
  const { user } = useMoralis();

  const addNewGroup = async e => {
    e.preventDefault();

    let params = {
      name: groupNameInput,
      token: tokenRestrictionInput,
      userName: user.get("username"),
    };

    if (tokenRestrictionInput.length > 0) {
      params = { ...params, private: true };
    } else {
      params = { ...params, private: false };
    }

    if (groupNameInput.length > 3) {
      const saveNewGroupChat = await Moralis.Cloud.run(
        "addNewGroupChat",
        params
      );
    } else {
      console.log("Chat Name is too short!");
    }
  };

  return (
    <div>
      <form
        onSubmit={event => addNewGroup(event)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100px",
        }}
      >
        <input
          style={{ width: "120px", maxWidth: "120px" }}
          type='text'
          placeholder='Chat Name'
          value={groupNameInput}
          onChange={event => setGroupNameInput(event.target.value)}
        />
        <input
          style={{ width: "120px", maxWidth: "120px" }}
          type='text'
          placeholder='Token Restriction'
          value={tokenRestrictionInput || ""}
          onChange={event => setTokenRestrictionInput(event.target.value)}
        />
        <button
          style={{ marginTop: "5px" }}
          onClick={event => addNewGroup(event)}
        >
          Add Group
        </button>
      </form>
    </div>
  );
};

export default NewGroup;
