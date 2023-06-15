import React, { useState } from "react";
import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Link, NavLink, useNavigate
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 로그인
  const handleLogin = e => {
    console.log(e.target);
    // Firebas 로그인 시도
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
