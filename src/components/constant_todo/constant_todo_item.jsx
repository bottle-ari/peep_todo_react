import React, { useState } from "react";
import styled from "styled-components";
import { useConstantTodoContext } from "@/context/constant_todo_context";

function ConstantTodoItem({ categoryIndex, todoIndex, openSideSheet }) {
  const { constantTodoList, setConstantTodoList } = useConstantTodoContext();
  const todo = constantTodoList[categoryIndex].todoList[todoIndex];
  const color = constantTodoList[categoryIndex].category.color;

  const toggleCheck = (categoryIndex, todoIndex) => {
    const updatedConstantTodoList = [...constantTodoList];

    // 완료되지 않은 Todo 일 경우
    if (
      updatedConstantTodoList[categoryIndex].todoList[todoIndex]
        .completed_at === null
    ) {
      // 현재 완료된 날짜 가져오기
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}${month}${day}`;
      updatedConstantTodoList[categoryIndex].todoList[todoIndex].completed_at =
        formattedDate;
    }

    // 완료된 Todo 일 경우
    else {
      updatedConstantTodoList[categoryIndex].todoList[todoIndex].completed_at =
        null;
    }

    setConstantTodoList(updatedConstantTodoList);
  };

  return (
    <li>
      <div className="flex items-center">
        <CheckboxWrapper color={color}>
          <HiddenCheckbox
            type="checkbox"
            checked={todo.completed_at !== null}
            onChange={() => toggleCheck(categoryIndex, todoIndex)}
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

export default ConstantTodoItem;

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
