// src/pages/Routine.jsx

import MainLayout from "@/components/main_layout";
import React from "react";
import FlyingPeep from "../components/peep_animation";
import { useRoutineContext } from "@/context/routine_context";
function Routine() {
  const { routineList, setRoutineList } = useRoutineContext();

  return (
    <div>
      <h1>Routine</h1>
      <FlyingPeep>
        <div>{console.log("Dummy:", routineList)}</div>
      </FlyingPeep>
    </div>
  );
}

Routine.layout = MainLayout;

export default Routine;
