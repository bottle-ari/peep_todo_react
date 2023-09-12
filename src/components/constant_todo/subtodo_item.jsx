import React, { useState } from "react";
import styled from "styled-components";
import { useConstantTodoContext } from "@/context/constant_todo_context";

function SubtodoItem({ categoryIndex, todoIndex, subtodoIndex }) {
  // subtodo 객체 가져오기
  const { constantTodoList, setConstantTodoList } = useConstantTodoContext();
  const color = constantTodoList[categoryIndex].category.color;
  const todo = constantTodoList[categoryIndex].todoList[todoIndex];
  const subtodoList = todo.subtodo_list;
  const subtodo = subtodoList[subtodoIndex];

  // toggle check
  const toggleCheck = () => {
    const _constantTodoList = [...constantTodoList];
    const _subtodoList =
      _constantTodoList[categoryIndex].todoList[todoIndex].subtodo_list;

    _subtodoList[subtodoIndex].check = !_subtodoList[subtodoIndex].check;

    _constantTodoList[categoryIndex].todoList[todoIndex].subtodo_list =
      subtodoList;
    setConstantTodoList(_constantTodoList);
  };

  return (
    <li>
      <div className="flex items-center">
        <CheckboxWrapper color={color}>
          <HiddenCheckbox
            type="checkbox"
            checked={subtodo.check}
            onChange={toggleCheck}
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

export default SubtodoItem;

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
