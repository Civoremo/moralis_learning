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
      <div>
        <form onSubmit={event => addNewGroup(event)}>
          <input
            type='text'
            placeholder='Enter New Group Name'
            value={groupNameInput}
            onChange={event => setGroupNameInput(event.target.value)}
          />
          {restrictCheck ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <input
                  type='checkbox'
                  id='token'
                  name='token'
                  onChange={event =>
                    setRestrictionCheckboxes(restrictionCheckboxes => ({
                      ...restrictionCheckboxes,
                      token: !restrictionCheckboxes.nft,
                    }))
                  }
                />
                <input
                  type='text'
                  placeholder='Token Address'
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
              </div>
            </div>
          ) : null}
          <button onClick={event => addNewGroup(event)}>Add Group</button>
          {!restrictCheck ? (
            <>
              <input
                type='checkbox'
                id='restriction'
                name='restrictBox'
                onChange={() => {
                  setRestrictCheck(restrictCheck => !restrictCheck);
                  showRestricted();
                }}
              />
              <label htmlFor='restrictBox'>Restrictions</label>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default NewGroup;
