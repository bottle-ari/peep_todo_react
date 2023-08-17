// src/pages/FlexibleToDo.tsx

import React, { useContext } from "react";
import { useState } from "react";
import flexibleDummyData from "../dummyData/flexibleDummyData.json";
import MainLayout from "../components/MainLayout";
import { useListContext } from "../context/ListContext";

const FlexibleToDo = () => {
  const { flexibleToDoList, setFlexibleToDoList } = useListContext();
  const [newToDo, setNewToDo] = useState("");

  // category가 클릭되었을때, input이 보이도록
  const addToDoInCategory = () => {};

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
          <div>
            <li key={categoryIndex}>{category.name}</li>
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
            <input
              type="text"
              placeholder="상시ToDo 추가"
              value={newToDo}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress(categoryIndex)}
            />
          </div>
        ))}
      </div>
      <div>
        <h1>완료된 ToDo</h1>
        {flexibleToDoList.map((category, categoryIndex) => (
          <div>
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
          </div>
        ))}
      </div>
    </>
  );
};

FlexibleToDo.layout = MainLayout;

export default FlexibleToDo;
