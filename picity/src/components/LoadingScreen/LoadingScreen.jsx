import React from "react";
import logo from "../../images/PICITY.svg";
import "./loading.css";

const LoadingScreen = () => {
  return (
    <div className="loadingscreen">
      <div className="container">
        <div className="box">
          <img src={logo} alt="" />
        </div>
        {/* <h5>Welcome to the PICITY</h5>
            <h5>The City of Talented Peoples</h5>
            <br />
            <p>Connecting to PICITIANS...</p> */}
        <p>Connecting to PICITIANS...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
