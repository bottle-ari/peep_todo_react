import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useScheduledTodoContext } from "@/context/scheduled_todo_context";
import React, { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);

const MyEvent = ({ event }) => {
  const customStyle = {
    width: event.percent == 0 ? "4px" : event.percent + "%",
    height: "15px",
    backgroundColor: event.color, // 배경색을 커스텀 컬러로 설정
    color: "#00000000", // 텍스트 색상을 투명으로 설정
    borderRadius: "2px", // 모서리를 둥글게 만듭니다.
  };

  return <div style={customStyle}>{event.title}</div>;
};

function CustomMonthView({ selectedDate, onDateClick }) {
  const { scheduledTodoData, setScheduledTodoData } = useScheduledTodoContext();
  const [events, setEvents] = useState([]);

  // event setting
  useEffect(() => {
    let newEvents = [];

    scheduledTodoData.forEach((value, key) => {
      const year = parseInt(key.slice(0, 4));
      const month = parseInt(key.slice(4, 6));
      const day = parseInt(key.slice(6, 8));

      value.map((categoryData) => {
        let todoCount = 0;
        let completedTodoCount = 0;

        categoryData.todoList.map((todo) => {
          todoCount++;
          if (todo.completed_at != null) {
            completedTodoCount++;
          }
        });

        newEvents = [
          ...newEvents,
          {
            title: ".",
            start: new Date(year, month - 1, day),
            end: new Date(year, month - 1, day + 1),
            color: categoryData.category.color,
            percent: (completedTodoCount / todoCount) * 100,
          },
        ];
      });
    });

    setEvents(newEvents);
  }, [scheduledTodoData]);

  const eventPropGetter = (event) => {
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
      eventPropGetter={eventPropGetter}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600, width: 500 }}
      components={{
        event: () => null, // 기본 이벤트 UI 숨기기
        eventWrapper: MyEvent, // 커스텀 이벤트 컴포넌트 사용
      }}
      showAllEvents={true} // 모든 이벤트를 표시합니다
    />
  );
}

export default CustomMonthView;
