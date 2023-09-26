import React from "react";
import CloseModalButton from "../util/CloseModalButton";

const UserStats = () => {
  return (
    <div
      className="relative flex h-[80%] w-[80%] flex-col gap-6 rounded-3xl bg-neutral-50 p-4 px-[30px] py-10"
      onClick={(event) => event.stopPropagation()}
    >
      <CloseModalButton />
      <div></div>
    </div>
  );
};

export default UserStats;