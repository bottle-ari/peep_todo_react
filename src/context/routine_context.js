import React, { createContext, useContext, useState, useEffect } from "react";
import routineDummyData from "../data/dummyData/routineDummyData";
import RoutineModel from "@/data/data_classes/RoutineModel";
import CategoryModel from "@/data/data_classes/CategoryModel";

const RoutineContext = createContext();

export const RoutineProvider = ({ children }) => {
  const [routineList, setRoutineList] = useState([]);

  // RoutineList init from .json
  useEffect(() => {
    let initRoutineList = [];
    const routinesFromJson = routineDummyData.content;

    routinesFromJson.map((Routine_data) => {
      const Category = new CategoryModel({
        id: Routine_data.category.id,
        name: Routine_data.category.name,
        emoji: Routine_data.category.emoji,
        color: Routine_data.category.color,
        order: Routine_data.category.order,
        selected: false,
      });
      const Routine = new RoutineModel({
        category: Category,
        category_id: Routine_data.routine.category_id,
        reminder_id: Routine_data.routine.reminder_id,
        name: Routine_data.routine.name,
        is_active: Routine_data.routine.is_active,
        subtodo: Routine_data.routine.subtodo,
        priority: Routine_data.routine.priority,
        order: Routine_data.routine.order,
      });

      initRoutineList = [...initRoutineList, Routine];
    });

    setRoutineList(initRoutineList);
  }, []);

  return (
    <RoutineContext.Provider
      value={{
        routineList,
        setRoutineList,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutineContext = () => {
  return useContext(RoutineContext);
};
