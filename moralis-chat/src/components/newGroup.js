/** @format */

import React, { useState } from "react";
import { useNewMoralisObject, useMoralis } from "react-moralis";
import { Moralis } from "moralis";

const NewGroup = () => {
  const [groupNameInput, setGroupNameInput] = useState("");
  const [restrictCheck, setRestrictCheck] = useState(false);
  const [restrictionsInput, setRestrictionsInput] = useState({
    name: groupNameInput,
    restrictions: {
      // private: false,
      ethBalance: 0,
      polyBalance: 0,
      bscBalance: 0,
      nftToken: "ourNFTaddress",
    },
  });
  const groupChat = useNewMoralisObject("GroupChats");
  const chatMessage = useNewMoralisObject("ChatMessages");
  const { user } = useMoralis();

  const addNewGroup = e => {
    e.preventDefault();

    if (groupNameInput && groupNameInput.length > 2) {
      groupChat
        .save({
          name: groupNameInput,
          userCreatedBy: user.get("ethAddress"),
          // private: restrictionsInput.restrictions.private,
          ethBalance: restrictionsInput.restrictions.ethBalance,
          polyBalance: restrictionsInput.restrictions.polyBalance,
          bscBalance: restrictionsInput.restrictions.bscBalance,
          nftToken: restrictionsInput.restrictions.nftToken,
        })
        .then(
          result => {
            return result;
          },
          err => {
            console.log("saved error", err);
          }
        )
        .then(group => {
          chatMessage
            .save({ message: `Welcome to ${groupNameInput}`, chatId: group.id })
            .then(
              result => {
                setGroupNameInput("");
              },
              error => {
                console.log("failed to save first group message");
              }
            );
        });
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={event => addNewGroup(event)}>
          <input
            type='text'
            placeholder='Enter New Group Name'
            value={groupNameInput}
            onChange={event => setGroupNameInput(event.target.value)}
          />
          {restrictCheck ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <div>
                <label>PRIVATE</label>
                <input type='checkbox' />
              </div> */}
              <div>
                <input type='checkbox' />
                <input type='number' placeholder='ETH Balanace Min' />
              </div>
              <div>
                <input type='checkbox' />
                <input type='number' placeholder='Polygon Balance Min' />
              </div>
              <div>
                <input type='checkbox' />
                <input type='number' placeholder='BSC Balance Min' />
              </div>
              <div>
                <input type='checkbox' />
                <input type='text' placeholder='NFT Token Address' />
              </div>
            </div>
          ) : null}
          <button onClick={event => addNewGroup(event)}>Add Group</button>
          <button onClick={event => setRestrictCheck(true)}>
            Restrictions
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewGroup;
