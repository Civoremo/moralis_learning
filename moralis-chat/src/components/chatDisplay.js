/** @format */

import React, { useEffect } from "react";
import { useMoralisQuery } from "react-moralis";

import GroupChats from "./groupChats";

const ChatDisplay = () => {
  const { data, error, isLoading } = useMoralisQuery("GroupChats");

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid grey",
        display: "flex",
      }}
    >
      {/* {console.log("query result", JSON.stringify(data, null, 2))} */}
      {data ? (
        <div
          style={{
            width: "30%",
            borderRight: "1px solid grey",
            margin: "0 20px",
          }}
        >
          <GroupChats queryData={JSON.stringify(data, null, 2)} />
        </div>
      ) : (
        <>Loading</>
      )}

      <div>chat display component</div>
    </div>
  );
};

export default ChatDisplay;
