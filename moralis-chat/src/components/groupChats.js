/** @format */

import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useMoralis } from "react-moralis";
import "boxicons";
import "../App.css";

import NewGroup from "./newGroup";
import Profile from "./profile";
import { hidden } from "chalk";

const GroupChats = ({ queryData, setGroupId }) => {
  const { logout } = useMoralis();
  const [groupChatsData, setGroupChatsData] = useState(null);
  const [groupSelector, setGroupSelector] = useState(false);
  const [profileSelector, setProfileSelector] = useState(false);

  useEffect(() => {
    setGroupChatsData(JSON.parse(queryData));
  }, [queryData]);

  const addGroupModal = e => {
    setGroupSelector(!groupSelector);
    setProfileSelector(false);
  };

  const showProfileModal = e => {
    setProfileSelector(!profileSelector);
    setGroupSelector(false);
  };

  if (!groupChatsData) {
    return <>Waiting for data to load</>;
  }

  // let groups = JSON.parse(queryData);

  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Groups</h4>
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "400px",
          maxHeight: "380px",
          // border: "1px solid red",
          marginLeft: "10px",
          zIndex: "5",
          marginBottom: "20px",
        }}
      >
        {groupChatsData.map((group, index) => {
          // console.log("GROUPCHAT", group);
          return (
            <div
              className='group-chat'
              style={{
                overflowX: "hidden",
                marginLeft: "10px",
                marginBottom: "5px",
                fontSize: "16px",
                fontWeight: "600",
                borderBottom: "1px solid grey",
                width: "100px",
                maxWidth: "100px",
                // color: "grey",
                // textAlign: "center",
              }}
              key={group.name}
              onClick={event => setGroupId(index)}
            >
              <a data-tip data-for={`chat-${group.name}`}>
                <ReactTooltip id={`chat-${group.name}`} delayShow={700}>
                  {group.private ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>Private</p>
                      <p>{group.name}</p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p>Public</p>
                      <p>{group.name}</p>
                    </div>
                  )}
                </ReactTooltip>
                <div
                  style={{
                    marginLeft: "10px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {group.private ? (
                    <box-icon
                      style={{ width: "15px", height: "auto" }}
                      type='regular'
                      name='lock'
                    />
                  ) : null}
                  {group.name}{" "}
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative" }}>
        {/* new chat modal */}
        {groupSelector ? (
          <div
            style={{
              position: "absolute",
              top: "-100px",
              background: "lightgrey",
              width: "150px",
              height: "100px",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
              zIndex: "10",
              overflow: "hidden",
            }}
          >
            <NewGroup />
          </div>
        ) : null}

        {/* user profile modal  */}
        {profileSelector ? (
          <div
            style={{
              position: "absolute",
              top: "-100px",
              background: "lightgrey",
              width: "150px",
              height: "100px",
              borderTopRightRadius: "10px",
              borderTopLeftRadius: "10px",
            }}
          >
            <Profile />
          </div>
        ) : null}
      </div>
      <div
        style={{
          // border: "2px solid blue",
          borderTop: "1px solid grey",
          height: "30px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: "50",
        }}
      >
        {groupSelector ? (
          <a data-tip data-for='closeAddButton'>
            <span className='menu-button'>
              <box-icon
                type='regular'
                name='minus-circle'
                onClick={event => addGroupModal(event)}
              />
            </span>
            <ReactTooltip id='closeAddButton' delayShow={700}>
              <p>Close</p>
            </ReactTooltip>
          </a>
        ) : (
          <a data-tip data-for='openAddButton'>
            <span className='menu-button'>
              <box-icon
                className='menu-button'
                type='regular'
                name='plus-circle'
                onClick={event => addGroupModal(event)}
              />
            </span>
            <ReactTooltip id='openAddButton' delayShow={700}>
              <p>Open</p>
            </ReactTooltip>
          </a>
        )}

        <a data-tip data-for='logoutButton'>
          <span className='menu-button'>
            <box-icon
              className='menu-button'
              type='regular'
              name='log-out'
              onClick={() => logout()}
            />
          </span>
          <ReactTooltip id='logoutButton' delayShow={700}>
            <p>Logout</p>
          </ReactTooltip>
        </a>

        <a data-tip data-for='profileButton'>
          <span className='menu-button'>
            <box-icon
              className='menu-button'
              type='regular'
              name='user'
              onClick={event => showProfileModal(event)}
            />
          </span>
          <ReactTooltip id='profileButton' delayShow={700}>
            <p>Profile</p>
          </ReactTooltip>
        </a>
      </div>
    </div>
  );
};

export default GroupChats;
