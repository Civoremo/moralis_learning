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
    setGroupChatData(result);
    return result;
  };

  const gatherTokenBalances = async () => {
    const ethBalance = await Moralis.Web3.getERC20({ chain: "eth" });
    const bscBalance = await Moralis.Web3.getERC20({ chain: "bsc" });
    const polyBalance = await Moralis.Web3.getERC20({ chain: "polygon" });
    const userEthNFTs = await Moralis.Web3API.account.getNFTs();

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
    console.log("CHAT RESULT", chatResult);
    setMessages(null);
    if (!chatResult[0].private) {
      let result = await Moralis.Cloud.run("queryMessages", {
        chatId: groupId,
      });
      setMessages(result);
    } else {
      console.log("CHAT IS PRIVATE");
      setMessages(null);
      // const checkResult = await gatherTokenBalances();

      // const privilegeCheck = await checkUserPrivilege(checkResult, chatResult);

      // if (privilegeCheck) {
      //   console.log("RESTRICTED show messages", privilegeCheck);
      //   const Messages = Moralis.Object.extend("ChatMessages");
      //   const query = new Moralis.Query(Messages);
      //   query.equalTo("chatId", groupId);
      //   const result = await query
      //     .find()
      //     .then(result => JSON.stringify(result, null, 2))
      //     .then(result => JSON.parse(result));
      //   setMessages(result);
      // } else {
      //   console.log("RESTRICTED show messages", privilegeCheck);
      //   // setMessages(null);
      // }
    }
  };

  useEffect(() => {
    queryMessages();
    // setMessages()
    // console.log("refreshed", messagesQuery.data);
    return () => {
      console.log("should close live query");
      // Moralis.LiveQuery.close();
    };
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
        width: "60%",
      }}
    >
      <div
        // ref={msgRef}
        style={{
          overflowY: "scroll",
          //   border: "1px solid blue",
          height: "90%",
          maxHeight: "90%",
          scrollSnapType: "mandatory",
        }}
      >
        {messages.map(message => {
          return (
            <div key={message.objectId}>
              {message.userId === user.id ? (
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "bolder" }}>
                    {user.get("username")}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "10%",
                        height: "auto",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid grey",
                          borderRadius: "20px",
                          marginRight: "10px",
                          background: "grey",
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
                        background: "lightgreen",
                      }}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "bolder" }}>
                    {user.get("username")}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "10%",
                        height: "auto",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "1px solid grey",
                          borderRadius: "20px",
                          marginRight: "10px",
                          background: "grey",
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
                        background: "lightblue",
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
