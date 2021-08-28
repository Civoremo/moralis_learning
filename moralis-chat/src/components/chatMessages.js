/** @format */

import React, { useEffect, useState } from "react";
import {
  useMoralisSubscription,
  // useMoralisQuery,
  useMoralis,
} from "react-moralis";
import { Moralis } from "moralis";

import NewMessage from "./newMessage";

const ChatMessages = ({ groupId }) => {
  const { user } = useMoralis();
  const [messages, setMessages] = useState(null);
  const [createdNew, setCreatedNew] = useState(null);
  const [groupChatData, setGroupChatData] = useState(null);

  useMoralisSubscription("ChatMessages", q => q, [], {
    onCreate: data => setCreatedNew(JSON.stringify(data, null, 2)),
  });

  const queryChat = async () => {
    const result = await Moralis.Cloud.run("queryGroupChat", { groupId });
    // const balances = await Moralis.Cloud.run("userBalances");
    // console.log("BALANCES", balances);
    setGroupChatData(result);
    return result;
  };

  const queryMessages = async () => {
    const chatResult = await queryChat();
    console.log("CHAT RESULT", chatResult);

    // setMessages(null);
    if (!chatResult[0].private) {
      let result = await Moralis.Cloud.run("queryMessages", {
        chatId: groupId,
      });
      console.log("RESULT", result);
      setMessages(result);
    } else {
      console.log("CHAT IS PRIVATE");
      setMessages(null);
    }
  };

  useEffect(() => {
    queryMessages();
  }, [groupId, createdNew]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!groupChatData) {
    return <></>;
  }

  if (groupChatData[0].private && groupChatData && !messages) {
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
        paddingTop: "10px",
        width: "60%",
        marginLeft: "20px",
      }}
    >
      <div
        style={{
          background: "#5F6368",
          color: "#fff",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        {groupChatData[0].name}
      </div>
      <div
        // ref={msgRef}
        style={{
          overflowY: "scroll",
          //   border: "1px solid blue",
          height: "90%",
          maxHeight: "90%",
        }}
      >
        {messages.map(message => {
          return (
            <div key={message.objectId}>
              {message.userName === user.get("username") ? (
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "bolder",
                      textAlign: "right",
                    }}
                  >
                    {/* {userInfoName(message.userId)} */}
                    {message.userName}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "5%",
                        height: "auto",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "20px",
                          marginRight: "5px",
                        }}
                      ></div>
                    </div>
                    <div
                      style={{
                        padding: "5px 5px",
                        marginBottom: "5px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                        fontSize: "12px",
                        background: "#D2D5AB",
                      }}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "bolder",
                    }}
                  >
                    {/* {userInfoName(message.userId)} */}
                    {message.userName}
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "5%",
                        height: "auto",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "5px",
                        }}
                      ></div>
                    </div>
                    <div
                      style={{
                        padding: "5px 5px",
                        marginBottom: "5px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                        fontSize: "12px",
                        background: "#C1C0BC",
                      }}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <NewMessage chatId={groupId} />
    </div>
  );
};

export default ChatMessages;
