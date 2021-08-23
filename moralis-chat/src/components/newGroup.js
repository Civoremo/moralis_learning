/** @format */

import React, { useState } from "react";
import { useNewMoralisObject, useMoralis } from "react-moralis";
// import { Moralis } from "moralis";

const NewGroup = () => {
  const [groupNameInput, setGroupNameInput] = useState("");
  const [restrictCheck, setRestrictCheck] = useState(false);
  const [restrictionsInput, setRestrictionsInput] = useState({
    name: groupNameInput,
    ethBalance: null,
    polyBalance: null,
    bscBalance: null,
    nftToken: "",
  });
  const [restrictionCheckboxes, setRestrictionCheckboxes] = useState({
    eth: false,
    poly: false,
    bsc: false,
    nft: false,
  });
  const groupChat = useNewMoralisObject("GroupChats");
  const chatMessage = useNewMoralisObject("ChatMessages");
  const { user } = useMoralis();

  // const queryGroupChatsForDuplicates = () => {
  //   console.log();
  // };

  const addNewGroup = e => {
    e.preventDefault();
    if (groupNameInput && groupNameInput.length > 2) {
      let params = {};
      let privateBool = null;
      for (let item in restrictionCheckboxes) {
        let name;
        if (item !== "nft") {
          name = item + "Balance";
        } else {
          name = item + "Token";
        }
        if (restrictionCheckboxes[item]) {
          if (name !== "nftToken") {
            params = { ...params, [name]: parseFloat(restrictionsInput[name]) };
            privateBool = true;
          } else {
            params = { ...params, [name]: restrictionsInput[name] };
            privateBool = true;
          }
        } else {
          params = { ...params, [name]: null };
          // console.log("params", params);
        }
      }
      params = { ...params, name: groupNameInput };
      params = { ...params, userCreatedBy: user.get("ethAddress") };
      params = { ...params, private: privateBool };

      groupChat
        .save(params)
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
                setRestrictCheck(false);
                showRestricted();
              },
              error => {
                console.log("failed to save first group message");
              }
            );
        });
    } else {
      console.log("group chat name is too short");
    }
  };

  const showRestricted = () => {
    // e.preventDefault();
    setRestrictionsInput(restrictionsInput => ({
      ...restrictionsInput,
      ethBalance: null,
      polyBalance: null,
      bscBalance: null,
      nftToken: "",
    }));
    setRestrictionCheckboxes(restrictionCheckboxes => ({
      ...restrictionCheckboxes,
      eth: false,
      poly: false,
      bsc: false,
      nft: false,
    }));
  };

  return (
    <div>
      {/* {console.log("restricted info", restrictionsInput)} */}
      {/* {console.log("checkboxes", restrictionCheckboxes)}
      {console.log("restrict check ", restrictCheck)} */}
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
              <div>
                <input
                  type='checkbox'
                  id='eth'
                  name='eth'
                  onChange={event =>
                    setRestrictionCheckboxes(restrictionCheckboxes => ({
                      ...restrictionCheckboxes,
                      eth: !restrictionCheckboxes.eth,
                    }))
                  }
                />
                <input
                  type='number'
                  placeholder='ETH Balanace Min'
                  value={restrictionsInput.ethBalance || ""}
                  onChange={event =>
                    restrictionCheckboxes.eth
                      ? setRestrictionsInput(restrictionsInput => ({
                          ...restrictionsInput,
                          ethBalance: event.target.value,
                        }))
                      : setRestrictionsInput(restrictionsInput => ({
                          ...restrictionsInput,
                          ethBalance: null,
                        }))
                  }
                />
              </div>
              <div>
                <input
                  type='checkbox'
                  id='poly'
                  name='poly_balance'
                  onChange={event =>
                    setRestrictionCheckboxes(restrictionCheckboxes => ({
                      ...restrictionCheckboxes,
                      poly: !restrictionCheckboxes.poly,
                    }))
                  }
                />
                <input
                  type='number'
                  placeholder='Polygon Balance Min'
                  value={restrictionsInput.polyBalance || ""}
                  onChange={event =>
                    restrictionCheckboxes.poly
                      ? setRestrictionsInput(restrictionsInput => ({
                          ...restrictionsInput,
                          polyBalance: event.target.value,
                        }))
                      : null
                  }
                />
              </div>
              <div>
                <input
                  type='checkbox'
                  id='bsc'
                  name='bsc_balance'
                  onChange={event =>
                    setRestrictionCheckboxes(restrictionCheckboxes => ({
                      ...restrictionCheckboxes,
                      bsc: !restrictionCheckboxes.bsc,
                    }))
                  }
                />
                <input
                  type='number'
                  placeholder='BSC Balance Min'
                  value={restrictionsInput.bscBalance || ""}
                  onChange={event =>
                    restrictionCheckboxes.bsc
                      ? setRestrictionsInput(restrictionsInput => ({
                          ...restrictionsInput,
                          bscBalance: event.target.value,
                        }))
                      : null
                  }
                />
              </div>
              <div>
                <input
                  type='checkbox'
                  id='nft'
                  name='nft_token'
                  onChange={event =>
                    setRestrictionCheckboxes(restrictionCheckboxes => ({
                      ...restrictionCheckboxes,
                      nft: !restrictionCheckboxes.nft,
                    }))
                  }
                />
                <input
                  type='text'
                  placeholder='NFT Token Address'
                  value={restrictionsInput.nftToken || ""}
                  onChange={event =>
                    restrictionCheckboxes.nft
                      ? setRestrictionsInput(restrictionsInput => ({
                          ...restrictionsInput,
                          nftToken: event.target.value,
                        }))
                      : null
                  }
                />
              </div>
            </div>
          ) : null}
          <button onClick={event => addNewGroup(event)}>Add Group</button>
          {/* <button onClick={event => showRestricted(event)}>Restrictions</button> */}
          {!restrictCheck ? (
            <>
              <input
                type='checkbox'
                id='restriction'
                name='restrictBox'
                onChange={() => {
                  setRestrictCheck(restrictCheck => !restrictCheck);
                  showRestricted();
                }}
              />
              <label htmlFor='restrictBox'>Restrictions</label>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default NewGroup;
