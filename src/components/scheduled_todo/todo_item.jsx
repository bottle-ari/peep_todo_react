import React, { useState } from "react";
import styled from "styled-components";
import { useScheduledTodoContext } from "@/context/scheduled_todo_context";
import moment from "moment";
import SubtodoItem from "./subtodo_item";

function TodoItem({ selectedDate, categoryIndex, todoIndex, openSideSheet }) {
  // todo 객체 가져오기
  const { scheduledTodoData, setScheduledTodoData } = useScheduledTodoContext();
  const categoryData = scheduledTodoData.get(
    moment(selectedDate).format("YYYYMMDD")
  )[categoryIndex];
  const todo = categoryData.todoList[todoIndex];
  const color = categoryData.category.color;

  // toggle check
  const toggleCheck = () => {
    const day = moment(selectedDate).format("YYYYMMDD");
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

  /* Sub Todo 보이기 & 숨기기 */
  const [subtodoHide, setSubtodoHide] = useState(false);

  const handleHide = () => {
    const _subtodoHide = subtodoHide;
    setSubtodoHide(!_subtodoHide);
  };

  return (
    <li>
      <div className="flex items-center">
        <CheckboxWrapper color={color}>
          <HiddenCheckbox
            type="checkbox"
            checked={todo.completed_at !== null}
            onChange={toggleCheck}
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

        <span className="ml-5" onClick={handleHide}>
          v
        </span>
      </div>
      {subtodoHide === false && (
        <li className="ml-8">
          {todo.subtodo_list.map((subtodo, subtodoIndex) => (
            <SubtodoItem
              key={subtodoIndex}
              selectedDate={selectedDate}
              categoryIndex={categoryIndex}
              todoIndex={todoIndex}
              subtodoIndex={subtodoIndex}
            />
          ))}
        </li>
      )}
    </li>
  );
}

export default TodoItem;

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
