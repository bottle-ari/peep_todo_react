// constant_todo_context.js
import React, { createContext, useContext, useState, useEffect } from "react";
import TodoModel from "@/data/data_classes/TodoModel";
import constantTodoDummyData from "../data/dummyData/constantTodoDummyData";
import CategoryModel from "@/data/data_classes/CategoryModel";

const ConstantTodoContext = createContext();

export const ConstantTodoProvider = ({ children }) => {
  const [constantTodoList, setConstantTodoList] = useState([]);

  // constantTodoList init from .json
  useEffect(() => {
    let initConstantTodoList = [];
    const categoriesFromJson = constantTodoDummyData.content;

    categoriesFromJson.map((category_data) => {
      let initTodoList = [];
      category_data.todoList.map((todo) => {
        initTodoList = [
          ...initTodoList,
          new TodoModel({
            category_id: todo.category_id,
            reminder_id: todo.reminder_id,
            name: todo.name,
            completed_at: todo.completed_at,
            subtodo_list: todo.subTodoList,
            date: todo.date,
            priority: todo.priority,
            memo: todo.memo,
            order: todo.order,
          }),
        ];
      });

      initConstantTodoList = [
        ...initConstantTodoList,
        {
          category: new CategoryModel({
            id: category_data.category.id,
            name: category_data.category.name,
            emoji: category_data.category.emoji,
            color: category_data.category.color,
            order: category_data.category.order,
            selected: false,
          }),
          todoList: initTodoList,
        },
      ];
    });
    setConstantTodoList(initConstantTodoList);
  }, []);

  return (
    <ConstantTodoContext.Provider
      value={{
        constantTodoList,
        setConstantTodoList,
      }}
    >
      {children}
    </ConstantTodoContext.Provider>
  );
};

export const useConstantTodoContext = () => {
  return useContext(ConstantTodoContext);
};
