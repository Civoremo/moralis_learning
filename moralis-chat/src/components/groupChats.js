/** @format */

import React, { useEffect, useState } from "react";

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
              {group.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupChats;
