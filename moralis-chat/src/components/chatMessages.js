/** @format */

import React, { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";

import NewMessage from "./newMessage";

const ChatMessages = ({ groupId }) => {
  const chatMessages = useMoralisQuery("ChatMessages", query => query, [], {
    live: true,
  });
  const [messages, setMessages] = useState(null);

  //   const { data, error, isLoading } = useMoralisQuery("ChatMessages", query => {
  //     query.get(groupId);
  //   });
  useEffect(() => {
    console.log(JSON.stringify(chatMessages.data, null, 2));
    let msgs = JSON.stringify(chatMessages.data, null, 2);
    let parsedMsgs = JSON.parse(msgs);

    let filteredMsgs = parsedMsgs.filter(message => {
      if (message.chatId === groupId) {
        return message;
      }
    });

    setMessages(filteredMsgs);
  }, [chatMessages.data, groupId]);

  if (!messages) {
    return <>Loading</>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // border: "1px solid red",
        width: "55%",
      }}
    >
      {console.log("chat id", groupId)}
      {console.log("messages", messages)}
      <div style={{ overflowY: "scroll" }}>
        {messages.map(message => {
          return <div key={message.objectId}>{message.message}</div>;
        })}
      </div>
      <NewMessage chatId={groupId} />
    </div>
  );
};

export default ChatMessages;
