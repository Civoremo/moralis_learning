/** @format */

import React, { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";

import GroupChats from "./groupChats";
import ChatMessages from "./chatMessages";

const ChatDisplay = () => {
  const groupChatsQuery = useMoralisQuery("GroupChats", query => query, [], {
    live: true,
  });
  const [groupChatId, setGroupChatId] = useState(null);
  const [receivedNewMessage, setReceivedNewMessage] = useState(null);

  useEffect(() => {
    console.log("new group chat was created");
  }, [groupChatsQuery.data]);

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid grey",
        display: "flex",
      }}
    >
      {groupChatsQuery.data ? (
        <div
          style={{
            width: "30%",
            borderRight: "1px solid grey",
            margin: "0 20px",
          }}
        >
          <GroupChats
            queryData={JSON.stringify(groupChatsQuery.data, null, 2)}
            setGroupId={setGroupChatId}
          />
        </div>
      ) : (
        <>Loading</>
      )}

      {groupChatId !== null ? (
        <ChatMessages groupId={groupChatsQuery.data[groupChatId].id} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatDisplay;
