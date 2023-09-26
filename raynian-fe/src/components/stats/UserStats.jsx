import React from "react";

const UserStats = () => {
  return (
    <div
      className="flex h-5/6 w-5/6 p-4 flex-col gap-6 rounded-3xl bg-neutral-50 px-[30px] py-10"
      onClick={(event) => event.stopPropagation()}
    >
      UserStats
    </div>
  );
};

export default UserStats;
