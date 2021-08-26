/** @format */

import React, { useEffect, useState } from "react";
import Moralis from "moralis";
import { useMoralisQuery } from "react-moralis";
import moralisWhiteBadge from "../assets/Powered-by-Moralis-Badge-Glass.svg";

import GroupChats from "./groupChats";
import ChatMessages from "./chatMessages";

const ChatDisplay = () => {
  const groupChatsQuery = useMoralisQuery("GroupChats", query => query, [], {
    live: true,
  });
  const [groupChatId, setGroupChatId] = useState(null);
  const [nativeBalance, setNativeBalance] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [nftBalance, setNftBalance] = useState(null);

  const userNativeBalance = async () => {
    const userNativeBalance = await Moralis.Web3API.account.getNativeBalance();
    const userTokenBalance = await Moralis.Web3API.account.getTokenBalances();
    const userEthNFTs = await Moralis.Web3API.account.getNFTs();
    setNativeBalance(userNativeBalance);
    setTokenBalance(userTokenBalance);
    setNftBalance(userEthNFTs);
  };

  useEffect(() => {
    // console.log("new group chat was created");
    // userNativeBalance();
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
          {/* {console.log(
            "native balance",
            nativeBalance,
            tokenBalance,
            nftBalance
          )} */}
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
