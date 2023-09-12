// src/pages/Routine.jsx

import MainLayout from "@/components/main_layout";
import React, { useState } from "react";
import DraggableList from "@/components/routine/draggablelist";
import styles from "@/styles/routine.module.css";
import RoutineSideSheet from "@/components/routine/routine_side_sheet";
import { datetime, RRule, RRuleSet, rrulestr } from "rrule";

function Routine() {
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(-1);

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

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <DraggableList onOpenSideSheet={handleOpenSideSheet} />
        </div>
        <div>{console.log("rea func: ", rule(3).all())}</div>
        <div className={styles.rightBox}>
          <RoutineSideSheet
            routineIndex={selectedRoutineIndex}
            onClose={handleCloseSideSheet}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Routine;
