import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetLoggedUser from "../users";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getLoggedInUser = async () => {
    let resData;

    try {
      resData = await GetLoggedUser();
      if (resData.status === "SUCCESS") {
        setUser(resData.user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <p>{user?.firstName}</p>
      {children}
    </div>
  );
};

export default ProtectedRoute;
