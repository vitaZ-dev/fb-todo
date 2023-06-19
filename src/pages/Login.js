import React, { useState } from "react";
// import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";
import { Button, Checkbox, Form, Input, Modal } from "antd";

const Login = ({ setFBName, setFBEmail, setFBUid }) => {
  // Link, NavLink, useNavigate
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  //////////////////
  // 로그인 - Ant 랑 연결된 곳 아님
  /*
  const handleLogin = async e => {
    e.preventDefault();
    // Firebase 로그인 시도
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
  */
  //////////////////

  // Modal - Ant Design
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);
  // Ant Design
  const onFinish = async values => {
    console.log("Success:", values);
    // Firebase 로그인 시도
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
      console.log("로그인 성공");
      // 로그인 된 사용자 정보를 가지고 온다
      const user = firebase.auth().currentUser;
      console.log(user);
      setFBName(user.displayName);
      setFBEmail(user.email);
      setFBUid(user.uid);
      navigate("/");
    } catch (error) {
      console.warn(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          setModalMessage("올바른 이메일 형식이 아닙니다.");
          break;
        case "auth/missing-email":
          setModalMessage("이메일을 입력해주세요.");
          break;
        case "auth/wrong-password":
          setModalMessage("올바르지 않은 비밀번호입니다.");
          break;
        case "auth/user-not-found":
          setModalMessage("가입되지 않은 사용자입니다.");
          break;
        default:
          setModalMessage("로그인에 실패하였습니다.");
          break;
      }
      showModal();
    }
  };
  const onFinishFailed = errorInfo => {
    // 이 부분은 건드리지 않는 편이...
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-6 m-5 shadow rounded bg-white flex flex-col">
      <h2>Login</h2>

      {/* AntD Modal */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMessage}</p>
      </Modal>

      {/* AntD form */}
      <Form
        name="basic"
        labelCol={{
          span: 8,
          // span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1200,
          // margin: "0 auto",
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요!",
              validator: async (_, password) => {
                if (!password || password.length < 6) {
                  return Promise.reject(new Error("At least 6 passengers"));
                }
              },
            },
          ]}
        >
          <Input.Password minLength={6} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff" }}
          >
            로그인
          </Button>
          <span> {/*공백*/} </span>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>

      {/* <LoginDiv>
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
      </LoginDiv> */}
    </div>
  );
};

export default Login;
