/** @format */

Moralis.Cloud.define("helloWorld", async req => {
  let x = await newGroup();
  return "Hello World from the Moralis Cloud " + x;
});

Moralis.Cloud.define("addNewGroupChat", async req => {
  let result = await newGroup(req);

  return result;
});

// Moralis.Cloud.define("userBalances", async req => {
//     let userAccountBalances = await Moralis.Web3API.account.
// });
