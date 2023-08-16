// src/pages/FlexibleToDo.tsx

import React from "react";
import { useState } from "react";
import flexibleDummyData from "../dummyData/flexibleDummyData.json";
import MainLayout from '../components/MainLayout';

const FlexibleToDo = () => {
  const [categories, setCategories] = useState(flexibleDummyData.categories);

  const toggleCheck = (categoryIndex, toDoIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].todoList[toDoIndex].check =
      !updatedCategories[categoryIndex].todoList[toDoIndex].check;
    setCategories(updatedCategories);
  };

  return (
    <>
      <div>
        <div>
          <h1>상시 ToDo</h1>
          <ul>
            {categories.map((category, categoryIndex) => (
              <li key={categoryIndex}>
                {category.categoryName}
                <ul>
                  {category.todoList.map((toDo, toDoIndex) =>
                    toDo.check === false ? (
                      <li key={toDoIndex}>
                        <label>
                          <input
                            type="checkbox"
                            checked={toDo.check}
                            onChange={() =>
                              toggleCheck(categoryIndex, toDoIndex)
                            }
                          />
                          {toDo.todoName}
                        </label>
                      </li>
                    ) : null
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>완료된 ToDo</h1>
          <ul>
            {categories.map((category, categoryIndex) => (
              <li key={categoryIndex}>
                {category.categoryName}
                <ul>
                  {category.todoList.map((toDo, toDoIndex) =>
                    toDo.check === true ? (
                      <li key={toDoIndex}>
                        <label>
                          <input
                            type="checkbox"
                            checked={toDo.check}
                            onChange={() =>
                              toggleCheck(categoryIndex, toDoIndex)
                            }
                          />
                          {toDo.todoName}
                        </label>
                      </li>
                    ) : null
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

FlexibleToDo.layout = MainLayout;

export default FlexibleToDo;
