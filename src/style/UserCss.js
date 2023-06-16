import styled from "@emotion/styled";

const SignUpDiv = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
    gap: 10px 0;

    label {
      background-color: chartreuse;
      display: block;
      width: 30%;
      font-weight: 700;
    }
    input {
      display: block;
      width: 70%;
      border: 1px solid #ddd;
    }
    /* .btn-list {
      display: flex;
      justify-content: center;
      gap: 10px;
      width: 100%;
      text-align: center;
    } */
  }
`;

export const MyPageDiv = styled.div`
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
    gap: 10px 0;

    div {
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      label {
        background-color: yellowgreen;
        display: block;
        width: 15%;
        font-weight: 700;
      }
      input {
        display: block;
        width: 70%;
        border: 1px solid #ddd;
      }
      > button {
        background-color: lightpink;
      }
    }
  }
`;

export const LoginDiv = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;
    gap: 10px 0;

    label {
      background-color: chartreuse;
      display: block;
      width: 30%;
      font-weight: 700;
    }
    input {
      display: block;
      width: 70%;
      border: 1px solid #ddd;
    }
  }
`;

export default SignUpDiv;
