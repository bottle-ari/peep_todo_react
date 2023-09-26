import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const MyEvent = ({ event }) => {
  const customStyle = {
    width: event.percent + "%",
    backgroundColor: event.color, // 배경색을 커스텀 컬러로 설정
    color: "#00000000", // 텍스트 색상을 흰색으로 설정
  };

  return <div style={customStyle}>{event.title}</div>;
};

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
      style={{ height: 600, width: 500 }}
      components={{
        event: MyEvent, // 커스텀 이벤트 컴포넌트를 사용
        eventWrapper: MyEvent,
      }}
    />
  );
}

export default CustomMonthView;
