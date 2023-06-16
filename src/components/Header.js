import React from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../firebase";
const Header = ({
  fbName,
  fbEmail,
  fbUid,
  setFBName,
  setFBEmail,
  setFBUid,
}) => {
  const navigate = useNavigate();
  // fb 로그아웃
  const handleLogout = () => {
    firebase.auth().signOut();
    alert("로그아웃되었습니다");
    console.log("로그아웃");
    setFBName("");
    setFBEmail("");
    setFBUid("");
    navigate("/");
  };

  return (
    <header className="p-7 bg-black">
      <div className="flex flex-wrap align-items-center justify-between">
        <Link to="/" className="text-white hover:text-orange-600">
          로고
        </Link>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link to="/home" className="text-white hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-orange-600">
              About
            </Link>
          </li>
          <li>
            <Link
              to={fbUid ? "/todo" : "/login"}
              className="text-white hover:text-orange-600"
            >
              Todo
            </Link>
          </li>
        </ul>
        <div className="flex justify-center gap-5">
          {fbUid ? (
            <div className="text-white">
              <span className="px-3">
                {fbName} {fbEmail} {fbUid}
              </span>
              <button className="hover:text-green-600" onClick={handleLogout}>
                Logout
              </button>
              <Link to="/mypage" className="hover:text-orange-600 px-3">
                마이페이지
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-orange-600">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-orange-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
