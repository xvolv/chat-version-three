import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const onformSubmit = (event) => {
    event.preventDefault();
    console.log(user);
  };
  return (
    <div className="container">
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Create Account</h1>
        </div>
        <div className="form">
          <form onSubmit={onformSubmit}>
            <div className="column">
              <input
                type="text"
                placeholder="First Name"
                value={user.firstName}
                onChange={(event) => {
                  setUser({
                    ...user,
                    firstName: event.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={user.lastName}
                onChange={(event) => {
                  setUser({
                    ...user,
                    lastName: event.target.value,
                  });
                }}
              />
            </div>
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
            <button>Sign Up</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Already have an account?
            <Link to="/login">Login here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
