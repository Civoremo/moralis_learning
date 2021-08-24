/** @format */

import React, { useState } from "react";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import "boxicons";

const NewMessage = ({ chatId }) => {
  const [newMessageInput, setNewMessageInput] = useState("");
  // const saveNewMessage = useNewMoralisObject("ChatMessages");
  const { user } = useMoralis();

  const sendMessage = async e => {
    e.preventDefault();
    // console.log("send message", newMessageInput);
    let params = {
      message: newMessageInput,
      chatId: chatId,
      userId: user.id,
    };

    if (newMessageInput.length > 0) {
      let newMessage = await Moralis.Cloud.run("saveNewMessage", params);
      console.log("NEW MESSAGE", newMessage);
      setNewMessageInput("");
    } else {
      console.log("Type a message before submitting!");
    }
  };

  return (
    <div>
      <hr />
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onSubmit={event => sendMessage(event)}
      >
        <input
          style={{ width: "85%", height: "24px" }}
          type='text'
          placeholder='...'
          value={newMessageInput}
          onChange={event => setNewMessageInput(event.target.value)}
        />
        <div onClick={event => sendMessage(event)}>
          <box-icon type='regular' name='send' />
        </div>
      </form>
    </div>
  );
};

export default NewMessage;
