import React, { useState } from "react";

const TaskCard = (props) => {
  const [inputValue, setInputValue] = useState(props.content);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="">
      <input
        className="bg-transparent"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TaskCard;
