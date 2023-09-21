import { useState, useEffect, use } from "react";
import ProfileField from "./sidebar/profile_item";
import MenuField from "./sidebar/menu_item";
import { useCategoryContext } from "@/context/category_context";
import CategoryModel from "@/data/data_classes/CategoryModel";
import { useConstantTodoContext } from "@/context/constant_todo_context";
import CategoryItem from "./sidebar/category_item";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRouter } from "next/router";

function Sidebar() {
  const { categoryList, setCategoryList } = useCategoryContext();
  const { constantTodoList, setConstantTodoList } = useConstantTodoContext();
  const [newCategoryName, setNewCategoryName] = useState("");

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    // 깊은 복사
    //const _items = JSON.parse(JSON.stringify(items));
    const _categoryList = [...categoryList];
    // 기존 아이템 뽑아내기
    const [targetItem] = _categoryList.splice(source.index, 1);
    // 기존 아이템을 새로운 위치에 삽입하기
    _categoryList.splice(destination.index, 0, targetItem);
    // 상태 변경
    setCategoryList(_categoryList);

    console.log(">>> source", source);
    console.log(">>> destination", destination);
  };

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

  /* GET : 요청, profile */
  const [userProfile, setUserProfile] = useState({
    name: "삐약이",
    email: "B_yacc2@naver.com",
    picture: "picture",
  });

  useEffect(() => {
    // GET 요청을 보낼 URL
    const url = "https://peeptodo.com/api/profiles";

    // Fetch API를 사용한 GET 요청
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // JSON 형식의 응답 데이터를 파싱
      })
      .then((data) => {
        console.log(data); // 응답 데이터를 처리
        setUserProfile(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        const router = useRouter();
        router.push("/login");
      });
  }, []);

  return (
    <>
      <div id="sidebar">
        <div id="userProfile">
          <ProfileField
            name={userProfile["name"]}
            email={userProfile["email"]}
            picture={userProfile["picture"]}
          />
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

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                className="categoryDroppable"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {categoryList.map((category, index) => (
                  <Draggable
                    key={category.id}
                    draggableId={`category-${category.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CategoryItem categoryIndex={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
