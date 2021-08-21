/** @format */

import React from "react";

const GroupChats = ({ queryData }) => {
  if (!queryData) {
    return <>Waiting for data to load</>;
  }
  let groups = JSON.parse(queryData);

  const changeGroup = e => {
    e.preventDefault();
    console.log("changing room");
  };

  return (
    <div>
      {/* {console.log("group names", JSON.stringify(queryData))} */}
      {console.log(groups)}
      <h4>Group Chats</h4>
      <div>
        {groups.map(group => {
          return (
            <div key={group.name} onClick={event => changeGroup(event)}>
              {group.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupChats;
