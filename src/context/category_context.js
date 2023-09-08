// CategoryContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import categoryDummyData from "../data/dummyData/categoryDummyData.json";
import CategoryModel from "@/data/data_classes/CategoryModel";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    // GET 요청을 보낼 URL
    const url = "https://peeptodo.com/api/categories/3";

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
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  // categoryList init from .json
  useEffect(() => {
    let initCategoryList = [];
    const categoriesFromJson = categoryDummyData.categories;

    categoriesFromJson.map((category_data) => {
      const category = new CategoryModel({
        id: category_data.id,
        name: category_data.name,
        color: category_data.color,
        emoji: category_data.emoji,
        order: category_data.order,
        selected: false,
      });

      initCategoryList = [...initCategoryList, category];
    });

    setCategoryList(initCategoryList);
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categoryList,
        setCategoryList,
        selectedCount,
        setSelectedCount,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};
