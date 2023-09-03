// ScheduledToDo.jsx
import React, { useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MainLayout from "@/components/main_layout";
import { useCategoryContext } from "@/context/category_context";
import { useScheduledTodoContext } from "@/context/scheduled_todo_context";
import TodoModel from "@/data/data_classes/TodoModel";
import ScheduledTodoSideSheet from "@/components/scheduled_todo/scheduled_todo_side_sheet";
import ScheduledTodoItem from "@/components/scheduled_todo/scheduled_todo_item";

const localizer = momentLocalizer(moment);

function CustomMonthView({ events, selectedDate, onDateClick }) {
  const eventStyleGetter = (event) => {
    if (selectedDate && moment(event.start).isSame(selectedDate, "day")) {
      return { className: "selected-date" };
    }
    return {};
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      views={["month"]}
      defaultView="month"
      selectable
      onSelectSlot={(slotInfo) => onDateClick(slotInfo.start)}
      eventPropGetter={eventStyleGetter}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
}

function ScheduledTodo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const { scheduledTodoData, setScheduledTodoData } = useScheduledTodoContext();
  const { categoryList } = useCategoryContext();
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
          <ScheduledTodoSideSheet
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
          {categoryList.map((categoryTag, categoryTagIndex) => (
            <>
              <li
                key={categoryTagIndex}
                onClick={() => handleCategoryClick(categoryTagIndex)}
              >
                {categoryTag.emoji + categoryTag.name + " +"}
              </li>

              {scheduledTodoData.has(moment(selectedDate).format("YYYYMMDD"))
                ? scheduledTodoData
                    .get(moment(selectedDate).format("YYYYMMDD"))
                    .map(
                      (categoryData, categoryIndex) =>
                        categoryData.category.name == categoryTag.name && (
                          <ul key={categoryIndex}>
                            {categoryData.todoList.map((todo, todoIndex) => (
                              <ScheduledTodoItem
                                selectedDate={selectedDate}
                                categoryIndex={categoryIndex}
                                todoIndex={todoIndex}
                                openSideSheet={openSideSheet}
                              />
                            ))}
                          </ul>
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
          ))}
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
