import React, { useEffect, useState } from "react";
import { socketServerConnect } from "../socket/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { connectToRoom } from "../../slices/roomSlice";
import { joinRoom } from "../socket/socketConnection";

const JoinRoomPrompt = () => {
  const [room, setRoom] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState(null);

  console.log(userInfo);

  const dispatch = useDispatch();
  const { roomId } = useSelector((state) => state.room);

  const handleRoomInputChange = (event) => {
    setRoom(event.target.value);
  };

  const handleSubmit = () => {
    if (room.length !== 0) {
      console.log("test");
      socketServerConnect();
      handleJoinRoom();
    }
  };

  const handleJoinRoom = async () => {
    setUserDetails({
      _id: userInfo.user._id,
      username: userInfo.user.username,
    });

    // Wrap the dispatch calls in Promises
    const connectToRoomPromise = dispatch(connectToRoom(room));

    // Wait for both Promises to resolve using Promise.all
    await Promise.all([connectToRoomPromise]);
  };

  useEffect(() => {
    if (room.length !== 0)
      joinRoom({
        room: roomId,
        user: userDetails,
      });
  }, [userDetails]);

  return (
    <div className="flex flex-col rounded-3xl bg-white px-[30px] py-10">
      <div className="mb-4">
        <div className="text-center text-2xl">Join a Room</div>
        <div>
          <div className="text-center text-sm italic">
            {userInfo.user._id === "guest" ? (
              <>
                (<span className="">You are not signed in</span>. Joining as{" "}
                <span className="text-sm font-medium italic text-blue-700">
                  {userInfo.user.username})
                </span>
              </>
            ) : (
              <>
                (Joining as{" "}
                <span className="text-sm font-medium italic text-blue-700">
                  {userInfo.user.username})
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          name="room"
          value={room}
          onChange={handleRoomInputChange}
          placeholder="Enter room ID"
          className="rounded-md border border-gray-400 px-4 py-2"
        />
        <button
          className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleSubmit}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPrompt;
