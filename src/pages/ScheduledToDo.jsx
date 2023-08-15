// ScheduledToDo.jsx
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import scheduledDummyData from "../dummyData/scheduledDummyDate.json";

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

function ScheduledToDo() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const [daysData, setDaysData] = useState(scheduledDummyData.contents);

  const events = [
    {
      title: "test",
      start: new Date(2023, 7, 10),
      end: new Date(2023, 7, 11),
    },
  ];

  return (
    <div>
      <h1>선택한 날짜: {moment(selectedDate).format("YYYYMMDD")}</h1>{" "}
      <div>
        {daysData.map((dayData, index) =>
          dayData.date === moment(selectedDate).format("YYYYMMDD") ? (
            <ul>
              {dayData.categories.map((category, categoryIndex) => (
                <li key={categoryIndex}>
                  {category.categoryName}
                  <ul>
                    {category.todoList.map((toDo, toDoIndex) => (
                      <li key={toDoIndex}>
                        <label>
                          <input
                            type="checkbox"
                            checked={toDo.check}
                            //onChange={}
                          />
                          {toDo.todoName}
                        </label>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : null
        )}
      </div>
      <CustomMonthView
        events={events}
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
      />
    </div>
  );
}

export default ScheduledToDo;
