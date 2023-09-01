import React, { useState } from "react";
import styled from "styled-components";
import { useScheduledTodoContext } from "@/context/scheduled_todo_context";
import moment from "moment";

function ScheduledTodoItem({
  color,
  todo,
  selectedDate,
  categoryIndex,
  todoIndex,
  openSideSheet,
}) {
  const { scheduledTodoData, setScheduledTodoData } = useScheduledTodoContext();

  const toggleCheck = (day, categoryIndex, todoIndex) => {
    const updatedScheduledTodoData = new Map(scheduledTodoData);

    const newCategoryList = [...updatedScheduledTodoData.get(day)];

    // 완료되지 않은 Todo 일 경우
    if (
      newCategoryList[categoryIndex].todoList[todoIndex].completed_at === null
    ) {
      newCategoryList[categoryIndex].todoList[todoIndex].completed_at = day;
    }

    // 완료된 Todo 일 경우
    else {
      newCategoryList[categoryIndex].todoList[todoIndex].completed_at = null;
    }

    updatedScheduledTodoData.set(day, newCategoryList);
    setScheduledTodoData(updatedScheduledTodoData);
  };

  return (
    <li>
      <div className="flex items-center">
        <CheckboxWrapper color={color}>
          <HiddenCheckbox
            type="checkbox"
            checked={todo.completed_at !== null}
            onChange={() =>
              toggleCheck(
                moment(selectedDate).format("YYYYMMDD"),
                categoryIndex,
                todoIndex
              )
            }
          />
          <StyledCheckbox color={color} checked={todo.completed_at !== null}>
            <Icon viewBox="0 0 24 24">
              <polyline points="5 11 10 16 19 7" />
            </Icon>
          </StyledCheckbox>
        </CheckboxWrapper>

        <span
          className="ml-2 text-lg"
          onClick={() => openSideSheet(categoryIndex, todoIndex)}
        >
          {todo.name}
        </span>
      </div>
    </li>
  );
}

export default ScheduledTodoItem;

const CheckboxWrapper = styled.label`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  width: 24px;
  height: 24px;
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 150ms;
  border: 2px solid ${(props) => props.color};
  background: ${(props) => (props.checked ? props.color : "transparent")};
  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
