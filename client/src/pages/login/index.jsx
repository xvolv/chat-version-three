import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "./../../apiCalls/auth";
import { toast } from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      const resData = await loginUser(user);
      if (resData.status === "SUCCESS") {
        toast.success(resData.token);
        localStorage.setItem("token", resData.token);
        window.location.href = "/";
      } else {
        let errorMessage = "An unexpected error occurred.";
        // Check if the error is related to the database
        if (resData.message.includes("getaddrinfo ENOTFOUND")) {
          errorMessage =
            "Unable to connect to the server. Please check your network connection.";
        } else {
          errorMessage = resData.message || errorMessage;
        }
        console.log(resData);
        console.log("reached here");
        toast.error(errorMessage);
      }
    } catch (error) {
      const res = "unexpected error occured, try again later please";
      console.log("it reached here,", error);
      toast.error(res);
    }
  };
  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Login Here</h1>
        </div>
        <div className="form">
          <form onSubmit={onFormSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(event) => {
                setUser({
                  ...user,
                  email: event.target.value,
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(event) => {
                setUser({
                  ...user,
                  password: event.target.value,
                });
              }}
            />
            <button>Login</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Don't have an account yet?
            <Link to="/signup">signup here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
