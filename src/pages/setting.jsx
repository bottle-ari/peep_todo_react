// src/pages/Setting.jsx
import MainLayout from "@/components/main_layout";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Setting() {
  // --- Mock 데이터
  const [items, setItems] = useState(
    [...Array(4)].map((_, i) => ({ id: `${i}${i}${i}`, content: `item-${i}` }))
  );

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    // 깊은 복사
    //const _items = JSON.parse(JSON.stringify(items));
    const _items = items;
    // 기존 아이템 뽑아내기
    const [targetItem] = _items.splice(source.index, 1);
    // 기존 아이템을 새로운 위치에 삽입하기
    _items.splice(destination.index, 0, targetItem);
    // 상태 변경
    setItems(_items);

    console.log(">>> source", source);
    console.log(">>> destination", destination);
  };

  /*
  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  // --- requestAnimationFrame 초기화 END
  */

  const itemsLog = () => {
    console.log(">>> items", items);
  };

  return (
    <div>
      <button onClick={itemsLog}>items log</button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

Setting.layout = MainLayout;

export default Setting;
