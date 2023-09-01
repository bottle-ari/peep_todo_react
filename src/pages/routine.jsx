// src/pages/Routine.jsx

import MainLayout from "@/components/main_layout";
import React from "react";
import FlyingPeep from "../components/peep_animation";

function Routine() {
  return (
    <div>
      <h1>Routine</h1>
      <FlyingPeep>
      </FlyingPeep>
    </div>
  );
}

Routine.layout = MainLayout;

export default Routine;
