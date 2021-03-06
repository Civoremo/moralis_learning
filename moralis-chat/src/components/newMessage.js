/** @format */

import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
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
      userName: user.get("username"),
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
          <a data-tip data-for='sendButton'>
            <span className='menu-button'>
              <box-icon type='regular' name='send' />
            </span>
            <ReactTooltip id='sendButton' delayShow={700}>
              <p>Send</p>
            </ReactTooltip>
          </a>
        </div>
      </form>
    </div>
  );
};

export default NewMessage;
