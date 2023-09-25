import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/routine.module.css";

function RoutinePopUp({ onClosePopUp }) {
  const [activeButton, setActiveButton] = useState(1); // 현재 활성화된 버튼의 인덱스

  const buttonNames = ["매일", "매주", "매월", "매년"];

  const handleClose = () => {
    console.log("routine_pop_up false");
    onClosePopUp(false);
  };

  const handleButtonClick = (index) => {
    // 현재 활성화된 버튼이 있는 경우
    setActiveButton(index);
  };

  return (
    <div className={styles.popup}>
      <div className={styles["popup-content"]}>
        <h1>반복 설정</h1>
        <button onClick={handleClose}>닫기</button>
        <div className={styles["button-container"]}>
          {buttonNames.map((buttonName, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
              className={
                activeButton === index ? styles.active : styles.inactive
              }
            >
              {buttonName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoutinePopUp;
