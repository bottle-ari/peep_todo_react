// ScheduledToDo.jsx
import React, { useState } from "react";
import moment from "moment";
import scheduledDummyData from "../dummyData/scheduledDummyDate.json";

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
    </div>
  );
}

export default ScheduledToDo;
