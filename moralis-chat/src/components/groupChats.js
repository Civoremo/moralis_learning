/** @format */

import React, { useEffect, useState } from "react";
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
          <span className='menu-button'>
            <box-icon
              type='regular'
              name='minus-circle'
              onClick={event => addGroupModal(event)}
            />
          </span>
        ) : (
          <span className='menu-button'>
            <box-icon
              className='menu-button'
              type='regular'
              name='plus-circle'
              onClick={event => addGroupModal(event)}
            />
          </span>
        )}

        <span className='menu-button'>
          <box-icon
            className='menu-button'
            type='regular'
            name='log-out'
            onClick={() => logout()}
          />
        </span>
        <span className='menu-button'>
          <box-icon
            className='menu-button'
            type='regular'
            name='user'
            onClick={event => showProfileModal(event)}
          />
        </span>
      </div>
    </div>
  );
};

export default GroupChats;
