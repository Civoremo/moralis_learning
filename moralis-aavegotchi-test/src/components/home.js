/** @format */

import React, { useState, useEffect } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";

function Home() {
  const historyRedirect = useHistory();
  const { isAuthenticated, user, logout } = useMoralis();
  const [nftsImages, setnftsImages] = useState(null);

  const tokenQueries = async () => {
    console.log("query");
    if (isAuthenticated) {
      let userInfo = JSON.parse(JSON.stringify(user));
      const params = {
        // userData: userInfo,
        address: user.get("ethAddress"),
      };
      //   const tokenMetadata = await Moralis.Cloud.run(
      //     "getUserNativeBalance",
      //     params
      //   );
      const nfts = await Moralis.Web3API.account.getNFTs({
        chain: "kovan",
      });
      const balancesToken = await Moralis.Web3API.account.getTokenBalances({
        chain: "kovan",
      });
      let balance = await Moralis.Web3API.account.getNativeBalance({
        chain: "kovan",
      });
      //   const balance = await Moralis.Cloud.run("getUserNativeBalance");
      console.log({
        nfts: nfts,
        balance: balance.balance / 10 ** 18,
        balancesToken,
        USER: JSON.parse(JSON.stringify(user)),
      });

      let imageArray = [];
      nfts.result.forEach(async (nft, index) => {
        // console.log("NFT", nft);
        fetch(nft.token_uri)
          .then(async result => {
            // console.log("fetching URI result\n", result);
            return result.json();
          })
          .then(async url => {
            // console.log("before saving nft url", url);
            imageArray.push(url);
            console.log(imageArray);
          })
          .then(async () => {
            console.log(index);
            if (index === nfts.result.length) {
              console.log("finished", imageArray);
              setnftsImages(imageArray);
            }
          });
      });

      //   setTokenIds(tokenIdsResult);
    }
  };

  useEffect(() => {
    console.log("useeffect");
    if (isAuthenticated && user) {
      tokenQueries();
    }
  }, [historyRedirect, isAuthenticated]);

  if (!isAuthenticated) {
    historyRedirect.push("/");
  }

  if (!user) {
    return <>Loading</>;
  }

  return (
    <div className='App'>
      {/* {console.log("tokenIDs", tokenIds)} */}
      <div>Home component</div>
      <button onClick={() => logout()}>Logout</button>
      <hr />
      <br />
      {/* <div>{user.get("ethAddress")}</div> */}
      <button onClick={() => tokenQueries()}>Fetch Token Data</button>
      {console.log("nft array\n", nftsImages)}
      {nftsImages ? (
        <div>
          {nftsImages.map(image => {
            {
              console.log("NFTS", nftsImages.image);
            }
            return (
              <img
                key={image.name}
                style={{ width: "100px", height: "100px" }}
                src={image.image}
                alt='gotchi image'
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Home;
