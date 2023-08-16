import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "../styles/Root.module.css";

const SidebarContainer = styled.div`
  width: 260px;
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20px;
  border-right: 1px solid #ddd;
`;

const Sidebar = () => {
  const [categorys, setCategorys] = useState([]);

  const addCategorys = () => {
    setCategorys((currentArray) => ["newCategory", ...currentArray]);
  };

  return (
    <SidebarContainer>
      <div id="sidebar">
        <div id="userProfile">
          <Image src="https://placehold.it/50x50" alt = "[img]"/>
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
          {categorys.map((category, index) => (
            <li key={index}>
              {category} {index}
            </li>
          ))}
        </ul>
        <hr style={{ borderTop: "1px solid #E2E2E2" }} />
        <div onClick={addCategorys}>새 카테고리 추가</div>
      </div>
      <div id="detail"></div>
    </SidebarContainer>
  );
};

export default Sidebar;
