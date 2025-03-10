import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(user);
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
            <Link to="/signup">Login here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
