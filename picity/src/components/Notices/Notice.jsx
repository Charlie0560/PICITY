import React from "react";
import clubs from "../../images/clubs.jpeg";
import opportunities from "../../images/opportunities.jpg";
import "./notices.css";

const Notice = () => {
  const clubsroute = () => {
    window.location.replace("/clubs");
  };
  const opportunitiesroute = () => {
    window.location.replace("/opportunities");
  };
  return (
    <div className="notices">
      <center>
        <div className="card" style={{ width: "20rem" }} onClick={clubsroute}>
          <img className="card-img-top clubsimg" src={clubs} alt="" />
          <div className="card-body">
            <p className="card-text">
              <h5>Clubs</h5>
            </p>
          </div>
        </div>
        <br />
        <div
          className="card"
          style={{ width: "20rem" }}
          onClick={opportunitiesroute}
        >
          <img className="card-img-top clubsimg" src={opportunities} alt="" />
          <div className="card-body">
            <p className="card-text">
              <h5>Opportunities</h5>
            </p>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Notice;
