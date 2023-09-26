import React from "react";
import CloseModalButton from "../util/CloseModalButton";

const UserStats = () => {
  return (
    <div
      className="relative flex h-5/6 w-5/6 p-4 flex-col gap-6 rounded-3xl bg-neutral-50 px-[30px] py-10"
      onClick={(event) => event.stopPropagation()}
    >
      <CloseModalButton />
      UserStats
    </div>
  );
};

export default UserStats;
