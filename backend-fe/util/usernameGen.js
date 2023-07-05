const { animals, hardAdj, softAdj, determiners } = require("./wordArrays");
const User = require("../models/UserModel");

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function randomUsername(animals, hardAdj, softAdj, determiners) {
  let det = getRandomElement(determiners);
  const noun = getRandomElement(animals);
  const randomIndex = Math.floor(Math.random() * 2);
  const adj = getRandomElement(randomIndex === 0 ? hardAdj : softAdj);

  if (det === "a" && adj[0] === "a") {
    det = "an";
  }
  if (det === "an" && adj[0] !== "a") {
    det = "a";
  }
  const username = `${det}${adj}${noun}`;
  return username;
}

const usernameGeneration = async () => {
  let username = randomUsername(animals, hardAdj, softAdj, determiners);
  let count = 0;

  while (
    username.length > 25 ||
    (count < 5 && (await User.findOne({ username })))
  ) {
    console.log(username);
    username = randomUsername(animals, hardAdj, softAdj, determiners);
    count++;
  }
  if (await User.findOne({ username })) {
    while (await User.findOne({ username })) {
      console.log("loop2", await User.findOne({ username }));
      if (username.length < 24 && username.match(/\d/) == null) {
        username += "2";
      } else if (username.length < 24 && username.match(/\d/) != null) {
        let strNumber = username.match(/\d+/g);
        let intNumber = parseInt(username.match(/\d+/g));
        username = username.replace(strNumber, `${intNumber + 1}`);
      } else {
        username = randomUsername(animals, hardAdj, softAdj, determiners);
      }
    }
  }
  return username;
};

module.exports = { usernameGeneration };
