/** @format */

import React, { useEffect, useState } from "react";
import { useMoralisSubscription } from "react-moralis";
import { Moralis } from "moralis";

import NewMessage from "./newMessage";

const ChatMessages = ({ groupId }) => {
  const [messages, setMessages] = useState(null);
  const [createdNew, setCreatedNew] = useState(null);
  const [groupChatData, setGroupChatData] = useState(null);

  useMoralisSubscription(
    "ChatMessages",
    q => q.equalTo("chatId", groupId),
    [],
    {
      onCreate: data => {
        setCreatedNew(JSON.stringify(data, null, 2));
      },
    }
  );

  const queryChat = async () => {
    const Chat = Moralis.Object.extend("GroupChats");
    const query = new Moralis.Query(Chat);
    query.equalTo("objectId", groupId);
    const result = await query
      .find()
      .then(result => JSON.stringify(result, null, 2))
      .then(result => JSON.parse(result));
    setGroupChatData(result);
    return result;
  };

  const queryMessages = async () => {
    const chatResult = await queryChat();
    // console.log("CHAT RESULT", chatResult);

    if (!chatResult[0].private) {
      const Messages = Moralis.Object.extend("ChatMessages");
      const query = new Moralis.Query(Messages);
      query.equalTo("chatId", groupId);
      const result = await query
        .find()
        .then(result => JSON.stringify(result, null, 2))
        .then(result => JSON.parse(result));
      setMessages(result);
    } else {
      console.log("CHAT IS PRIVATE");
      setMessages(null);
    }
  };

  useEffect(() => {
    console.log(groupId);
    queryMessages();
  }, [groupId, createdNew]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!groupChatData) {
    return <></>;
  }

  if (groupChatData[0].private && groupChatData) {
    return (
      <div
        style={{
          width: "55%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bolder",
          fontSize: "20px",
        }}
      >
        <div>Restricted Chat</div>
      </div>
    );
  }

  if (!messages) {
    return <></>;
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
      <div
        style={{
          overflowY: "scroll",
          //   border: "1px solid blue",
          height: "90%",
          maxHeight: "90%",
        }}
      >
        {messages.map(message => {
          return (
            <div
              key={message.objectId}
              style={{
                padding: "5px 5px",
                marginBottom: "5px",
                border: "1px solid grey",
                borderRadius: "5px",
                fontSize: "12px",
              }}
            >
              {message.message}
            </div>
          );
        })}
      </div>
      <NewMessage chatId={groupId} />
    </div>
  );
};

export default ChatMessages;
