/** @format */

import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import "boxicons";

import NewGroup from "./newGroup";
import Profile from "./profile";

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
          height: "400px",
          maxHeight: "90%",
          border: "1px solid red",
          marginLeft: "10px",
          zIndex: "5",
        }}
      >
        {groupChatsData.map((group, index) => {
          // console.log("GROUPCHAT", group);
          return (
            <div key={group.name} onClick={event => setGroupId(index)}>
              {group.name}{" "}
              {group.private ? (
                <box-icon
                  style={{ width: "15px", height: "auto" }}
                  type='regular'
                  name='lock'
                />
              ) : null}
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
              background: "grey",
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
              background: "grey",
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
          border: "2px solid blue",
          height: "30px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: "50",
        }}
      >
        {groupSelector ? (
          <box-icon
            type='regular'
            name='minus-circle'
            onClick={event => addGroupModal(event)}
          />
        ) : (
          <box-icon
            type='regular'
            name='plus-circle'
            onClick={event => addGroupModal(event)}
          />
        )}

        <box-icon type='regular' name='log-out' onClick={() => logout()} />
        <box-icon
          type='regular'
          name='user'
          onClick={event => showProfileModal(event)}
        />
      </div>
    </div>
  );
};

export default GroupChats;
