// ScheduledToDo.jsx
import React, { useContext, useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MainLayout from "@/components/main_layout";
import { useCategoryContext } from "@/context/category_context";
import { useScheduledTodoContext } from "@/context/scheduled_todo_context";
import TodoModel from "@/data/data_classes/TodoModel";
import SideSheet from "@/components/scheduled_todo/side_sheet";
import TodoItem from "@/components/scheduled_todo/todo_item";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CustomMonthView from "@/components/scheduled_todo/calendar";

function ScheduledTodo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const { scheduledTodoData, setScheduledTodoData } = useScheduledTodoContext();
  const { categoryList } = useCategoryContext();
  const { selectedCount } = useCategoryContext();
  const [newToDo, setNewToDo] = useState("");
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(-1);
  const [sideSheetState, setSideSheetState] = useState({
    open: false,
    categoryIndex: -1,
    todoIndex: -1,
  });

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd =
    (day, categoryIndex) =>
    ({ source, destination }) => {
      if (!destination) return;

      // 깊은 복사
      const _scheduledTodoData = new Map(scheduledTodoData);
      const _categoryData = _scheduledTodoData.get(day)[categoryIndex];
      // 기존 아이템 뽑아내기
      const [targetItem] = _categoryData.todoList.splice(source.index, 1);
      // 기존 아이템을 새로운 위치에 삽입하기
      _categoryData.todoList.splice(destination.index, 0, targetItem);
      _scheduledTodoData[categoryIndex] = _categoryData;
      // 상태 변경
      setScheduledTodoData(_scheduledTodoData);

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

  const handleAddToDo = (day, categoryTagIndex) => {
    if (newToDo.trim() !== "") {
      const updatedScheduledTodoData = new Map(scheduledTodoData);

      // 선택된 날짜에 ToDo data가 있었다면,
      if (updatedScheduledTodoData.has(day)) {
        let newCategoryList = [...updatedScheduledTodoData.get(day)];

        let categoryFound = false;
        for (let i = 0; i < newCategoryList.length; i++) {
          // 추가하려는 Todo가, 기존에 존재하는 카테고리에 속한다면,
          // 기존에 존재하는 카테고리의 하위에 Todo 추가
          if (
            newCategoryList[i].category.name ===
            categoryList[categoryTagIndex].name
          ) {
            const currentCategory = newCategoryList[i];
            newCategoryList[i].todoList.push(
              new TodoModel({
                category_id: currentCategory.category.id,
                reminder_id: null,
                name: newToDo,
                completed_at: null,
                subtodo_list: [],
                date: day,
                priority: 0,
                memo: "",
                order: currentCategory.todoList.length,
              })
            );
            categoryFound = true;
            break;
          }
        }

        // 추가하려는 Todo가, 기존에 존재하는 카테고리에 속하지 않는다면,
        // 카테고리를 추가하고, 하위에 Todo를 추가
        if (!categoryFound) {
          const currentCategory = categoryList[categoryTagIndex];
          newCategoryList.push({
            category: currentCategory,
            todoList: [
              new TodoModel({
                category_id: currentCategory.id,
                reminder_id: null,
                name: newToDo,
                completed_at: null,
                subtodo_list: [],
                date: day,
                priority: 0,
                memo: "",
                order: 1,
              }),
            ],
          });
        }

        updatedScheduledTodoData.set(day, newCategoryList);
      } else {
        // 선택된 날짜에 ToDo data가 없었다면,
        const newCategoryList = [
          {
            category: categoryList[categoryTagIndex],
            todoList: [
              new TodoModel({
                category_id: categoryList[categoryTagIndex].id,
                reminder_id: null,
                name: newToDo,
                completed_at: null,
                subtodo_list: [],
                date: day,
                priority: 0,
                memo: "",
                order: 1,
              }),
            ],
          },
        ];
        updatedScheduledTodoData.set(day, newCategoryList);
      }
      setScheduledTodoData(updatedScheduledTodoData);
      setNewToDo("");
    }
  };

  const handleInputChange = (event) => {
    setNewToDo(event.target.value);
  };

  const handleInputKeyPress = (day, categoryTagIndex) => (event) => {
    if (event.key === "Enter") {
      handleAddToDo(day, categoryTagIndex);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    closeSideSheet();
  };

  // event setting
  useEffect(() => {
    let newEvents = [];

    scheduledTodoData.forEach((value, key) => {
      value.map((categoryData) => {
        const year = parseInt(key.slice(0, 4));
        const month = parseInt(key.slice(4, 6));
        const day = parseInt(key.slice(6, 8));

        newEvents = [
          ...newEvents,
          {
            title: categoryData.category.name,
            start: new Date(year, month - 1, day),
            end: new Date(year, month - 1, day + 1),
          },
        ];

        setEvents(newEvents);
      });
    });
  }, [scheduledTodoData]);

  return (
    <>
      {scheduledTodoData.has(moment(selectedDate).format("YYYYMMDD")) &&
        sideSheetState.open && (
          <SideSheet
            isOpen={sideSheetState.open}
            onClose={closeSideSheet}
            selectedDate={selectedDate}
            categoryIndex={sideSheetState.categoryIndex}
            todoIndex={sideSheetState.todoIndex}
          />
        )}
      <div className="flex">
        <div className="w-1/2">
          <h1>선택한 날짜: {moment(selectedDate).format("YYYYMMDD")}</h1>
          <>
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

                    {scheduledTodoData.has(
                      moment(selectedDate).format("YYYYMMDD")
                    )
                      ? scheduledTodoData
                          .get(moment(selectedDate).format("YYYYMMDD"))
                          .map(
                            (categoryData, categoryIndex) =>
                              categoryData.category.id === categoryTag.id && (
                                <DragDropContext
                                  key={categoryIndex}
                                  onDragEnd={onDragEnd(
                                    moment(selectedDate).format("YYYYMMDD"),
                                    categoryIndex
                                  )}
                                >
                                  <Droppable droppableId="droppable">
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                      >
                                        {categoryData.todoList.map(
                                          (todo, todoIndex) => (
                                            <Draggable
                                              key={todo.name}
                                              draggableId={`scheduled_todo-${todo.name}`}
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
                                                    selectedDate={selectedDate}
                                                    categoryIndex={
                                                      categoryIndex
                                                    }
                                                    todoIndex={todoIndex}
                                                    openSideSheet={
                                                      openSideSheet
                                                    }
                                                  />
                                                </ul>
                                              )}
                                            </Draggable>
                                          )
                                        )}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </DragDropContext>
                              )
                          )
                      : null}

                    {categoryTagIndex === focusedCategoryIndex ? (
                      <input
                        type="text"
                        placeholder="ToDo 추가"
                        value={newToDo}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyPress(
                          moment(selectedDate).format("YYYYMMDD"),
                          categoryTagIndex
                        )}
                        onBlur={handleBlur}
                        autoFocus
                      />
                    ) : null}
                  </>
                )
            )}
          </>
        </div>
        <CustomMonthView
          className="w-1/2"
          events={events}
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
        />
      </div>
    </>
  );
}

ScheduledTodo.layout = MainLayout;

export default ScheduledTodo;
