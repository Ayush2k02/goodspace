import React from "react";
import Navbar from "../../components/Navbar";
import background from "../../images/background.jpg";
import SigninForm from "../../components/SigninForm";
import "./Signin.css";
import { useState } from "react";

const Signin = () => {
  const [login, setLogin] = useState(true);
  return (
    <div
      className="sign-in-background"
      style={{
        width: "100%",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50% 70%",
        display: "flex",
      }}
    >
      <Navbar />
      <SigninForm login={login} setLogin={setLogin} />
    </div>
  );
};

export default Signin;
