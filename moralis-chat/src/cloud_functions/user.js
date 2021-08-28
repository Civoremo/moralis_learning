/** @format */

async function userInfo(req) {
  const User = Moralis.Object.extend("User");
  const query = new Moralis.Query(User);
  const result = await query.find();
  let stringedUsers = JSON.stringify(result);
  let parsedUsers = JSON.parse(stringedUsers);
  let userNames = {};

  for (let user of parsedUsers) {
    userNames = { ...userNames, [user.objectId]: [user.username] };
  }

  return result;
  //   return JSON.stringify(result);
}

async function userBalances(req) {
  const balances = await Moralis.Web3API.account.getTokenBalances({
    chain: "kovan",
  });

  return balances;
}
