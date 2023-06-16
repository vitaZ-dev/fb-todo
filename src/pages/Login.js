import React, { useState } from "react";
import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";

const Login = ({ setFBName, setFBEmail, setFBUid }) => {
  // Link, NavLink, useNavigate
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 로그인
  const handleLogin = async e => {
    e.preventDefault();
    // Firebas 로그인 시도
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("로그인 성공");
      // 로그인 된 사용자 정보를 가지고 온다
      const user = firebase.auth().currentUser;
      console.log(user);
      setFBName(user.displayName);
      setFBEmail(user.email);
      setFBUid(user.uid);
      navigate("/");
    } catch (error) {
      console.error(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          alert("올바른 이메일 형식이 아닙니다.");
          break;
        case "auth/missing-email":
          alert("이메일을 입력해주세요.");
          break;
        case "auth/wrong-password":
          alert("올바르지 않은 비밀번호입니다.");
          break;
        case "auth/user-not-found":
          alert("가입되지 않은 사용자입니다.");
          break;
        default:
          alert("로그인에 실패하였습니다.");
          break;
      }
    }
  };
  return (
    <div className="p-6 m-5 shadow rounded bg-white flex flex-col">
      <h2>Login</h2>
      <LoginDiv>
        <form className="shadow bg-white rounded-lg">
          <label htmlFor="">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            maxLength={16}
          />
          <div className="btn-list flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleLogin(e)}
            >
              로그인
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              회원가입
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                console.log("비밀번호 찾기 - 나중에 구현할 예정");
              }}
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </LoginDiv>
    </div>
  );
};

export default Login;
