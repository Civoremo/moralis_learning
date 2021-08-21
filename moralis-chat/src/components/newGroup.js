/** @format */

import React, { useState } from "react";
import { useNewMoralisObject } from "react-moralis";

const NewGroup = () => {
  const [groupNameInput, setGroupNameInput] = useState("");
  const { isSaving, error, save } = useNewMoralisObject("GroupChats");

  const addNewGroup = e => {
    e.preventDefault();
    if (groupNameInput) {
      //   const NewGroupChat = Moralis.Object.extend("GroupChat");
      //   const newGroupChat = new NewGroupChat();
      //   newGroupChat.set("name", groupNameInput);
      //   newGroupChat.save().then(result => {
      //     console.log("saved result");
      //   });
      save({ name: groupNameInput }).then(
        result => {
          console.log("saved result", result);
        },
        err => {
          console.log("saved error", err);
        }
      );
    }
  };

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Enter New Group Name'
          value={groupNameInput}
          onChange={event => setGroupNameInput(event.target.value)}
        />
        <button onClick={event => addNewGroup(event)}>Add Group</button>
      </div>
    </div>
  );
};

export default NewGroup;
