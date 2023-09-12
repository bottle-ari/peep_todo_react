// SideSheet.jsx
import React, { useState } from "react";
import styles from "../../styles/SideSheet.module.css"; // module.css 파일 임포트
import { useConstantTodoContext } from "@/context/constant_todo_context";
import SideSheetSubtodoItem from "./sidesheet_subtodo_item";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideSheetTodoItem from "./sidesheet_todo_item";

function SideSheet({ isOpen, onClose, categoryIndex, todoIndex }) {
  const { constantTodoList, setConstantTodoList } = useConstantTodoContext();
  const todo = constantTodoList[categoryIndex].todoList[todoIndex];

  /* Sub Todo 끼리, 순서 변경 */
  const onDragEnd =
    (categoryIndex, todoIndex) =>
    ({ source, destination }) => {
      if (!destination) return;

      // 깊은 복사
      const _constantTodoList = [...constantTodoList];
      const _subtodoList =
        _constantTodoList[categoryIndex].todoList[todoIndex].subtodo_list;
      // 기존 아이템 뽑아내기
      const [targetItem] = _subtodoList.splice(source.index, 1);
      // 기존 아이템을 새로운 위치에 삽입하기
      _subtodoList.splice(destination.index, 0, targetItem);

      _constantTodoList[categoryIndex].todoList[todoIndex].subtodo_list =
        _subtodoList;
      // 상태 변경
      setConstantTodoList(_constantTodoList);

      console.log(">>> source", source);
      console.log(">>> destination", destination);
    };

  /* Sub todo 추가 */
  const [newSubtodoName, setNewSubtodoName] = useState("");

  const handleAddSubtodo = () => {
    if (newSubtodoName.trim() !== "") {
      const newSubtodo = {
        subTodoName: newSubtodoName,
        check: false,
      };

      // 깊은 복사
      const _constantTodoList = [...constantTodoList];
      let _subtodoList =
        _constantTodoList[categoryIndex].todoList[todoIndex].subtodo_list;

      _subtodoList = [...todo.subtodo_list, newSubtodo];

      _constantTodoList[categoryIndex].todoList[todoIndex].subtodo_list =
        _subtodoList;
      // 상태 변경
      setConstantTodoList(_constantTodoList);

      setNewSubtodoName("");
    }
  };

  const handleInputChange = (event) => {
    setNewSubtodoName(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddSubtodo();
    }
  };

  /* Todo delete */
  const onDelete = () => {
    // 깊은 복사
    const _constantTodoList = [...constantTodoList];
    let _todoList = _constantTodoList[categoryIndex].todoList;

    _todoList.splice(todoIndex, 1);

    _constantTodoList[categoryIndex].todoList = _todoList;
    // 상태 변경
    setConstantTodoList(_constantTodoList);
    onClose();
  };

  return (
    <div className={`${styles["side-sheet"]} ${isOpen ? styles.open : ""}`}>
      <div className={`${styles.content}`}>
        <h1>Todo 상세</h1>
        <div>
          <ul>
            <SideSheetTodoItem
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

          <div>
            <input
              style={{ width: "219px" }}
              type="text"
              placeholder="Subtodo 추가"
              value={newSubtodoName}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
            />
          </div>

          <p>category_id : {todo.category_id}</p>
          <p>reminder_id : {todo.reminder_id}</p>
          <p>completed_at : {todo.completed_at}</p>
          <p>date : {todo.date}</p>
          <p>priority : {todo.priority}</p>
          <p>memo : {todo.memo}</p>
          <p>order : {todo.order}</p>
        </div>
        <button onClick={onDelete}>delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SideSheet;
