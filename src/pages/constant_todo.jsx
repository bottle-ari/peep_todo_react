// src/pages/FlexibleToDo.tsx

import React, { useContext } from "react";
import { useState } from "react";
import MainLayout from "../components/main_layout";
import { useCategoryContext } from "@/context/category_context";
import { useConstantTodoContext } from "@/context/constant_todo_context";
import TodoModel from "@/data/data_classes/TodoModel";
import SideSheet from "@/components/constant_todo/side_sheet";
import TodoItem from "@/components/constant_todo/todo_item";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function ConstantTodo() {
  const { categoryList } = useCategoryContext();
  const { selectedCount } = useCategoryContext();
  const { constantTodoList, setConstantTodoList } = useConstantTodoContext();
  const [newToDo, setNewToDo] = useState("");
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(-1);
  const [sideSheetState, setSideSheetState] = useState({
    open: false,
    categoryIndex: -1,
    todoIndex: -1,
  });

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragStart = ({ source }) => {
    console.log(source);
    const _sideSheetState = sideSheetState;
    _sideSheetState.todoIndex = source.index;
    setSideSheetState(_sideSheetState);
  };

  const onDragEnd =
    (categoryIndex) =>
    ({ source, destination }) => {
      if (!destination) return;

      // 깊은 복사
      const _constantTodoList = [...constantTodoList];
      const _categoryData = constantTodoList[categoryIndex];
      // 기존 아이템 뽑아내기
      const [targetItem] = _categoryData.todoList.splice(source.index, 1);
      // 기존 아이템을 새로운 위치에 삽입하기
      _categoryData.todoList.splice(destination.index, 0, targetItem);
      _constantTodoList[categoryIndex] = _categoryData;
      // 상태 변경
      setConstantTodoList(_constantTodoList);

      console.log(">>> source", source);
      console.log(">>> destination", destination);

      // sideSheetState 의 띄워진 todo 계속 보여주도록
      // sideSheetState.todoIndex 수정
      // Todo : 차후에, todo 드래그 해서, 다른 카테고리로 옮길 수 있도록
    };

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
      const category = categoryList[categoryIndex];

      const updatedConstantTodoList = constantTodoList;

      let currentCategory;
      let index;
      updatedConstantTodoList.forEach((element, elementIndex) => {
        if (element.category.id == category.id) {
          currentCategory = element;
          index = elementIndex;
          return;
        }
      });

      updatedConstantTodoList[index].todoList = [
        ...updatedConstantTodoList[index].todoList,
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
      {constantTodoList.length > 0 && sideSheetState.open && (
        <SideSheet
          isOpen={sideSheetState.open}
          onClose={closeSideSheet}
          todo={
            constantTodoList[sideSheetState.categoryIndex].todoList[
              sideSheetState.todoIndex
            ]
          }
          categoryIndex={sideSheetState.categoryIndex}
          todoIndex={sideSheetState.todoIndex}
        />
      )}

      <div className="flex">
        <div className="w-1/2">
          <h1>상시 ToDo</h1>
          {categoryList.map(
            (categoryTag, categoryTagIndex) =>
              (selectedCount === 0 || categoryTag.selected) && (
                <>
                  <li
                    key={categoryTagIndex}
                    onClick={() => handleCategoryClick(categoryTagIndex)}
                  >
                    {categoryTag.emoji + categoryTag.name + " +"}
                  </li>

                  {constantTodoList.map(
                    (categoryData, categoryIndex) =>
                      categoryData.category.id === categoryTag.id && (
                        <DragDropContext
                          onDragStart={onDragStart}
                          onDragEnd={onDragEnd(categoryIndex)}
                        >
                          <Droppable droppableId="droppable">
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {categoryData.todoList.map((todo, todoIndex) =>
                                  todo.completed_at === null ? (
                                    <Draggable
                                      key={todo.name}
                                      draggableId={`constant_todo-${todo.name}`}
                                      index={todoIndex}
                                    >
                                      {(provided) => (
                                        <ul
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <TodoItem
                                            key={todoIndex}
                                            categoryIndex={categoryIndex}
                                            todoIndex={todoIndex}
                                            openSideSheet={openSideSheet}
                                          />
                                        </ul>
                                      )}
                                    </Draggable>
                                  ) : null
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      )
                  )}

                  {categoryTagIndex === focusedCategoryIndex ? (
                    <input
                      key={categoryTagIndex}
                      type="text"
                      placeholder="상시ToDo 추가"
                      value={newToDo}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyPress(categoryTagIndex)}
                      onBlur={handleBlur}
                      autoFocus
                    />
                  ) : null}
                </>
              )
          )}
        </div>

        <div className="w-1/2">
          <h1>완료된 ToDo</h1>
          {selectedCount === 0 ? (
            <>
              {categoryList.map((categoryTag, categoryTagIndex) => (
                <>
                  <li
                    key={categoryTagIndex}
                    onClick={() => handleCategoryClick(categoryTagIndex)}
                  >
                    {categoryTag.emoji + categoryTag.name}
                  </li>

                  {constantTodoList.map(
                    (categoryData, categoryIndex) =>
                      categoryData.category.id === categoryTag.id && (
                        <DragDropContext onDragEnd={onDragEnd(categoryIndex)}>
                          <Droppable droppableId="droppable">
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {categoryData.todoList.map((todo, todoIndex) =>
                                  todo.completed_at !== null ? (
                                    <Draggable
                                      key={todo.name}
                                      draggableId={todo.name}
                                      index={todoIndex}
                                    >
                                      {(provided) => (
                                        <ul
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <TodoItem
                                            key={todoIndex}
                                            categoryIndex={categoryIndex}
                                            todoIndex={todoIndex}
                                            openSideSheet={openSideSheet}
                                          />
                                        </ul>
                                      )}
                                    </Draggable>
                                  ) : null
                                )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      )
                  )}
                </>
              ))}
            </>
          ) : (
            <>
              {categoryList.map(
                (categoryTag, categoryTagIndex) =>
                  categoryTag.selected && (
                    <>
                      <li
                        key={categoryTagIndex}
                        onClick={() => handleCategoryClick(categoryTagIndex)}
                      >
                        {categoryTag.emoji + categoryTag.name}
                      </li>

                      {constantTodoList.map(
                        (categoryData, categoryIndex) =>
                          categoryData.category.name === categoryTag.name && (
                            <ul key={categoryIndex}>
                              {categoryData.todoList.map((todo, todoIndex) =>
                                todo.completed_at !== null ? (
                                  <TodoItem
                                    key={todoIndex}
                                    categoryIndex={categoryIndex}
                                    todoIndex={todoIndex}
                                    openSideSheet={openSideSheet}
                                  />
                                ) : null
                              )}
                            </ul>
                          )
                      )}
                    </>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

ConstantTodo.layout = MainLayout;

export default ConstantTodo;
