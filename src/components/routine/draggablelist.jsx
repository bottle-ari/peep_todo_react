import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRoutineContext } from "@/context/routine_context";
import RoutineSideSheet from "./routine_side_sheet";
import styles from "@/styles/routine.module.css";

function DraggableList({ onOpenSideSheet }) {
  const { routineList, setRoutineList } = useRoutineContext();
  const [isDragging, setIsDragging] = useState(false);
  const [sideSheetState, setSideSheetState] = useState({
    open: false,
    routineIndex: -1,
  });

  const handleStart = (event) => {
    setSideSheetState((prevSideSheetState) => ({
      ...prevSideSheetState,
      open: true,
      routineIndex: event.oldIndex,
    }));
    onOpenSideSheet(event.oldIndex);
    console.log("Drag started:", event, event.oldIndex);
    // 이벤트 시작 시 필요한 작업을 수행합니다.
  };

  const handleEnd = (event) => {
    setSideSheetState((prevSideSheetState) => ({
      ...prevSideSheetState,
      open: true,
      routineIndex: event.newIndex,
    }));
    onOpenSideSheet(event.newIndex);
    console.log("Drag ended:", event, event.newIndex);
    // 이벤트 종료 시 필요한 작업을 수행합니다.
  };

  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "routineListClicked",
  };

  const onItemClick = (index) => {
    setSideSheetState((prevSideSheetState) => ({
      ...prevSideSheetState,
      open: true,
      routineIndex: index,
    }));
    onOpenSideSheet(index);
    console.log("open?:", sideSheetState.open);
  };

  useEffect(() => {
    console.log("drag stop", sideSheetState.routineIndex, isDragging);

    if (isDragging) {
      setSideSheetState((prevSideSheetState) => ({
        ...prevSideSheetState,
        routineIndex: -1,
      }));
    }
  }, [isDragging]);

  return (
    <div className={styles.container}>
      <ul className={styles.leftBox}>
        <ReactSortable
          list={routineList}
          setList={setRoutineList}
          {...sortableOptions}
          onStart={handleStart}
          onEnd={handleEnd}
        >
          {routineList.map((item, index) => (
            <li
              key={item.uniq_id}
              className={styles["draggable-list-item"]}
              onClick={() => onItemClick(index)}
            >
              <div>Value1: {item.name}</div>
              <div>Value2: {item.category.name}</div>
            </li>
          ))}
        </ReactSortable>
      </ul>
    </div>
  );
}

export default DraggableList;
