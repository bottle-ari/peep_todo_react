import { useState } from "react";
import ProfileField from "./sidebar/profile_item";
import MenuField from "./sidebar/menu_item";
import { useCategoryContext } from "@/context/category_context";
import CategoryModel from "@/data/data_classes/CategoryModel";
import { useConstantTodoContext } from "@/context/constant_todo_context";
import CategoryItem from "./sidebar/category_item";

function Sidebar() {
  const { categoryList, setCategoryList } = useCategoryContext();
  const { constantTodoList, setConstantTodoList } = useConstantTodoContext();
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== "") {
      const newCategory = new CategoryModel({
        id: categoryList.length + 1,
        name: newCategoryName,
        color: "#FFDD6F",
        emoji: "✔️",
        order: categoryList.length + 1,
        selected: false,
      });
      // category_context 에 new Category 추가
      setCategoryList([...categoryList, newCategory]);
      // constant_todo_context 에 new Category 추가
      setConstantTodoList([
        ...constantTodoList,
        { category: newCategory, todoList: [] },
      ]);
      setNewCategoryName("");
    }
  };

  const handleInputChange = (event) => {
    setNewCategoryName(event.target.value);
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
                link="/scheduled_todo"
              />
            </li>
            <li>
              <MenuField
                icon={"/images/icon/stickynote.png"}
                name={"상시 ToDo"}
                link="/constant_todo"
              />
            </li>
            <li>
              <MenuField
                icon={"/images/icon/clock.png"}
                name={"지연된 ToDo"}
                link="/overdue_todo"
              />
            </li>
            <li>
              <MenuField
                icon={"/images/icon/repeatcircle.png"}
                name={"루틴"}
                link="/routine"
              />
            </li>
            <li>
              <MenuField
                icon={"/images/icon/setting2.png"}
                name={"설정"}
                link="/setting"
              />
            </li>
          </ul>
        </nav>
        <hr style={{ borderTop: "1px solid #E2E2E2" }} />
        <ul>
          {categoryList.map((category, index) => (
            <CategoryItem key={index} categoryIndex={index} />
          ))}
        </ul>
        <hr style={{ borderTop: "1px solid #E2E2E2" }} />
        <div>
          <input
            style={{ width: "219px" }}
            type="text"
            placeholder="카테고리 추가"
            value={newCategoryName}
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
