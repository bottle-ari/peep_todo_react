// ListContext.js

import React, { createContext, useContext, useState } from "react";

const ListContext = createContext();

class Category {
  constructor(name) {
    this.name = name;
    this.toDoList = [];
  }
}

export const ListProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [flexibleToDoList, setFlexibleToDoList] = useState([]);

  return (
    <ListContext.Provider
      value={{
        categoryList,
        setCategoryList,
        flexibleToDoList,
        setFlexibleToDoList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => {
  return useContext(ListContext);
};
