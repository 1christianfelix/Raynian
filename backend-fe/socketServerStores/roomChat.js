const sendRoomMessage = (message) => {
  console.log("message:");
  console.log(message);
  return message;
};

const getRoomMessages = () => {
  console.log("sending");
  // return roomMessages;
};

module.exports = {
  sendRoomMessage,
  getRoomMessages,
};
