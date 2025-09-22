import React, { useState } from "react";
import "../../Styles/global.css";
import logo from "../../assets/kutumbLogo.png";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("user");

  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  const handleRoleToggle = () => {
    setRole(role === "user" ? "admin" : "user");
  };

  return (
    <div className="login-container">
      {/* LOGO SIDE */}
      <div className="left">
        <div className="logo-section">
          <img src={logo} alt="Kutumb Logo" className="logo-img" />
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="login-right">
        {/* Quote */}
        <h2 className="login-quote">
          {/* Home is not a place, it’s a feeling */}
          Welcome To Kutumb
          <br />
          {/* welcome to your digital home. */}
        </h2>

        {/* Role toggle - only visible in signup */}
        {/* {isSignup && (
          <div className="role-toggle">
            <span className={role === "user" ? "active-role" : ""}>User</span>
            <label className="switch">
              <input type="checkbox" onChange={handleRoleToggle} />
              <span className="slider round"></span>
            </label>
            <span className={role === "admin" ? "active-role" : ""}>Admin</span>
          </div>
        )} */}

        <form className="login-form">
          {/* SIGN UP FIELDS */}
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="login-input"
              />
              <input
                type="email"
                placeholder="Email or Phone Number"
                className="login-input"
              />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="login-input"
              />

              {role === "user" && (
                <>
                  <input
                    type="text"
                    placeholder="Family ID"
                    className="login-input"
                  />
                  <input
                    type="date"
                    className="login-input"
                    placeholder="Date of Birth"
                  />
                </>
              )}

              {role === "admin" && (
                <>
                  <input
                    type="text"
                    placeholder="Family Name"
                    className="login-input"
                  />
                  <input
                    type="number"
                    placeholder="Number of Members"
                    className="login-input"
                  />
                </>
              )}
            </>
          )}

          {/* LOGIN FIELDS */}
          {!isSignup && (
            <>
              <input
                type="email"
                placeholder="Email or Phone Number"
                className="login-input"
              />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
              />
            </>
          )}

          {/* BUTTONS */}
          {!isSignup ? (
            <>
              <button type="submit" className="login-button">
                Log In
              </button>
              <div className="or-divider"></div>
              <button
                type="button"
                className="create-button"
                onClick={handleToggle}
              >
                Create New Account
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="create-button">
                Sign Up
              </button>
              <div className="or-divider"></div>
              <button
                type="button"
                className="login-button"
                onClick={handleToggle}
              >
                Back to Login
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
