// SideSheet.jsx
import React, { useState } from "react";
import styles from "../../styles/SideSheet.module.css"; // module.css 파일 임포트

function ConstantTodoSideSheet({ isOpen, onClose, todo }) {
  /*
  const toggleCheck = (subtodoIndex) => {
    todo.subtodo_list[subtodoIndex].check =
      !todo.subtodo_list[subtodoIndex].check;
  };
  */

  return (
    <div className={`${styles["side-sheet"]} ${isOpen ? styles.open : ""}`}>
      <div className={`${styles.content}`}>
        <h1>Todo 상세</h1>
        <div>
          <h2>{todo.name}</h2>
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

export default ConstantTodoSideSheet;
