import React, { useState, useRef, useEffect } from "react";
import { LiaWindowMinimizeSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { sendRoomChat } from "../socket/socketConnection";
import Draggable from "react-draggable";

const ChatDisplay = () => {
  const { chat, roomId, user } = useSelector((state) => state.room);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null);
  const [chatView, setChatView] = useState(true);

  if (roomId == null) {
    return null;
  }

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  // useEffect(() => {
  //   setMessages(chat);
  // }, chat);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      const newChat = {
        message: newMessage,
        username: user.username, // Replace 'User' with the actual username or user data
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        roomId: roomId,
      };
      console.log(newChat);
      sendRoomChat(newChat);
      // setMessages([...messages, newChat]);
      setNewMessage("");
    }
  };

  // Scroll the chat box to the bottom when a new message is added
  useEffect(() => {
    if (
      chatView &&
      chatBoxRef.current.scrollTop == chatBoxRef.current.scrollHeight
    )
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chat]);

  return (
    // <Draggable>
    <div className="h-[100%] w-[100%]  text-neutral-100">
      <div className="flex h-[100%] w-[100%] flex-col">
        {/* <div className="flex h-8 w-[100%] items-center justify-end rounded-t-md bg-black bg-opacity-10">
          <div className="mr-2 cursor-pointer transition-all hover:scale-[110%]">
            <LiaWindowMinimizeSolid />
          </div>
        </div> */}
        {true && (
          <div
            ref={chatBoxRef}
            className={` scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-thumb-rounded-full flex-1 overflow-y-scroll p-4 opacity-0 select-none backdrop-blur-sm bg-transparent transition ${
              chatView && "bg-black/40 opacity-100"
            }`}
          >
            {chat.map((chat, index) => (
              <div key={index} className="mb-2">
                {!chat.username ? (
                  <div className="bg-green-400 bg-opacity-20 font-semibold">
                    <span className="text-neutral-100">{chat.message}</span>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="mr-1 text-xs text-neutral-100">
                        {chat.timestamp}
                      </span>
                      <span className="font-normal">{chat.username}: </span>
                    </div>
                    <div>
                      {" "}
                      <span className="text-neutral-100">{chat.message}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <form
          className="mt-auto bg-black/20 border-b text-white border-gray-300"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full rounded-md border-b bg-transparent p-2 focus:outline-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleInputChange}
            onFocus={() => setChatView(true)}
            onBlur={() => setChatView(false)}
          />
        </form>
      </div>
    </div>
    // </Draggable>
  );
};

export default ChatDisplay;
