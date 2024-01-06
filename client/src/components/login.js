import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context"; // Add this
import "./login.css";
const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState(""); // Add this
  const [password, setPassword] = useState(""); // Add this

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      setIsAuthenticated(true);
      toast.success(`Welcome! ${data.name}. Please wait...`, {
        duration: 5000,
        isClosable: true,
        position: toast.POSITION.TOP_CENTER,
      });

      localStorage.setItem("user", JSON.stringify(data));

      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      console.log(error.response.data.error);
      setIsAuthenticated(false);
      toast.error(error.response.data.error, {
        duration: 5000,
        isClosable: true,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <div className="navbar"></div>
      <div className="register-container background">
        <div className="left">
          <div>
            <div className="image" />
            <div>Welcome to</div>
            <div>Goodspace Communincations</div>
          </div>
        </div>
        <div className="right">
          <div className="wrapper">
            <form className="form" onSubmit={handleLogin}>
              <label htmlFor="email">Provide your email</label>
              <input
                type="email"
                name="email"
                className="input"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label htmlFor="password">Enter your password</label>
              <input
                type="password"
                className="input"
                name="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button-container">
                <button type="submit" className="btn">
                  Log In
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    console.log("nav to loggiinn");
                    navigate("/register");
                  }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
