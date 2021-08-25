/** @format */

async function queryMessages(req) {
  const ChatMessages = Moralis.Object.extend("ChatMessages");
  const query = new Moralis.Query(ChatMessages);
  query.contains("chatId", req.params.chatId);
  query.descending("createdAt");
  const result = await query.find();

  return JSON.stringify(result);
}

async function saveMessage(req) {
  const ChatMessages = Moralis.Object.extend("ChatMessages");
  const saveMessage = new ChatMessages();

  saveMessage.set("message", req.params.message);
  saveMessage.set("chatId", req.params.chatId);
  saveMessage.set("userName", req.params.userName);

  let saved = await saveMessage.save().then(
    savedMessage => {
      return savedMessage;
    },
    error => {
      return { error };
    }
  );

  return JSON.stringify(saved);
}
