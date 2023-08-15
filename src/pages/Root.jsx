//Root.tsx

import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Root.css"; // Root.css 파일 불러오기
import SidebarItem from "../components/SidebarItem";
import SidebarCategory from "../components/SidebarCategory";

export default function Root() {
  const [categorys, setCategorys] = useState([]);

  const addCategorys = () => {
    setCategorys((currentArray) => ["newCategory", ...currentArray]);
  };

  return (
    <>
      <div id="sidebar">
        <div id="userProfile">
          <img src="http://placehold.it/50x50" />
          {"삐약이"}
        </div>
        <nav>
          <ul>
            <SidebarItem to={`/`} text="계획된 ToDo" />
            <SidebarItem to={`/flexibleToDo`} text="유연한 ToDo" />
            <SidebarItem to={`/overdueToDo`} text="지연된 ToDo" />
            <SidebarItem to={`/routine`} text="루틴" />
            <SidebarItem to={`/setting`} text="설정" />
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
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
