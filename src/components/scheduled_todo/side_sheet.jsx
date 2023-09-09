// SideSheet.jsx
import React, { useState } from "react";
import styles from "../../styles/SideSheet.module.css"; // module.css 파일 임포트
import { useScheduledTodoContext } from "@/context/scheduled_todo_context";
import moment from "moment";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideSheetTodoItem from "./sidesheet_todo_item";
import SideSheetSubtodoItem from "./sidesheet_subtodo_item";

function SideSheet({
  isOpen,
  onClose,
  selectedDate,
  categoryIndex,
  todoIndex,
}) {
  const { scheduledTodoData, setScheduledTodoData } = useScheduledTodoContext();
  const categoryData = scheduledTodoData.get(
    moment(selectedDate).format("YYYYMMDD")
  )[categoryIndex];
  const todo = categoryData.todoList[todoIndex];

  const onDragEnd =
    (categoryIndex, todoIndex) =>
    ({ source, destination }) => {
      if (!destination) return;

      const day = moment(selectedDate).format("YYYYMMDD");

      // 깊은 복사
      const updatedScheduledTodoData = new Map(scheduledTodoData);
      const newCategoryList = [...updatedScheduledTodoData.get(day)];

      const _subtodoList =
        newCategoryList[categoryIndex].todoList[todoIndex].subtodo_list;
      // 기존 아이템 뽑아내기
      const [targetItem] = _subtodoList.splice(source.index, 1);
      // 기존 아이템을 새로운 위치에 삽입하기
      _subtodoList.splice(destination.index, 0, targetItem);

      newCategoryList[categoryIndex].todoList[todoIndex].subtodo_list =
        _subtodoList;
      // 상태 변경
      updatedScheduledTodoData.set(day, newCategoryList);
      setScheduledTodoData(updatedScheduledTodoData);

      console.log(">>> source", source);
      console.log(">>> destination", destination);
    };

  return (
    <div className={`${styles["side-sheet"]} ${isOpen ? styles.open : ""}`}>
      <div className={`${styles.content}`}>
        <h1>Todo 상세</h1>
        <div>
          <ul>
            <SideSheetTodoItem
              selectedDate={selectedDate}
              categoryIndex={categoryIndex}
              todoIndex={todoIndex}
            />
          </ul>

          <DragDropContext onDragEnd={onDragEnd(categoryIndex, todoIndex)}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {todo.subtodo_list.map((subtodo, subtodoIndex) => (
                    <Draggable
                      key={subtodo.subTodoName}
                      draggableId={`subtodo-${subtodo.subTodoName}`}
                      index={subtodoIndex}
                    >
                      {(provided) => (
                        <ul
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <SideSheetSubtodoItem
                            selectedDate={selectedDate}
                            categoryIndex={categoryIndex}
                            todoIndex={todoIndex}
                            subtodoIndex={subtodoIndex}
                          />
                        </ul>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <p>category_id : {todo.category_id}</p>
          <p>reminder_id : {todo.reminder_id}</p>
          <p>completed_at : {todo.completed_at}</p>
          <p>date : {todo.date}</p>
          <p>priority : {todo.priority}</p>
          <p>memo : {todo.memo}</p>
          <p>order : {todo.order}</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SideSheet;
