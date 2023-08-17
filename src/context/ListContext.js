// ListContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import flexibleDummyData from "../dummyData/flexibleDummyData.json";
import scheduledDummyData from "../dummyData/scheduledDummyData.json";

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [flexibleToDoList, setFlexibleToDoList] = useState([]);
  const [scheduledToDoData, setScheduledToDoData] = useState(new Map());

  // categoryList init from .json
  useEffect(() => {
    let initCategoryList = [];
    const categoriesFromJson = flexibleDummyData.categories;
    categoriesFromJson.map(
      (category) =>
        (initCategoryList = [...initCategoryList, category.categoryName])
    );
    setCategoryList(initCategoryList);
  }, []);

  // flexibleToDoList init from .json
  useEffect(() => {
    let initFlexibleToDoList = [];
    const categoriesFromJson = flexibleDummyData.categories;

    categoriesFromJson.map((category) => {
      const newCategory = { name: category.categoryName, toDoList: [] };
      category.todoList.map(
        (toDo) =>
          (newCategory.toDoList = [
            ...newCategory.toDoList,
            { name: toDo.todoName, check: false },
          ])
      );
      initFlexibleToDoList = [...initFlexibleToDoList, newCategory];
    });
    setFlexibleToDoList(initFlexibleToDoList);
  }, []);

  // flexibleToDoList init from .json
  useEffect(() => {
    let initScheduledToDoData = new Map();
    const dayListFromJson = scheduledDummyData.contents;

    dayListFromJson.map((day) => {
      let newCategoryList = [];

      day.categories.map((category) => {
        const newCategory = { name: category.categoryName, toDoList: [] };
        category.todoList.map(
          (toDo) =>
            (newCategory.toDoList = [
              ...newCategory.toDoList,
              { name: toDo.todoName, check: false },
            ])
        );
        newCategoryList = [...newCategoryList, newCategory];
      });
      initScheduledToDoData.set(day.date, newCategoryList);
    });

    setScheduledToDoData(initScheduledToDoData);
  }, []);

  return (
    <ListContext.Provider
      value={{
        categoryList,
        setCategoryList,
        flexibleToDoList,
        setFlexibleToDoList,
        scheduledToDoData,
        setScheduledToDoData,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => {
  return useContext(ListContext);
};
