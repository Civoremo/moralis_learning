/** @format */

import React, { useState } from "react";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
// import { Moralis } from "moralis";

const NewGroup = () => {
  const [groupNameInput, setGroupNameInput] = useState("");
  const [restrictCheck, setRestrictCheck] = useState(false);
  const [restrictionsInput, setRestrictionsInput] = useState({
    name: groupNameInput,
    token: "",
  });
  const [restrictionCheckboxes, setRestrictionCheckboxes] = useState({
    token: false,
  });
  const { user } = useMoralis();

  const addNewGroup = async e => {
    e.preventDefault();

    let params = {
      name: groupNameInput,
      token: restrictionsInput.token,
      userName: user.get("username"),
    };

    if (restrictionCheckboxes.token) {
      params = { ...params, private: true };
    } else {
      params = { ...params, private: false };
    }

    if (groupNameInput.length > 3) {
      const saveNewGroupChat = await Moralis.Cloud.run(
        "addNewGroupChat",
        params
      );
      console.log("NEW GROUP", saveNewGroupChat);
    } else {
      console.log("Chat Name is too short!");
    }
  };

  const showRestricted = () => {
    // e.preventDefault();
    setRestrictionsInput(restrictionsInput => ({
      ...restrictionsInput,
      token: "",
    }));
    setRestrictionCheckboxes(restrictionCheckboxes => ({
      ...restrictionCheckboxes,
      token: false,
    }));
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
          value={restrictionsInput.token || ""}
          onChange={event =>
            restrictionCheckboxes.token
              ? setRestrictionsInput(restrictionsInput => ({
                  ...restrictionsInput,
                  token: event.target.value,
                }))
              : null
          }
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
