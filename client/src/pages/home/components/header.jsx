import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user?.user);

  function getFullName() {
    if (!user) return "";
    let fName =
      user?.firstName.charAt(0).toUpperCase() +
      user?.firstName.slice(1).toLowerCase();
    let lName =
      user?.lastName.charAt(0).toUpperCase() +
      user?.lastName.slice(1).toLowerCase();
    return fName + " " + lName;
  }
  function shortName() {
    if (!user) return "";
    let fName = user?.firstName.toUpperCase()[0];
    let lName = user?.lastName.charAt(0).toUpperCase()[0];
    return fName + lName;
  }
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">{getFullName()}</div>
        <div className="logged-user-profile-pic">{shortName()}</div>
      </div>
    </div>
  );
};

export default Header;
