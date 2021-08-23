/** @format */

import React, { useState } from "react";
import { useNewMoralisObject } from "react-moralis";
import "boxicons";

const NewMessage = ({ chatId }) => {
  const [newMessageInput, setNewMessageInput] = useState("");
  const saveNewMessage = useNewMoralisObject("ChatMessages");

  const sendMessage = e => {
    e.preventDefault();
    // console.log("send message", newMessageInput);
    saveNewMessage.save({ message: newMessageInput, chatId: chatId });
    setNewMessageInput("");
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
