/** @format */

import React, { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import moralisWhiteBadge from "../assets/Powered-by-Moralis-Badge-Glass.svg";

import GroupChats from "./groupChats";
import ChatMessages from "./chatMessages";

const ChatDisplay = () => {
  const groupChatsQuery = useMoralisQuery("GroupChats", query => query, [], {
    live: true,
  });
  const [groupChatId, setGroupChatId] = useState(null);

  useEffect(() => {
    // console.log("new group chat was created");
  }, [groupChatsQuery.data]);

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid grey",
        display: "flex",
        background: "#fff",
      }}
    >
      {/* {console.log("GROUP ID", groupChatsQuery)} */}
      {groupChatsQuery.data ? (
        <div
          style={{
            width: "30%",
            borderRight: "1px solid grey",
            // margin: "0 20px",
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
        <>
          <div
            style={{
              width: "65%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            <div>Welcome to Web3 Chat</div>
            <a href='' alt='moralis.io brand badge'>
              <img
                src={moralisWhiteBadge}
                target='_blank'
                rel='noopener noreferrer'
              />
            </a>
            {/* <div style={{ fontSize: "12px" }}>built using</div> */}
            {/* <div>Moralis.io</div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatDisplay;
