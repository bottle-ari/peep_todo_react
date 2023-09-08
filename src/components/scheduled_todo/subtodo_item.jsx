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
  // subtodo 객체 가져오기
  const { scheduledTodoData, setScheduledTodoData } = useScheduledTodoContext();
  const categoryData = scheduledTodoData.get(
    moment(selectedDate).format("YYYYMMDD")
  )[categoryIndex];
  const color = categoryData.category.color;
  const todo = categoryData.todoList[todoIndex];
  const subtodoList = todo.subtodo_list;
  const subtodo = subtodoList[subtodoIndex];

  // toggle check
  const toggleCheck = () => {
    const day = moment(selectedDate).format("YYYYMMDD");
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

  /* 클릭 시, subtodo name 수정 기능 */
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(subtodo.subTodoName);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSave = () => {
    // 수정된 내용을 저장
    const day = moment(selectedDate).format("YYYYMMDD");
    const updatedScheduledTodoData = new Map(scheduledTodoData);
    const newCategoryList = [...updatedScheduledTodoData.get(day)];

    newCategoryList[categoryIndex].todoList[todoIndex].subtodo_list[
      subtodoIndex
    ].subTodoName = editedText;

    updatedScheduledTodoData.set(day, newCategoryList);
    setScheduledTodoData(updatedScheduledTodoData);
    // 편집 모드를 종료
    setIsEditing(false);
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
        {isEditing ? (
          // 편집 모드에서는 입력 필드를 표시합니다.
          <input
            className="ml-2"
            type="text"
            value={editedText}
            onChange={handleInputChange}
            onBlur={handleSave}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            autoFocus
          />
        ) : (
          // 편집 모드가 아닐 때는 텍스트를 클릭 가능한 형태로 보여줍니다.
          <span className="ml-2" onClick={handleTextClick}>
            {subtodo.subTodoName}
          </span>
        )}
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
