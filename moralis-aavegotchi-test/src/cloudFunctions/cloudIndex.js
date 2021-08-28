/** @format */

Moralis.Cloud.define(
  "getUserNativeBalance",
  async req => {
    const result = getUserNativeBalance(req);

    return result;
  },
  error => error
);

Moralis.Cloud.define("queryUserERC20", async req => {
  const result = await queryUserERC20(req);

  return result;
});

Moralis.Cloud.define("queryUserNfts", async req => {
  const result = await queryUserNfts(req);

  return result;
});

Moralis.Cloud.define(
  "getAllUsers",
  async req => {
    const result = await queryAllUsers(req);

    return JSON.parse(JSON.stringify(result));
  },
  error => {
    error;
  }
);
