// SideSheet.jsx
import React, { useState } from "react";
import styles from "../../styles/SideSheet.module.css"; // module.css 파일 임포트
import ConstantTodoItem from "./constant_todo_item";
import { useConstantTodoContext } from "@/context/constant_todo_context";

function ConstantTodoSideSheet({ isOpen, onClose, categoryIndex, todoIndex }) {
  const { constantTodoList, setConstantTodoList } = useConstantTodoContext();
  const todo = constantTodoList[categoryIndex].todoList[todoIndex];

  const openSideSheet = (categoryIndex, todoIndex) => {};

  return (
    <div className={`${styles["side-sheet"]} ${isOpen ? styles.open : ""}`}>
      <div className={`${styles.content}`}>
        <h1>Todo 상세</h1>
        <div>
          <ul>
            <ConstantTodoItem
              categoryIndex={categoryIndex}
              todoIndex={todoIndex}
              openSideSheet={openSideSheet}
            />
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

export default ConstantTodoSideSheet;
