import React from "react";
import { useSelector } from "react-redux";

const ParticipantList = () => {
  const { participants } = useSelector((state) => state.room);
  return (
    <div className="flex flex-col gap-2">
      {participants.map((participant) => (
        <div>{participant.username}</div>
      ))}
    </div>
  );
};

export default ParticipantList;
