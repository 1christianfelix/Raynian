// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import avocado from "../../assets/temp_pfp/avocado.jpg";
// import boba from "../../assets/temp_pfp/boba.jpg";
// import sushi from "../../assets/temp_pfp/sushi.jpg";

// const ChatRoom = ({ socket, username, room }) => {
//   const [currentMessage, setCurrentMessage] = useState();
//   const { userInfo } = useSelector((state) => state.auth);
//   console.log(userInfo);
//   const [pfp, setPfp] = useState("");
//   const [profilePictures, setProfilePictures] = useState([]);

//   // const user = userInfo.profilePicture;
//   // console.log(user);
//   // useEffect(() => {
//   //   setPfp((prev) => [userInfo.user.profilePicture]);
//   // }, []);

//   useEffect(() => {
//     socket.on("user_connected", (data) => {
//       const { profilePicture } = data;
//       setProfilePictures((prevProfilePictures) => [
//         ...prevProfilePictures,
//         profilePicture,
//       ]);
//     });

//     socket.on("user_disconnected", (data) => {
//       const { profilePicture } = data;
//       setProfilePictures((prevProfilePictures) =>
//         prevProfilePictures.filter((picture) => picture !== profilePicture)
//       );
//     });

//     return () => {
//       socket.off("user_connected");
//       socket.off("user_disconnected");
//     };
//   }, [room]);

//   const sendMessage = async () => {
//     if (currentMessage !== "") {
//       const messageData = {
//         room: room,
//         author: username,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };

//       await socket.emit("send_message", messageData);
//     }
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       console.log(data);
//     });
//   }, [socket]);

//   return (
//     <div>
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body"></div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           placeholder="Hey..."
//           onChange={(e) => {
//             setCurrentMessage(e.target.value);
//           }}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//         <div className="flex">
//           <div className="flex">
//             {profilePictures.map((pfp) => {
//               console.log(profilePictures);
//               console.log(pfp, boba);
//               return (
//                 <img
//                   className="rounded-full h-20"
//                   src={pfp}
//                   alt="Profile Picture"
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;
