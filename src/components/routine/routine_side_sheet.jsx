import React, { useState, useEffect, useRef } from "react";
import { useRoutineContext } from "@/context/routine_context";
import { ReactSortable } from "react-sortablejs";

import styles from "@/styles/SideSheet.module.css"; // module.css 파일 임포트
import routineStyles from "@/styles/routine.module.css";

function RoutineSideSheet({ routineIndex, onClose, onOpenPopUp }) {
  const { routineList, setRoutineList } = useRoutineContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInputVisible, setInputVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");

  const routine = routineList[routineIndex];
  const inputRef = useRef();

  const [intervalDaily, setIntervalDaily] = useState({
    interval: null,
    interval_to: null,
  });

  const [intervalWeekly, setIntervalWeekly] = useState({
    interval: null,
    interval_to: null,
  });

  const [intervalMonthly, setIntervalMonthly] = useState({
    interval: null,
    interval_to: null,
  });

  const [intervalYearly, setIntervalYearly] = useState({
    interval: null,
    interval_to: null,
  });

  // 숫자 입력을 처리하는 핸들러 함수 (각 버튼별로 별도의 상태를 업데이트)
  const handleNumberChange = (event, intervalSetter) => {
    const value = event.target.value;
    intervalSetter((prevInterval) => ({
      ...prevInterval,
      interval: value,
    }));
  };

  const handleMonthChange = (event, intervalSetter) => {
    const value = event.target.value;
    intervalSetter((prevInterval) => ({
      ...prevInterval,
      interval_to: value,
    }));
  };

  // Enter 키 입력을 처리하는 핸들러 함수
  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      setInputVisible(false);
    }
  };

  // 버튼 클릭 시 창 닫습니다.
  const handleClose = () => {
    onClose();
  };

  // 버튼 클릭 시 modal-sheet의 표시 여부를 토글합니다.
  const handleModalButtonClick = () => {
    console.log("routine_pop_up Modal click");
    onOpenPopUp(true);
  };

  // 입력 클릭 시 input의 표시 여부 토글
  const handleNumberClick = () => {
    setInputVisible(!isInputVisible);
  };

  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    invertSwap: true,
    ghostClass: "ghost",
    group: "routineListClicked",
  };

  const handleEnd = (event) => {
    const clone = JSON.parse(JSON.stringify(routineList));
    console.log("subtodo routine", clone);
    setRoutineList(clone);
  };

  return (
    <div
      className={`${styles["side-sheet"]} ${
        routineIndex !== -1 ? styles.open : ""
      }`}
    >
      {routineIndex !== -1 ? (
        <div className={styles.content}>
          <h1>루틴 상세</h1>
          <ul>
            <ul>{routine && routine.name}</ul>
            <div>
              <ReactSortable
                list={routine.subtodo}
                setList={(subitem) => {
                  var list = routine;
                  list.subtodo = subitem;
                  console.log("copy list", list);
                  setRoutineList(routineList);
                }}
                {...sortableOptions}
                onEnd={handleEnd}
              >
                {routine &&
                  routine.subtodo &&
                  routine.subtodo.map((subitem, subindex) => (
                    <li key={subindex}>
                      <label>
                        <input
                          type="checkbox"
                          checked={false}
                          //onChange={() => handleChange(subtodoIndex)}
                        />
                        {subitem}
                      </label>
                    </li>
                  ))}
              </ReactSortable>
            </div>
          </ul>
          {routine && (
            <div>
              <p>+</p>
              <button onClick={() => handleModalButtonClick()}>반복조건</button>
              <p>중요도: {routine.priority}</p>
              <p>리마인더: {routine.reminder_id}</p>
            </div>
          )}
          <button onClick={handleClose}>Close</button>
        </div>
      ) : (
        <div className={routineStyles.container} />
      )}
    </div>
  );
}

export default RoutineSideSheet;
