import React, { useEffect, useState } from "react";
import Profile from "./Profile";

const ProfileGrid = ({ profiles }) => {
  const [gridCols, setGridCols] = useState("");

  useEffect(() => {
    let state = "";
    switch (profiles.length) {
      case 1:
        state = "grid-cols-1";
        break;
      case 2:
        state = "grid-cols-2";
        break;
      case 3:
        state = "grid-cols-3";
        break;
      case 4:
        state = "grid-cols-4";
        break;
      case 5:
        state = "grid-cols-5";
        break;
      default:
        state = "grid-cols-5"; // Default value if profile length is greater than 5
        break;
    }

    setGridCols(state);
  }, [profiles]);

  return (
    <>
      {gridCols && (
        <div className={`grid ${gridCols} gap-4 pt-10`}>
          {profiles.map((profile, index) => (
            <Profile key={index} pfp={profile} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileGrid;
