/** @format */

import React, { useState } from "react";
import { useNewMoralisObject } from "react-moralis";

const NewGroup = () => {
  const [groupNameInput, setGroupNameInput] = useState("");
  const groupChat = useNewMoralisObject("GroupChats");
  const chatMessage = useNewMoralisObject("ChatMessages");
  //   const { isSaving, error, save } = useNewMoralisObject("GroupChats");

  const addNewGroup = e => {
    e.preventDefault();
    if (groupNameInput) {
      //   const NewGroupChat = Moralis.Object.extend("GroupChat");
      //   const newGroupChat = new NewGroupChat();
      //   newGroupChat.set("name", groupNameInput);
      //   newGroupChat.save().then(result => {
      //     console.log("saved result");
      //   });
      groupChat
        .save({ name: groupNameInput })
        .then(
          result => {
            //   console.log("saved result", result);
            return result;
          },
          err => {
            console.log("saved error", err);
          }
        )
        .then(group => {
          // console.log("saved group", group);
          chatMessage
            .save({ message: `Welcome to ${groupNameInput}`, chatId: group.id })
            .then(
              result => {
                // console.log("groups first message", result);
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
