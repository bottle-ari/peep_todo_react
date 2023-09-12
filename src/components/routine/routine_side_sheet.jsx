import React, { useState, useEffect, useRef } from "react";
import { useRoutineContext } from "@/context/routine_context";
import { ReactSortable } from "react-sortablejs";

import styles from "@/styles/SideSheet.module.css"; // module.css 파일 임포트
import routineStyles from "@/styles/routine.module.css";

function RoutineSideSheet({ routineIndex, onClose }) {
  const { routineList, setRoutineList } = useRoutineContext();
  const [isNodalVisible, setIsNodalVisible] = useState(false);

  const routine = routineList[routineIndex];

  // 버튼 클릭 시 창 닫습니다.
  const handleClose = () => {
    onClose();
  };

  // 버튼 클릭 시 nodal-sheet의 표시 여부를 토글합니다.
  const handleNodalButtonClick = () => {
    setIsNodalVisible(!isNodalVisible);
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
            <>
              <p>+</p>
              <div>
                <button onClick={handleNodalButtonClick}>반복조건</button>
                {isNodalVisible && (
                  <div className={`${styles["nodal-sheet"]} ${styles.open}`}>
                    {<h>nodal</h> /* nodal-sheet 내용 */}
                    {<h>yha hoo</h>}
                  </div>
                )}
              </div>
              {isNodalVisible ? null : (
                <>
                  <p>중요도: {routine.priority}</p>
                  <p>리마인더: {routine.reminder_id}</p>
                </>
              )}
            </>
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
