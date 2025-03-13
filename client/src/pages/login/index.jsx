import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "./../../apiCalls/auth";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "./../../redux/loaderSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      dispatch(showLoader());
      const resData = await loginUser(user);
      dispatch(hideLoader());
      if (resData.status === "SUCCESS") {
        toast.success(resData.message);
        localStorage.setItem("token", resData.token);
        window.location.href = "/";
      } else {
        let errorMessage = resData.message || "An unexpected error occurred.";

        toast.error(errorMessage);
      }

      // Check if the error is related to the database
    } catch (error) {
      dispatch(hideLoader());
      const res = "unexpected error occured,please try again later";
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
