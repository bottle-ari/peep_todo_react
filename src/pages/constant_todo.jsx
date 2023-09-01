// src/pages/FlexibleToDo.tsx

import React, { useContext } from "react";
import { useState } from "react";
import MainLayout from "../components/main_layout";
import { useConstantTodoContext } from "@/context/constant_todo_context";
import TodoModel from "@/data/data_classes/TodoModel";
import ConstantTodoSideSheet from "@/components/constant_todo/constant_todo_side_sheet";
import ConstantTodoItem from "@/components/constant_todo/constant_todo_item";

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

  return (
    <>
      <div>
        {constantTodoList.length > 0 && sideSheetState.open && (
          <ConstantTodoSideSheet
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
                  <ConstantTodoItem
                    color={category_data.category.color}
                    todo={todo}
                    categoryIndex={categoryIndex}
                    todoIndex={todoIndex}
                    openSideSheet={openSideSheet}
                  />
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
                  <ConstantTodoItem
                    color={category_data.category.color}
                    todo={todo}
                    categoryIndex={categoryIndex}
                    todoIndex={todoIndex}
                    openSideSheet={openSideSheet}
                  />
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
