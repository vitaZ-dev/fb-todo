import "./App.css";
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";

function App() {
  // console.log("App 렌더링");
  // 추후에 Redux/Recoil state 로 관리 필요
  const [fbName, setFBName] = useState();
  const [fbEmail, setFBEmail] = useState();
  const [fbUid, setFBUid] = useState();
  console.log(fbName, fbEmail, fbUid);
  return (
    <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
      <Header
        fbName={fbName}
        fbEmail={fbEmail}
        fbUid={fbUid}
        setFBName={setFBName}
        setFBEmail={setFBEmail}
        setFBUid={setFBUid}
      />
      <div className="container h-full mx-auto">
        <Routes>
          {/* Navigate 를 이용한 강제 이동 */}
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/login"
            element={
              <Login
                setFBName={setFBName}
                setFBEmail={setFBEmail}
                setFBUid={setFBUid}
              />
            }
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/todo"
            element={<Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid} />}
          ></Route>
          <Route
            path="/mypage"
            element={
              <MyPage
                fbName={fbName}
                fbEmail={fbEmail}
                fbUid={fbUid}
                setFBName={setFBName}
                setFBEmail={setFBEmail}
                setFBUid={setFBUid}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
