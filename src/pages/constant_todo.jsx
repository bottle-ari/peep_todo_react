// src/pages/FlexibleToDo.tsx

import React, { useContext } from "react";
import { useState } from "react";
import flexibleDummyData from "../dummyData/flexibleDummyData.json";
import MainLayout from "../components/main_layout";
import { useListContext } from "../context/list_context";

const FlexibleToDo = () => {
  const { flexibleToDoList, setFlexibleToDoList } = useListContext();
  const [newToDo, setNewToDo] = useState("");
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(-1);

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
      const updatedFlexibleToDoList = flexibleToDoList;
      updatedFlexibleToDoList[categoryIndex].toDoList = [
        ...updatedFlexibleToDoList[categoryIndex].toDoList,
        { name: newToDo, check: false },
      ];
      setFlexibleToDoList(updatedFlexibleToDoList);
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

  const toggleCheck = (categoryIndex, toDoIndex) => {
    const updatedFlexibleToDoList = [...flexibleToDoList];
    updatedFlexibleToDoList[categoryIndex].toDoList[toDoIndex].check =
      !updatedFlexibleToDoList[categoryIndex].toDoList[toDoIndex].check;
    setFlexibleToDoList(updatedFlexibleToDoList);
  };

  return (
    <>
      <div>
        <h1>상시 ToDo</h1>
        {flexibleToDoList.map((category, categoryIndex) => (
          <>
            <li
              key={categoryIndex}
              onClick={() => handleCategoryClick(categoryIndex)}
            >
              {category.name + " + "}
            </li>
            <ul>
              {category.toDoList.map((toDo, toDoIndex) =>
                toDo.check === false ? (
                  <li key={toDoIndex}>
                    <label>
                      <input
                        type="checkbox"
                        checked={toDo.check}
                        onChange={() => toggleCheck(categoryIndex, toDoIndex)}
                      />
                      {toDo.name}
                    </label>
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
        {flexibleToDoList.map((category, categoryIndex) => (
          <>
            <li key={categoryIndex}>{category.name}</li>
            <ul>
              {category.toDoList.map((toDo, toDoIndex) =>
                toDo.check === true ? (
                  <li key={toDoIndex}>
                    <label>
                      <input
                        type="checkbox"
                        checked={toDo.check}
                        onChange={() => toggleCheck(categoryIndex, toDoIndex)}
                      />
                      {toDo.name}
                    </label>
                  </li>
                ) : null
              )}
            </ul>
          </>
        ))}
      </div>
    </>
  );
};

FlexibleToDo.layout = MainLayout;

export default FlexibleToDo;
