import React, { useState, useEffect, useContext } from "react";
import CloseModalButton from "../util/CloseModalButton";
import { ModalContext } from "../../context/ModalContext";
import { RxCross1 } from "react-icons/rx";
import { WallpaperContext } from "../../context/WallpaperContex";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const itemsFromBackend = [
  { id: "1", content: "first task" },
  { id: "2", content: "second task" },
];

const itemsFromBackend2 = [
  { id: "3", content: "first task" },
  { id: "4", content: "second task" },
];

const columnsFromBackend = {
  col1: {
    name: "Dailies",
    items: itemsFromBackend,
  },
  col2: {
    name: "Dailies2",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const { source, destination } = result;
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const DailiesDashboard = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  const { theme } = useContext(WallpaperContext);
  const { type, setType } = useContext(ModalContext);
  const handleContent = () => {
    setType(null);
  };
  return (
    <div
      className="relative flex flex-col w-[90%] h-[90%] shadow-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full bg-neutral-800  text-neutral-200 flex items-center justify-end p-4">
        <div onClick={handleContent} className="cursor-pointer">
          <RxCross1 />
        </div>
      </div>
      <div className="flex-grow flex w-full h-full">
        <div className="w-[10%] bg-neutral-300">{/* Sidebar content */}</div>
        <div className="w-[90%] bg-neutral-50 p-4 grid grid-cols-4 gap-4">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([id, column]) => {
              return (
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4a"
                                        : "#456c86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
            {/* <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-300 ">Dailies</div>
              <div className="bg-gray-300">Queue</div>
              <div className="bg-gray-300">Live</div>
              <div className="bg-gray-300">Completed</div>
            </div> */}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default DailiesDashboard;
