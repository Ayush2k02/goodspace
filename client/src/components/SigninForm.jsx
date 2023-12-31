import React from "react";
import { useState } from "react";
import logo from "../images/logo.png";
import "./SigninForm.css";
import { axiosInstance } from "../axios";
import { useNavigate } from "react-router-dom";

function Login({ login, setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log("login");
  // };
  const loginHandler = () => {
    setLogin(true);
  };
  const signUpHandler = () => {
    setLogin(false);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/user/signin", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Container">
      <div className="left-wrapper">
        <img className="left-wrapper-image" src={logo} />
        <h1>Welcome To</h1>
        <h1>GoodSpace Communications</h1>
      </div>
      <div>
        <div className="Wrapper">
          <div className="sign-button-wrapper">
            <div className="sign-button" onClick={signUpHandler}>
              Signup
            </div>
            <div> / </div>
            <div className="sign-button" onClick={loginHandler}>
              Login
            </div>
          </div>
          <form className="Form">
            {!login && (
              <input
                className="Input"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            )}
            <input
              className="Input"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              className="Input"
              placeholder="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {!login && (
              <input
                className="Input"
                placeholder="confirm password"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            )}
            {login && (
              <button className="Button" onClick={loginUser}>
                LOGIN
              </button>
            )}
            {!login && <button className="Button">SIGNUP</button>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
