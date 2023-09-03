import React, { useState } from "react";
import styled from "styled-components";
import { useCategoryContext } from "@/context/category_context";

function CategoryItem({ categoryIndex }) {
  const { categoryList, setCategoryList } = useCategoryContext();
  const { selectedCount, setSelectedCount } = useCategoryContext();
  const category = categoryList[categoryIndex];

  const handleSelect = (index) => {
    const updatedCategoryList = [...categoryList];

    // 기존에 선택되지 않은 카테고리가, 선택 될 경우
    if (updatedCategoryList[index].selected == false) {
      setSelectedCount((current) => current + 1);
    }
    // 기존에 선택되어 있던 카테고리가, 선택 취소 될 경우
    else {
      setSelectedCount((current) => current - 1);
    }

    updatedCategoryList[index].selected = !updatedCategoryList[index].selected;
    setCategoryList(updatedCategoryList);
  };

  return (
    <li onClick={() => handleSelect(categoryIndex)}>
      {category.emoji + category.name}
      <input type="checkbox" checked={category.selected}></input>
    </li>
  );
}

export default CategoryItem;
