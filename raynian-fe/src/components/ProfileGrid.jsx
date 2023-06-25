import React, { useEffect, useState } from "react";
import Profile from "./Profile";

const ProfileGrid = ({ profiles }) => {
  const [gridCols, setGridCols] = useState("");

  useEffect(() => {
    let cols = profiles.length;

    if (cols < 1) {
      cols = 1; // Minimum of 1 column
    } else if (cols > 3) {
      cols = 3; // Maximum of 3 columns
    }

    setGridCols(cols);
  }, [profiles]);

  useEffect(() => {
    setGridCols(`grid-cols-${profiles.length}`); // Trigger state update after initial rendering
  }, []);

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
