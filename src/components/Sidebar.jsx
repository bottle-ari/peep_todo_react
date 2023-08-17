import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useListContext } from "../context/ListContext";
import "../styles/Root.module.css";

const SidebarContainer = styled.div`
  width: 260px;
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20px;
  border-right: 1px solid #ddd;
`;

function Sidebar() {
  const { categoryList, setCategoryList } = useListContext();
  const { flexibleToDoList, setFlexibleToDoList } = useListContext();
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategoryList([...categoryList, newCategory]);
      setFlexibleToDoList([
        ...flexibleToDoList,
        { name: newCategory, toDoList: [] },
      ]);
      setNewCategory("");
    }
  };

  const handleInputChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddCategory();
    }
  };

  return (
    <SidebarContainer>
      <div id="sidebar">
        <div id="userProfile">
          <Image
            src="https://via.placeholder.com/50x50"
            alt="Example Image"
            width={50}
            height={50}
          />
          {"삐약이"}
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/ScheduledToDo">계획된 ToDo</Link>
            </li>
            <li>
              <Link href="/FlexibleToDo">상시 Todo</Link>
            </li>
            <li>
              <Link href="/OverdueToDo">지연된 ToDo</Link>
            </li>
            <li>
              <Link href="/Routine">루틴</Link>
            </li>
            <li>
              <Link href="/Setting">설정</Link>
            </li>
          </ul>
        </nav>
        <hr style={{ borderTop: "1px solid #E2E2E2" }} />
        <ul>
          {categoryList.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
        <hr style={{ borderTop: "1px solid #E2E2E2" }} />
        <div>
          <input
            type="text"
            placeholder="카테고리 추가"
            value={newCategory}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
          />
        </div>
      </div>
      <div id="detail"></div>
    </SidebarContainer>
  );
}

export default Sidebar;
