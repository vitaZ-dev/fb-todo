import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
  },
});

/* ************************** */
// Todo Get 기능
const getTodo = async setFunc => {
  try {
    const res = await axiosInstance.get("/todos");
    const result = res.data;
    // 문제점 = true/false 가 문자열로 들어옴!
    const todosArr = result.map(item => {
      // ver1
      // if (item.completed === "true") item.completed = true;
      // else item.completed = false;
      // ver2
      item.id = JSON.parse(item.id);
      item.completed = JSON.parse(item.completed);
      return item;
    });
    setFunc(todosArr);
  } catch (error) {
    console.error(error);
  }
};

// Todo Post 기능
const postTodo = async newTodo => {
  // await axiosInstance
  //   .post("/todos", newTodo)
  //   .then(res => res.data)
  //   .then(data => console.log(data))
  //   .catch(error => console.error(error));

  // try...catch
  try {
    const res = await axiosInstance.post("/todos", newTodo);
    const data = res.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// Todo Patch 기능
const patchTitleTodo = async (_id, editTitle) => {
  // await axiosInstance
  //   .patch(`/todos/${_id}`, { title: editTitle })
  //   .then(res => res.data)
  //   .then(result => console.log(result))
  //   .catch(error => console.error(error));

  // try...catch
  try {
    const res = await axiosInstance.patch(`/todos/${_id}`, {
      title: editTitle,
      completed: false,
    });
    const data = res.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
const patchCompletedTodo = async (_id, item) => {
  try {
    const res = axiosInstance.patch(`todos/${_id}`, {
      completed: item.completed,
    });
    const data = res.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// Todo Delete 기능
const deleteTodo = async _id => {
  // await axiosInstance.delete(`/todos/${_id}`)
  //   .then(res => res.data)
  //   .then(result => console.log(result))
  //   .catch(error => console.error(error));
  // try...catch
  try {
    const res = await axiosInstance.delete(`/todos/${_id}`);
    const data = res.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
const deleteAllTodo = async () => {
  try {
    const res = await axiosInstance.get("/todos");
    const result = res.data;
    // 전체삭제. 미리 만들었던 deleteTodo 사용
    result.forEach(item => {
      deleteTodo(item.id);
    });
  } catch (error) {
    console.error(error);
  }
};

export {
  axiosInstance,
  getTodo,
  postTodo,
  patchTitleTodo,
  patchCompletedTodo,
  deleteTodo,
  deleteAllTodo,
};
