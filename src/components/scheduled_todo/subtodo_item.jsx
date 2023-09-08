import React, { useState } from "react";
import styled from "styled-components";
import { useScheduledTodoContext } from "@/context/scheduled_todo_context";
import moment from "moment";

function ScheduledSubtodoItem({
  selectedDate,
  categoryIndex,
  todoIndex,
  subtodoIndex,
}) {
  const { scheduledTodoData, setScheduledTodoData } = useScheduledTodoContext();

  const categoryData = scheduledTodoData.get(
    moment(selectedDate).format("YYYYMMDD")
  )[categoryIndex];
  const color = categoryData.category.color;
  const todo = categoryData.todoList[todoIndex];
  const subtodoList = todo.subtodo_list;
  const subtodo = subtodoList[subtodoIndex];

  const toggleCheck = (day, categoryIndex, todoIndex, subtodoIndex) => {
    const updatedScheduledTodoData = new Map(scheduledTodoData);
    const newCategoryList = [...updatedScheduledTodoData.get(day)];

    newCategoryList[categoryIndex].todoList[todoIndex].subtodo_list[
      subtodoIndex
    ].check =
      !newCategoryList[categoryIndex].todoList[todoIndex].subtodo_list[
        subtodoIndex
      ].check;

    updatedScheduledTodoData.set(day, newCategoryList);
    setScheduledTodoData(updatedScheduledTodoData);
  };

  return (
    <li>
      <div className="flex items-center">
        <CheckboxWrapper color={color}>
          <HiddenCheckbox
            type="checkbox"
            checked={subtodo.check}
            onChange={() =>
              toggleCheck(
                moment(selectedDate).format("YYYYMMDD"),
                categoryIndex,
                todoIndex,
                subtodoIndex
              )
            }
          />
          <StyledCheckbox color={color} checked={subtodo.check}>
            <Icon viewBox="0 0 18 18">
              <polyline points="3 8 8 13 15 6" />
            </Icon>
          </StyledCheckbox>
        </CheckboxWrapper>

        <span className="ml-2">{subtodo.subTodoName}</span>
      </div>
    </li>
  );
}

export default ScheduledSubtodoItem;

const CheckboxWrapper = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  width: 18px;
  height: 18px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: all 150ms;
  border: 2px solid ${(props) => props.color};
  background: ${(props) => (props.checked ? props.color : "transparent")};
  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
