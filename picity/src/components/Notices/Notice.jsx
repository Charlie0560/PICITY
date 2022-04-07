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
        <div class="card" style={{ width: "20rem" }} onClick={clubsroute}>
          <img class="card-img-top clubsimg" src={clubs} alt="" />
          <div class="card-body">
            <p class="card-text">
              <h5>Clubs</h5>
            </p>
          </div>
        </div>
        <br />
        <div
          class="card"
          style={{ width: "20rem" }}
          onClick={opportunitiesroute}
        >
          <img class="card-img-top clubsimg" src={opportunities} alt="" />
          <div class="card-body">
            <p class="card-text">
              <h5>Opportunities</h5>
            </p>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Notice;
