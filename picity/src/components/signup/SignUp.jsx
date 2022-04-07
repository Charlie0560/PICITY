import axios from "axios";
import React, { useRef } from "react";
// import { useState } from "react";
import "./signup.css";
// import { useHistory } from "react-router-dom"

const SignUp = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  // const [loading, setLoading] = useState(false);
  // const [sent, setSent] = useState(false);
  // const [enterotp, setEnterotp] = useState(0);
  // const [tempotp, setTempOtp] = useState(0);

  // const handleSend = async () => {
  //   const text = Math.floor(1000 + Math.random() * 9000);
  //   try {
  //     setTempOtp(text);
  //     console.log(text);
  //     console.log("Sent successfully");
  //     await axios.post("https://picitypeoples.herokuapp.com/sendmail", {
  //       text, mail: email.current.value
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const history = useHistory();

  const signinlocation = () => {
    window.location.replace("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    // if (tempotp === parseInt(enterotp)) {
      const arrpas = password.current.value.split("");
      if (arrpas.length < 6) {
        document.getElementById("errordiv").innerHTML =
          "Password Should be minimum of 6 characters";
      }
      try {
        await axios.post("/auth/register", user);
        window.location.replace("/login");
        // setLoading(false);
      } catch (err) {
        console.log(err);
        document.getElementById("errordiv").innerHTML =
          "Something wents wrong.";
      }
    // } else {
    //   window.alert("wrongOTP");
    // }
  };
  return (
    <div className="signup">
      <div className="container formcontainer">
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <div
          className="errordiv"
          id="errordiv"
          style={{ color: "red", textAlign: "center", fontWeight: "600" }}
        ></div>
        <br />
        <br />
        <center>
          <form
            action="/register"
            className="signupform"
            onSubmit={handleSubmit}
          >
            <div className="uname">
              <label htmlFor="uname">Username</label>
              <br />
              <input type="text" placeholder="Username" ref={username} />
            </div>
            <div className="email my-2">
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" placeholder="*****@ms.pict.edu" ref={email} />
            </div>
            <div className="password">
              <label htmlFor="pass">Password</label>
              <br />
              <input type="password" placeholder="Password" ref={password} />
            </div>
            <br />
            <button
              className="submitbtn"
              type="submit"
              // data-toggle="modal"
              // data-target="#exampleModalCenter"
              // onClick={handleSend}
            >
              {/* {loading ? "loading..." : "Sign Up"} */}
              Sign Up
            </button>
            <br />
            <br />
            Already have an account ?{" "}
            <a href="/login" onClick={signinlocation}>
              Sign In
            </a>
            {/* <div
              className="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="modal-content" style={{ width: "500px" }}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">
                      Enter OTP
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div
                    className="modal-body"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <center>
                      <input
                        type="number"
                        onChange={(e) => {
                          setEnterotp(e.target.value);
                        }}
                        style={{
                          border: "1px solid goldenrod",
                          width: "200px",
                          color: "white",
                          textAlign: "center",
                        }}
                      />
                    </center>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="submitbtn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
          </form>
        </center>
      </div>
    </div>
  );
};

export default SignUp;
