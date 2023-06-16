import React, { useEffect, useState } from "react";
import { MyPageDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";

// 마이페이지 = 회원탈퇴 및 회원정보수정
const MyPage = ({
  fbName,
  fbEmail,
  fbUid,
  setFBName,
  setFBEmail,
  setFBUid,
}) => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState(fbName);
  const [email, setEmail] = useState(fbEmail);
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  // 로그인 한 사람만 이 페이지에 들어올 수 있다
  useEffect(() => {
    if (!fbUid) {
      alert("로그인하세요");
      navigate("/");
    }
  });

  // FB 의 사용자정보 객체
  const user = firebase.auth().currentUser;
  const handlerNickName = async e => {
    e.preventDefault();
    try {
      await user.updateProfile({
        displayName: nickName,
      });
      setFBName(nickName);
      setNickName(nickName);
      alert("닉네임 정보를 변경하였습니다");
    } catch (error) {
      console.error(error);
    }
  };
  const handlerEmail = async e => {
    e.preventDefault();
    try {
      await user.updateEmail(email);
      setFBEmail(email);
      setEmail(email);
      alert("이메일 정보를 변경하였습니다");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("The email address is alrxeady in use");
          break;
        case "auth/invalid-email":
          alert("The email address is not valid.");
          break;
        default:
          alert("이메일을 확인해 주세요.");
          break;
      }
    }
  };
  const handlerPassword = async e => {
    e.preventDefault();
    try {
      await user.updatePassword(pw);
      alert("비밀번호를 변경하였습니다");
    } catch (error) {
      if (error.code == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert("비밀번호 다시 입력해 주세요.");
      }
    }
  };
  const handlerDelete = async e => {
    e.preventDefault();
    try {
      await user.delete();
      console.log("회원탈퇴!");
      setFBName("");
      setFBEmail("");
      setFBUid("");
      alert("회원탈퇴!");
      navigate("/");
    } catch (error) {
      console.error(error.code);
    }
  };
  return (
    <div className="p-6 m-5 shadow rounded bg-white flex flex-col">
      <h2>MyPage</h2>
      <MyPageDiv>
        <form>
          <div>
            <label htmlFor="">닉네임</label>
            <input
              type="text"
              required
              value={nickName}
              onChange={e => setNickName(e.target.value)}
              minLength={2}
              maxLength={10}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerNickName}
            >
              닉네임 변경
            </button>
          </div>

          <div>
            <label htmlFor="">이메일</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerEmail}
            >
              이메일 변경
            </button>
          </div>

          <div>
            <label htmlFor="">비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
              minLength={8}
              maxLength={16}
            />
            <label htmlFor="">비밀번호 확인</label>
            <input
              type="password"
              value={pwConfirm}
              onChange={e => {
                setPwConfirm(e.target.value);
              }}
              required
              minLength={8}
              maxLength={16}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerPassword}
            >
              비밀번호 변경
            </button>
          </div>

          <div className="btn-list flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerDelete}
            >
              회원탈퇴
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
            >
              취소
            </button>
          </div>
        </form>
      </MyPageDiv>
    </div>
  );
};

export default MyPage;
