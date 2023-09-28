import React, { useState } from "react";

const TaskCard = (props) => {
  const [inputValue, setInputValue] = useState(props.content);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className=" p-1 flex justify-between ">
      <input
        className="bg-transparent w-11/12 border-b outline-none"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TaskCard;
