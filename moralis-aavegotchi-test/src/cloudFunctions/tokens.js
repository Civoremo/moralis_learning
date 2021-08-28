/** @format */
const logger = Moralis.Cloud.getLogger();

const httpRequestTemplate = urlString => {
  return {
    url: `https://deep-index.moralis.io/api/v2/${urlString}`,
    params: { chain: "kovan" },
    headers: {
      accept: "application/json;charset=utf-8",
      "X-API-KEY":
        "vW2MfdlEvct0J7KeaDVFtWD2lJl5WNsiqpeY1d7Rxlmm5KPkqe7GeEsqbOLmCqxh",
    },
  };
};

async function getUserNativeBalance(req) {
  try {
    const result = await Moralis.Cloud.httpRequest(
      httpRequestTemplate(`${req.params.address}/balance`),
      { useMasterKey: true }
    );
    return result.data;
  } catch (error) {
    logger.info("address native balance error\n", error);
  }
}

async function queryUserERC20(req) {
  try {
    Moralis.Cloud.httpRequest(
      httpRequestTemplate(`${req.params.address}/erc20`)
    ),
      then(result => {
        return result;
      }).catch(err => {
        return { err };
      });

    // return result;
  } catch (error) {
    logger.info({ error });
  }
}

async function queryUserNfts(req) {
  try {
    const result = await Moralis.Cloud.httpRequest(
      httpRequestTemplate(`${req.params.address}/nft`)
    );

    return result;
  } catch (error) {
    logger.info({ error });
  }
}

async function queryAllUsers(req) {
  const Users = Moralis.Object.extend("User");
  const query = new Moralis.Query(Users);
  const result = await query.find({ useMasterKey: true });

  logger.info("USERS", result);

  return result;
}
