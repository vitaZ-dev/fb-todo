import React, { useEffect } from "react";
import { useState } from "react";
import List from "../components/List";
import Form from "../components/Form";

const Todo = () => {
  // // dummy data (일반변수를 state 변수로)
  // const [todoData, setTodoData] = useState([
  //   // { id: 1, title: "할일 1", completed: true },
  //   // { id: 2, title: "할일 2", completed: false },
  //   // { id: 3, title: "할일 3", completed: false },
  //   // { id: 4, title: "할일 4", completed: false },
  // ]);

  // 로컬 데이터 state 변수
  const initTodoData = localStorage.getItem("fbTodoData")
    ? JSON.parse(localStorage.getItem("fbTodoData"))
    : [];
  const [todoData, setTodoData] = useState(initTodoData);

  // 전체삭제
  const handleRemoveClick = () => {
    setTodoData([]);
    // localStorage 초기화
    localStorage.setItem("fbTodoData", JSON.stringify([]));
  };

  useEffect(() => {
    // axios get 호출 fbtodolist 자료받기
  }, []);

  return (
    <div className="flex items-start justify-center mt-5 w-full">
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className="text-center w-3/4 text-2xl text-red-600 font-semibold">
            Firebase Todo-List
          </h1>
          <button
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]"
            onClick={handleRemoveClick}
          >
            Delete All
          </button>
        </div>
        {/* 할일 목록 */}
        <List todoData={todoData} setTodoData={setTodoData} />
        {/* 할일 추가 */}
        <Form todoData={todoData} setTodoData={setTodoData} />
      </div>
    </div>
  );
};

export default Todo;
