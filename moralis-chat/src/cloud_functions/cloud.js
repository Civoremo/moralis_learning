/** @format */

Moralis.Cloud.define("helloWorld", async req => {
  let x = await newGroup();
  return "Hello World from the Moralis Cloud " + x;
});

Moralis.Cloud.define("addNewGroupChat", async req => {
  let result = await newGroup(req);

  return result;
});

Moralis.Cloud.define("queryMessages", async req => {
  let result = await queryMessages(req);

  return result;
});

Moralis.Cloud.define("saveNewMessage", async req => {
  let result = await saveMessage(req);

  return result;
});
