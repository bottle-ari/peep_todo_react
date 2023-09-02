// SideSheet.jsx
import React, { useState } from "react";
import styles from "../../styles/SideSheet.module.css"; // module.css 파일 임포트
import { useScheduledTodoContext } from "@/context/scheduled_todo_context";
import moment from "moment";
import ScheduledTodoItem from "./scheduled_todo_item";

function ScheduledTodoSideSheet({
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

  const openSideSheet = (categoryIndex, todoIndex) => {};

  return (
    <div className={`${styles["side-sheet"]} ${isOpen ? styles.open : ""}`}>
      <div className={`${styles.content}`}>
        <h1>Todo 상세</h1>
        <div>
          <ScheduledTodoItem
            selectedDate={selectedDate}
            categoryIndex={categoryIndex}
            todoIndex={todoIndex}
            openSideSheet={openSideSheet}
          />
          <ul>
            {todo.subtodo_list.map((subtodo, subtodoIndex) => (
              <li key={subtodoIndex}>
                <label>
                  <input
                    type="checkbox"
                    checked={subtodo.check}
                    //onChange={() => toggleCheck(subtodoIndex)}
                  />
                  {subtodo.subTodoName}
                </label>
              </li>
            ))}
          </ul>
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

export default ScheduledTodoSideSheet;
