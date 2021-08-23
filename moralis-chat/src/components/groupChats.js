/** @format */

import React, { useEffect, useState } from "react";
import "boxicons";

const GroupChats = ({ queryData, setGroupId }) => {
  const [groupChatsData, setGroupChatsData] = useState(null);

  useEffect(() => {
    setGroupChatsData(JSON.parse(queryData));
  }, [queryData]);

  if (!groupChatsData) {
    return <>Waiting for data to load</>;
  }
  // let groups = JSON.parse(queryData);

  return (
    <div>
      <h4>Group Chats</h4>
      <div>
        {groupChatsData.map((group, index) => {
          console.log("GROUPCHAT", group);
          return (
            <div key={group.name} onClick={event => setGroupId(index)}>
              {console.log(group)}
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
    </div>
  );
};

export default GroupChats;
