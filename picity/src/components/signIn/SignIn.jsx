import React from "react";
import "./signin.css";
import { useContext, useRef } from "react";
// import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";

const SignIn = () => {
  // const registerlocation = () => {
  //   window.location.replace("/register");
  // };
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  try {
    axios.create({ baseURL: "https://picitypeoples.herokuapp.com" });
  } catch (err) {
    window.alert(err);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // loginCall(
    //   {
    //     username: username.current.value,
    //     password: password.current.value,
    //   },
    try {
      const res = await axios.post("/auth/login", {
        email: email.current.value,
        password: password.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
      setLoading(false);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(err);
      document.getElementById("errordiv").innerHTML =
        "Please Enter the correct login credentials";
      setLoading(false);
    }
  };
  return (
    <div className="signin">
      <div className="container formcontainer">
        <h1 style={{ textAlign: "center" }}>Sign In</h1>
        <div
          className="errordiv"
          id="errordiv"
          style={{ color: "red", textAlign: "center", fontWeight: "600" }}
        ></div>
        <br />
        <center>
          <form className="signinform" onSubmit={handleSubmit}>
            <div className="uname">
              <label htmlFor="uname">Email</label>
              <br />
              <input type="email" placeholder="Email" ref={email} />
            </div>
            <div className="password my-3">
              <label htmlFor="pass">Password</label>
              <br />
              <input type="password" placeholder="Password" ref={password} />
            </div>
            <br />
            <button type="submit" className="submitbtn">
              {loading ? "loading... " : "Sign In"}
            </button>
            <br />
            <br />
            Don't have an account ?{" "}
            <a href="/register" style={{ color: "aqua" }}>
              Sign Up
            </a>
          </form>
        </center>
      </div>
    </div>
  );
};

export default SignIn;
