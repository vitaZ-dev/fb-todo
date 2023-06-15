import "./App.css";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";

function App() {
  // console.log("App 렌더링");
  return (
    <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
      <Header />
      <div className="container h-full mx-auto">
        <Routes>
          {/* Navigate 를 이용한 강제 이동 */}
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
