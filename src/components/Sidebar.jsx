import { useState } from "react";
import { useListContext } from "../context/ListContext";
import "../styles/Root.module.css";
import ProfileField from "./sidebar/profile_field";
import MenuField from "./sidebar/menu_field";

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
    <>
      <div id="sidebar">
        <div id="userProfile">
          <ProfileField name={"삐약이"} email={"B_yacc2@naver.com"} />
        </div>
        <nav>
          <ul>
            <li>
              <MenuField
                icon={"/images/icon/note.png"}
                name={"계획된 ToDo"}
                link="/ScheduledToDo"
              />
            </li>
            <li>
              <MenuField
                icon={"/images/icon/stickynote.png"}
                name={"상시 ToDo"}
                link="/FlexibleToDo"
              />
            </li>
            <li>
              <MenuField
                icon={"/images/icon/clock.png"}
                name={"지연된 ToDo"}
                link="/OverdueToDo"
              />
            </li>
            <li>
              <MenuField
                icon={"/images/icon/repeatcircle.png"}
                name={"루틴"}
                link="/Routine"
              />
            </li>
            <li>
              <MenuField
                icon={"/images/icon/setting2.png"}
                name={"설정"}
                link="/Setting"
              />
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
            style={{ width: "219px" }}
            type="text"
            placeholder="카테고리 추가"
            value={newCategory}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
          />
        </div>
      </div>
      <div id="detail"></div>
    </>
  );
}

export default Sidebar;
