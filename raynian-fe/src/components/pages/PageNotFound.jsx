import React from "react";
import wolf from "../../assets/temp_pfp/wolf.png";

export const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center text-2xl">
        <h1 className="mt-10">404</h1>
        <p className="mt-10">How did this happen?</p>

        <img
          className="mt-[5rem]"
          src={wolf}
          alt="Error sprite"
          height={184}
          width={184}
        />
      </div>
    </>
  );
};
