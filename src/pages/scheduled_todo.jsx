// ScheduledToDo.jsx
import React, { useContext, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MainLayout from "@/components/main_layout";
import { useListContext } from "../context/list_context";

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

const ScheduledToDo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const { scheduledToDoData, setScheduledToDoData } = useListContext();
  const { categoryList, setCategoryList } = useListContext();
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

  const handleAddToDo = (day, categoryTagIndex) => {
    if (newToDo.trim() !== "") {
      const updatedScheduledToDoData = new Map(scheduledToDoData);

      if (updatedScheduledToDoData.has(day)) {
        let newCategoryList = [...updatedScheduledToDoData.get(day)];

        let categoryFound = false;

        for (let i = 0; i < newCategoryList.length; i++) {
          if (newCategoryList[i].name === categoryList[categoryTagIndex]) {
            newCategoryList[i].toDoList.push({ name: newToDo, check: false });
            categoryFound = true;
            break;
          }
        }

        if (!categoryFound) {
          newCategoryList.push({
            name: categoryList[categoryTagIndex],
            toDoList: [{ name: newToDo, check: false }],
          });
        }

        updatedScheduledToDoData.set(day, newCategoryList);
      } else {
        // 선택된 날짜에 ToDo data가 없었다면,
        const newCategoryList = [
          {
            name: categoryList[categoryTagIndex],
            toDoList: [{ name: newToDo, check: false }],
          },
        ];
        updatedScheduledToDoData.set(day, newCategoryList);
      }
      setScheduledToDoData(updatedScheduledToDoData);
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
  };

  const toggleCheck = (day, categoryIndex, toDoIndex) => {
    const updatedScheduledToDoData = new Map(scheduledToDoData);

    const newCategoryList = [...updatedScheduledToDoData.get(day)];
    newCategoryList[categoryIndex] = {
      ...newCategoryList[categoryIndex],
      toDoList: newCategoryList[categoryIndex].toDoList.map((toDo, index) =>
        index === toDoIndex ? { ...toDo, check: !toDo.check } : toDo
      ),
    };

    updatedScheduledToDoData.set(day, newCategoryList);
    setScheduledToDoData(updatedScheduledToDoData);
  };

  // event setting
  useEffect(() => {
    let newEvents = [];

    scheduledToDoData.forEach((value, key) => {
      value.map((category) => {
        const year = parseInt(key.slice(0, 4));
        const month = parseInt(key.slice(4, 6));
        const day = parseInt(key.slice(6, 8));

        newEvents = [
          ...newEvents,
          {
            title: category.name,
            start: new Date(year, month - 1, day),
            end: new Date(year, month - 1, day + 1),
          },
        ];

        setEvents(newEvents);
      });
    });
  }, [scheduledToDoData]);

  return (
    <div>
      <h1>선택한 날짜: {moment(selectedDate).format("YYYYMMDD")}</h1>
      <div>
        {categoryList.map((categoryTag, categoryTagIndex) => (
          <>
            <li
              key={categoryTagIndex}
              onClick={() => handleCategoryClick(categoryTagIndex)}
            >
              {categoryTag + " +"}
            </li>

            {scheduledToDoData.has(moment(selectedDate).format("YYYYMMDD"))
              ? scheduledToDoData
                  .get(moment(selectedDate).format("YYYYMMDD"))
                  .map(
                    (category, categoryIndex) =>
                      category.name == categoryTag && (
                        <ul key={categoryIndex}>
                          {category.toDoList.map((toDo, toDoIndex) => (
                            <li key={toDoIndex}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={toDo.check}
                                  onChange={() =>
                                    toggleCheck(
                                      moment(selectedDate).format("YYYYMMDD"),
                                      categoryIndex,
                                      toDoIndex
                                    )
                                  }
                                />
                                {toDo.name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      )
                  )
              : null}
            {categoryTagIndex === focusedCategoryIndex ? (
              <input
                type="text"
                placeholder="상시ToDo 추가"
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
        events={events}
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
      />
    </div>
  );
};

ScheduledToDo.layout = MainLayout;

export default ScheduledToDo;
