import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import * as tasksActions from "../../slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const itemsFromBackend = [
  { id: "1", content: "first task" },
  { id: "2", content: "second task" },
];

const columnsFromBackend = {
  col1: {
    name: "Dailies",
    items: itemsFromBackend,
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

const TempTaskSystem = () => {
  const dispatch = useDispatch();
  const { name, items } = useSelector((state) => state.tasks);
  const [columns, setColumns] = useState(null);

  const newItem = () => {
    console.log(columns);
    dispatch(tasksActions.addItem({ id: uuidv4(), content: "" }));
  };

  const removeItem = (index) => {
    dispatch(tasksActions.removeItem(index));
  };

  useEffect(() => {
    setColumns({ tasksCol: { name: name, items: items } });
  }, [items]);

  return (
    <div className="p-4 w-[400px]">
      {columns && (
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
                        background: snapshot.isDraggingOver ? "lightblue" : "",
                        padding: 4,
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
                                  className="relative font-normal text-xs"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    padding: 8,
                                    margin: "0 0 12px 0",
                                    minHeight: "50px",
                                    backgroundColor: snapshot.isDragging
                                      ? "#263B4a"
                                      : "#fafafa",
                                    color: "black",
                                    boxShadow: "6px 6px 3px rgba(0, 0, 0, 0.4)",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {/* {item.content} */}
                                  <TaskCard content={item.content}></TaskCard>
                                  <div
                                    className="absolute right-1 top-1 cursor-pointer"
                                    onClick={() => {
                                      removeItem(index);
                                    }}
                                  >
                                    <RxCross2 />
                                  </div>
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
        </DragDropContext>
      )}
      <div className="flex items-center justify-center">
        <p className="inline  cursor-pointer" onClick={newItem}>
          <AiOutlinePlus />
        </p>
      </div>
    </div>
  );
};

export default TempTaskSystem;
