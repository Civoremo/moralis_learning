/** @format */

async function getUserNativeBalance(req) {
  //   const userNativeBalance = await Moralis.Web3API.account.getNativeBalance({
  //     chain: "kovan",
  //     address: user.get("ethAddress"),
  //   });
  const balance = await Moralis.Web3API.account.getNativeBalance();

  return balance;
}
