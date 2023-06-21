import React from "react";
import Profile from "./Profile";
const ProfileGrid = ({ profiles }) => {
  let gridCols = profiles.length; // Number of columns in the grid
  if (gridCols < 1) {
    gridCols = 1; // Minimum of 1 column
  } else if (gridCols > 3) {
    gridCols = 3; // Maximum of 3 columns
  }

  // Rethink grid size and profile picture size as the more people join.

  return (
    <div className={`grid grid-cols-${gridCols} gap-4 pt-10`}>
      {profiles.map((profile, index) => (
        <Profile key={index} pfp={profile} />
      ))}
    </div>
  );
};

export default ProfileGrid;
