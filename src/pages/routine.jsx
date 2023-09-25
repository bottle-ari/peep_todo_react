// src/pages/Routine.jsx

import MainLayout from "@/components/main_layout";
import React, { useState } from "react";
import DraggableList from "@/components/routine/draggablelist";
import styles from "@/styles/routine.module.css";
import RoutineSideSheet from "@/components/routine/routine_side_sheet";
import RoutinePopUp from "@/components/routine/routine_pop_up";
import { datetime, RRule, RRuleSet, rrulestr } from "rrule";

function Routine() {
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(-1);
  const [popState, setPopState] = useState(false);

  const rule = (interval) =>
    new RRule({
      freq: RRule.DAILY,
      interval: interval,
      wkst: RRule.MO,
      dtstart: datetime(2023, 7, 1),
      until: datetime(2023, 12, 31),
      tzid: "Asia/Tokyo",
    });

  const handleOpenSideSheet = (index) => {
    setSelectedRoutineIndex(index);
  };

  const handleCloseSideSheet = () => {
    setSelectedRoutineIndex(-1);
  };

  const handleOpenPopUp = (state) => {
    setPopState(state);
    console.log("pop up state: true", state, popState);
  };
  const seeState = () => {
    console.log("see state: true", popState);
  };
  const handleClosePopUp = (state) => {
    setPopState(state);
    console.log("pop up state: false", popState);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        {popState && (
          <div className={styles.popup}>
            <RoutinePopUp onClosePopUp={handleClosePopUp} />
          </div>
        )}
        <div className={styles.leftBox}>
          <DraggableList onOpenSideSheet={handleOpenSideSheet} />
        </div>
        <div>{console.log("rea func: ", rule(3).all())}</div>
        <div className={styles.rightBox}>
          <RoutineSideSheet
            routineIndex={selectedRoutineIndex}
            onClose={handleCloseSideSheet}
            onOpenPopUp={handleOpenPopUp}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Routine;
