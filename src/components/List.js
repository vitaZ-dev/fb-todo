import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
  console.log("List 렌더링");

  return (
    <div>
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

export default React.memo(List);
