import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
  // console.log("List 렌더링");

  return (
    <div>
      {/* todoData > item 가 빈배열일 경우를 체크해야된다? */}
      {todoData.map(item => (
        // key 는 반복분에서 unique 해야한다
        <ListItem
          key={item.id}
          item={item}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      ))}
    </div>
  );
};

// 리랜더링 최적화를 위한 코드
export default React.memo(List);
