/** @format */

import React, { useEffect, useState } from "react";
import { useMoralisSubscription } from "react-moralis";
import { Moralis } from "moralis";

import NewMessage from "./newMessage";

const ChatMessages = ({ groupId }) => {
  // const { user } = useMoralis();
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

  const gatherTokenBalances = async () => {
    const ethBalance = await Moralis.Web3.getERC20({ chain: "eth" });
    const bscBalance = await Moralis.Web3.getERC20({ chain: "bsc" });
    const polyBalance = await Moralis.Web3.getERC20({ chain: "polygon" });
    const userEthNFTs = await Moralis.Web3API.account.getNFTs();

    const result = await Moralis.Cloud.run("test");
    console.log("CLOUD RESULT", result);

    return { ethBalance, bscBalance, polyBalance, nftToken: userEthNFTs };
  };

  const checkUserPrivilege = async (checkResult, chatResult) => {
    // console.log("result came back as USER accepted");
    let checks = {
      ethBalance: false,
      bscBalance: false,
      polyBalance: false,
      nftToken: false,
    };

    // console.log("RESULTS", checkResult);
    for (let item in checkResult) {
      // console.log(checkResult[item], chatResult[0][item]);
      if (chatResult[0][item] === null) {
        // console.log(
        //   "before change when its null",
        //   item,
        //   checks[item],
        //   chatResult[0][item]
        // );
        checks[item] = true;
      } else {
        if (item === "nftToken") {
          // console.log("need to check nft token");
        } else {
          if (chatResult[0][item] >= parseFloat(checkResult[item].balance)) {
            // console.log(
            //   "before change when its equal or greater",
            //   item,
            //   checks[item],
            //   chatResult[0][item]
            // );
            checks[item] = true;
          }
        }
      }
    }
    // console.log("Checked out USER balances", checks);
    let passedCheck = true;
    for (let item in checks) {
      if (!checks[item]) passedCheck = false;
    }

    return passedCheck;
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
      const checkResult = await gatherTokenBalances();
      // console.log("checked return", checkResult, chatResult);

      const privilegeCheck = await checkUserPrivilege(checkResult, chatResult);

      if (privilegeCheck) {
        console.log("RESTRICTED show messages", privilegeCheck);
        const Messages = Moralis.Object.extend("ChatMessages");
        const query = new Moralis.Query(Messages);
        query.equalTo("chatId", groupId);
        const result = await query
          .find()
          .then(result => JSON.stringify(result, null, 2))
          .then(result => JSON.parse(result));
        setMessages(result);
      } else {
        console.log("RESTRICTED show messages", privilegeCheck);
        setMessages(null);
      }
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
