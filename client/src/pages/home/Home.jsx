import React from "react";
import Navbar from "../../components/Navbar";
import background from "../../images/background.jpg";
import SigninForm from "../../components/SigninForm";
import "./Home.css";
import { useState } from "react";
const Home = () => {
    const [login, setLogin] = useState(true);
  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
      }}
    >
    <Navbar />
    <SigninForm login={login} setLogin={setLogin}/>
    </div>
  );
};

export default Home;
