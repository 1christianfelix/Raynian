import React from "react";
import { useSelector } from "react-redux";

const ParticipantList = () => {
  const { participants } = useSelector((state) => state.room);
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {participants.map((participant) => (
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-xl border"></div>
          <div className="text-sm">{participant.username}</div>
        </div>
      ))}
    </div>
  );
};

export default ParticipantList;
