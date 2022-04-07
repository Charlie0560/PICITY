import React from "react";
import "./welcome.css";
import logo from "../../images/logo.svg";
import "animate.css";

export const Welcome = () => {
  return (
    <div className="container">
      <div className="welcomebox">
        <div className="topcontent">
          <center>
            <p className="headertitle">Welcome to the PICITY</p>
            <img
              className="contentimg animate__animated animate__zoomIn"
              src={logo}
              alt=""
            />
            <br />
            <p className="headertitle">The City of Talented Peoples</p>
            <p className="founder">
              - : Founder : - <br /> Chaitanya Lokhande (Charlie)
            </p>
            {/* <p className="cofounders">
              - : Co-Founders : - <br />
              Tejas Methawade <br />
              Rajas Doshi
            </p> */}
          </center>
        </div>
      </div>
      {/* <div className="middlecontent" id="middlecontent">
      </div> */}
    </div>
  );
};
