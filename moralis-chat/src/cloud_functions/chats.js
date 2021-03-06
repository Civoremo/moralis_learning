/** @format */

async function newGroup(req) {
  //   console.log("some data for new group");
  // return "NEW GROUP HELPER";
  let GroupChats = Moralis.Object.extend("GroupChats");
  let query = new Moralis.Query(GroupChats);
  query.contains("name", req.params.name);
  const result = await query.find();

  // return JSON.stringify(result);

  if (result.length <= 0) {
    let saveNewChat = new GroupChats();

    saveNewChat.set("name", req.params.name);
    saveNewChat.set("private", req.params.private);
    saveNewChat.set("token", req.params.token);
    saveNewChat.set("userName", req.params.userName);

    let savedChat = await saveNewChat.save().then(
      newChat => {
        return newChat;
      },
      error => {
        return { error };
      }
    );
    return JSON.stringify(savedChat);
  } else {
    return { response: "Chat already exists with that name!" };
  }
}

async function queryChat(req) {
  let GroupChat = Moralis.Object.extend("GroupChats");
  let query = new Moralis.Query(GroupChat);
  query.equalTo("objectId", req.params.groupId);
  let result = await query.find();

  return JSON.stringify(result);
}
