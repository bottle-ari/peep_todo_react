// ListContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import scheduledTodoDummyData from "../data/dummyData/scheduledTodoDummyData";
import CategoryModel from "@/data/data_classes/CategoryModel";
import TodoModel from "@/data/data_classes/TodoModel";

const ScheduledTodoContext = createContext();

export const ScheduledTodoProvider = ({ children }) => {
  const [scheduledTodoData, setScheduledTodoData] = useState(new Map());

  // scheduledTodoData init from .json
  useEffect(() => {
    let initScheduledTodoData = new Map();
    const dayListFromJson = scheduledTodoDummyData.contents;

    dayListFromJson.map((day) => {
      let newCategoryList = [];

      day.categories.map((categoryData) => {
        const newCategoryData = {
          category: new CategoryModel({
            id: categoryData.category.id,
            name: categoryData.category.name,
            emoji: categoryData.category.emoji,
            color: categoryData.category.color,
            order: categoryData.category.order,
            selected: false,
          }),
          todoList: [],
        };

        categoryData.todoList.map(
          (todo) =>
            (newCategoryData.todoList = [
              ...newCategoryData.todoList,
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
            ])
        );
        newCategoryList = [...newCategoryList, newCategoryData];
      });
      initScheduledTodoData.set(day.date, newCategoryList);
    });

    setScheduledTodoData(initScheduledTodoData);
  }, []);

  return (
    <ScheduledTodoContext.Provider
      value={{
        scheduledTodoData,
        setScheduledTodoData,
      }}
    >
      {children}
    </ScheduledTodoContext.Provider>
  );
};

export const useScheduledTodoContext = () => {
  return useContext(ScheduledTodoContext);
};
