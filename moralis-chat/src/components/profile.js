/** @format */

import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";

const Profile = () => {
  const { setUserData, user } = useMoralis();
  const [userNameInput, setUserNameInput] = useState("");

  const checkForDuplicate = async e => {
    e.preventDefault();
    if (userNameInput.length > 4) {
      const Users = Moralis.Object.extend("User");
      const query = new Moralis.Query(Users);
      query.contains("username", userNameInput);
      const result = await query
        .find()
        .then(result => {
          return JSON.stringify(result, null, 2);
        })
        .then(result => {
          return JSON.parse(result);
        });
      console.log("users result", result);

      if (result.length === 0) {
        updateUserData(result);
      }
    } else {
      console.log("username is to short");
    }
  };

  const updateUserData = result => {
    console.log("update name to ", result);
    setUserData({
      username: userNameInput,
    });
  };

  const uploadImage = async (event, files) => {
    const ProfileUpload = new Moralis.Object.extend("ProfileImage");
    let saveImage = new ProfileUpload();
    saveImage.set("userId", user.id);
    saveImage.set("image", files[0]);
    let result = await saveImage.save();

    // const moarlisFile = new Moralis.File(files[0].name, files[0]);

    console.log("saved image", JSON.stringify(result));
  };

  if (!user) {
    return <>Loading</>;
  }

  return (
    <div>
      <div>{user.get("username")}</div>

      <form>
        <input
          type='file'
          multiple={false}
          onChange={event => uploadImage(event, event.target.files)}
        />
        <input
          type='text'
          placeholder='Username'
          value={userNameInput}
          onChange={event => setUserNameInput(event.target.value)}
        />
        <button onClick={event => checkForDuplicate(event)}>Update</button>
      </form>
    </div>
  );
};

export default Profile;
