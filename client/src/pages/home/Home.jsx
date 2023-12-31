import React from "react";
import Navbar from "../../components/Navbar";
import SigninForm from "../../components/SigninForm";
import "./Home.css";
import { useState } from "react";
const Home = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="background">
      <Navbar />
      
    </div>
  );
};

export default Home;
