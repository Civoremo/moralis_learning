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
  const [nftBlobs, setNftBlobs] = useState(null);

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
      console.log("meta data ", nftMetadata);
      let svgArray = [];
      for await (let nft of nftMetadata) {
        if (nft.image) {
          // console.log("image\n", nft.image);
        } else {
          let blob = await new Blob([nft.image_data], {
            type: "image/svg+xml;charset=utf=8",
          });
          let url = await URL.createObjectURL(blob);
          svgArray.push(url);
        }
      }
      console.log("COMPLETE SVG", svgArray);
      setNftBlobs(svgArray);
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
      {/* {console.log("NFTS", nftsData)} */}
      {/* {console.log("IMAGES\n", nftsImageData)} */}
      <div>Home component</div>
      <button onClick={() => logout()}>Logout</button>
      <hr />
      <br />
      <button onClick={() => fetchUserNFTs()}>Fetch User NFTs</button>

      <br />
      <br />
      {nftsImageData.length > 0 ? (
        <>
          {nftsImageData.map(image => {
            return (
              <>
                {image.image ? (
                  <>
                    {console.log("image src")}
                    <img
                      style={{ width: "200px", height: "auto" }}
                      src={image.image}
                      alt={image.external_url}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          })}
          {nftBlobs.map(nft => {
            return (
              <>
                <img
                  style={{ width: "200px", height: "auto" }}
                  src={nft}
                  alt='nft blob'
                />
                ;
              </>
            );
          })}
        </>
      ) : null}
    </div>
  );
}

export default Home;
