/** @format */

import React, { useState, useEffect } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import { Moralis } from "moralis";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";

function Home() {
  const historyRedirect = useHistory();
  const { isAuthenticated, user, logout } = useMoralis();
  const [nftsData, setNftsData] = useState(null);
  const [nftsImageData, setNftsImageData] = useState([]);

  const fetchUserNFTs = async () => {
    console.log("fetching nfts");

    const userNativeBalance = await Moralis.Cloud.run("getUserNativeBalance", {
      address: user.get("ethAddress"),
    });

    // const queryUserERC20 = await Moralis.Cloud.run("queryUserERC20", {
    //   address: user.get("ethAddress"),
    // });

    const queryUserNfts = await Moralis.Cloud.run("queryUserNfts", {
      address: user.get("ethAddress"),
    });

    setNftsData(queryUserNfts.data.result);
    console.log({ userNativeBalance, queryUserNfts });
  };

  const getNFTsMetadata = async () => {
    let nftMetadata = [];
    try {
      for await (let nft of nftsData) {
        // console.log("nft\n", nft.token_uri);
        const response = await fetch(nft.token_uri)
          .then(result => result.json())
          .catch(err => {
            console.log("something went wrong with ", err);
          });

        nftMetadata.push(response);
      }
    } catch (error) {
    } finally {
      setNftsImageData(nftMetadata);
    }
  };

  useEffect(() => {
    console.log("rendering");
    if (isAuthenticated && user) {
      // tokenQueries();
    }

    if (nftsData !== null) {
      getNFTsMetadata();
    }
  }, [historyRedirect, isAuthenticated, nftsData]);

  if (!isAuthenticated) {
    historyRedirect.push("/");
  }

  if (!user) {
    return <>Loading</>;
  }

  return (
    <div className='App'>
      {/* {console.log("tokenIDs", tokenIds)} */}
      {console.log("NFTS", nftsData)}
      {console.log("IMAGES\n", nftsImageData)}
      <div>Home component</div>
      <button onClick={() => logout()}>Logout</button>
      <hr />
      <br />
      {/* <div>{user.get("ethAddress")}</div> */}
      <button onClick={() => fetchUserNFTs()}>Fetch User NFTs</button>

      <br />
      <br />
      {nftsImageData.length > 0 ? (
        <>
          {nftsImageData.map(image => {
            // let imageFile;
            // if (!image.image) {
            //   console.log(image.name);
            //   imageFile = new Blob(image.image_data, {
            //     type: "image/svg+xml;charset=utf=8",
            //   });
            // }
            return (
              <>
                {image.image_data ? (
                  // <img
                  //   key={image.name + image.description + image.external_url}
                  //   style={{ width: "100px", height: "100px" }}
                  //   src={imageFile}
                  //   alt={image.name}
                  // />
                  <svg {...image.image_data} />
                ) : null}
              </>
            );
          })}
        </>
      ) : null}
    </div>
  );
}

export default Home;
