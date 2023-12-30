import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SigninForm.css";
function Login({ login, setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    console.log("login");
  };
  const loginHandler = () => {
    setLogin(true);
  };
  const signUpHandler = () => {
    setLogin(false);
  };
  return (
    <div className="Container">
      <div className="Wrapper">
        <button className="Title" onClick={signUpHandler}>
          SIGNUP
        </button>
        <button className="Title" onClick={loginHandler}>
          LOGIN
        </button>
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
            <button className="Button" onClick={handleClick}>
              LOGIN
            </button>
          )}
          {!login && (
            <button className="Button" onClick={handleClick}>
              SIGNUP
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
