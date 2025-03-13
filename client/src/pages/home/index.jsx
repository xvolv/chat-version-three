import React from "react";
import Header from "./components/header";
import Sidebar from "./components/siderBar";
import ChatArea from "./components/chat";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        <ChatArea />
      </div>
    </div>
  );
};

export default Home;
