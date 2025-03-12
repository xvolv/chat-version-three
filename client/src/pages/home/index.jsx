import React from "react";
import Header from "./components/header";
import Sidebar from "./components/siderBar";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
