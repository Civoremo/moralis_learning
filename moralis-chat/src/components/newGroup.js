/** @format */

import React, { useState } from "react";
import { useNewMoralisObject } from "react-moralis";

const NewGroup = () => {
  const [groupNameInput, setGroupNameInput] = useState("");
  const groupChat = useNewMoralisObject("GroupChats");
  const chatMessage = useNewMoralisObject("ChatMessages");

  const addNewGroup = e => {
    e.preventDefault();
    if (groupNameInput) {
      //   });
      groupChat
        .save({ name: groupNameInput })
        .then(
          result => {
            return result;
          },
          err => {
            console.log("saved error", err);
          }
        )
        .then(group => {
          chatMessage
            .save({ message: `Welcome to ${groupNameInput}`, chatId: group.id })
            .then(
              result => {
                setGroupNameInput("");
              },
              error => {
                console.log("failed to save first group message");
              }
            );
        });
    }
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
          <button onClick={event => addNewGroup(event)}>Add Group</button>
        </form>
      </div>
    </div>
  );
};

export default NewGroup;
