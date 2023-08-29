// src/pages/FlexibleToDo.tsx

import React, { useContext } from "react";
import { useState } from "react";
import MainLayout from "../components/main_layout";
import { useConstantTodoContext } from "@/context/constant_todo_context";
import TodoModel from "@/data/data_classes/TodoModel";
import SideSheet from "@/components/side_sheet";

function ConstantTodo() {
  const { constantTodoList, setConstantTodoList } = useConstantTodoContext();
  const [newToDo, setNewToDo] = useState("");
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(-1);
  const [sideSheetState, setSideSheetState] = useState({
    open: false,
    categoryIndex: -1,
    todoIndex: -1,
  });

  const openSideSheet = (categoryIndex, todoIndex) => {
    setSideSheetState({
      open: true,
      categoryIndex: categoryIndex,
      todoIndex: todoIndex,
    });
  };

  const closeSideSheet = () => {
    setSideSheetState({
      open: false,
      categoryIndex: -1,
      todoIndex: -1,
    });
  };

  // category가 클릭되었을때, input이 보이도록
  const handleCategoryClick = (categoryIndex) => {
    setFocusedCategoryIndex(categoryIndex);
  };

  // input 다시 안보이도록,
  const handleBlur = () => {
    setFocusedCategoryIndex(-1);
  };

  const handleAddToDo = (categoryIndex) => {
    if (newToDo.trim() !== "") {
      const updatedConstantTodoList = constantTodoList;
      const currentCategory = updatedConstantTodoList[categoryIndex];

      updatedConstantTodoList[categoryIndex].todoList = [
        ...updatedConstantTodoList[categoryIndex].todoList,
        new TodoModel({
          category_id: currentCategory.category.id,
          reminder_id: null,
          name: newToDo,
          completed_at: null,
          subtodo_list: [],
          date: null,
          priority: 0,
          memo: "",
          order: currentCategory.todoList.length,
        }),
      ];
      setConstantTodoList(updatedConstantTodoList);
      setNewToDo("");
    }
  };

  const handleInputChange = (event) => {
    setNewToDo(event.target.value);
  };

  const handleInputKeyPress = (categoryIndex) => (event) => {
    if (event.key === "Enter") {
      handleAddToDo(categoryIndex);
    }
  };

  const toggleCheck = (categoryIndex, todoIndex) => {
    const updatedConstantTodoList = [...constantTodoList];

    // 완료되지 않은 Todo 일 경우
    if (
      updatedConstantTodoList[categoryIndex].todoList[todoIndex]
        .completed_at === null
    ) {
      // 현재 완료된 날짜 가져오기
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}${month}${day}`;
      updatedConstantTodoList[categoryIndex].todoList[todoIndex].completed_at =
        formattedDate;
    }

    // 완료된 Todo 일 경우
    else {
      updatedConstantTodoList[categoryIndex].todoList[todoIndex].completed_at =
        null;
    }

    setConstantTodoList(updatedConstantTodoList);
  };

  return (
    <>
      <div>
        {constantTodoList.length > 0 && sideSheetState.open && (
          <SideSheet
            isOpen={sideSheetState.open}
            onClose={closeSideSheet}
            todo={
              constantTodoList[sideSheetState.categoryIndex].todoList[
                sideSheetState.todoIndex
              ]
            }
          />
        )}
        <h1>상시 ToDo</h1>
        {constantTodoList.map((category_data, categoryIndex) => (
          <>
            <li
              key={categoryIndex}
              onClick={() => handleCategoryClick(categoryIndex)}
            >
              {category_data.category.emoji +
                category_data.category.name +
                " + "}
            </li>
            <ul>
              {category_data.todoList.map((todo, todoIndex) =>
                todo.completed_at === null ? (
                  <li key={todoIndex}>
                    <input
                      type="checkbox"
                      checked={todo.completed_at !== null}
                      onChange={() => toggleCheck(categoryIndex, todoIndex)}
                    />
                    <span
                      onClick={() => openSideSheet(categoryIndex, todoIndex)}
                    >
                      {todo.name}
                    </span>
                  </li>
                ) : null
              )}
            </ul>
            {categoryIndex === focusedCategoryIndex ? (
              <input
                type="text"
                placeholder="상시ToDo 추가"
                value={newToDo}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyPress(categoryIndex)}
                onBlur={handleBlur}
                autoFocus
              />
            ) : null}
          </>
        ))}
      </div>
      <div>
        <h1>완료된 ToDo</h1>
        {constantTodoList.map((category_data, categoryIndex) => (
          <>
            <li key={categoryIndex}>
              {category_data.category.emoji + category_data.category.name}
            </li>
            <ul>
              {category_data.todoList.map((todo, todoIndex) =>
                todo.completed_at !== null ? (
                  <li key={todoIndex}>
                    <input
                      type="checkbox"
                      checked={todo.completed_at !== null}
                      onChange={() => toggleCheck(categoryIndex, todoIndex)}
                    />
                    <span
                      onClick={() => openSideSheet(categoryIndex, todoIndex)}
                    >
                      {todo.name}
                    </span>
                  </li>
                ) : null
              )}
            </ul>
          </>
        ))}
      </div>
    </>
  );
}

ConstantTodo.layout = MainLayout;

export default ConstantTodo;
