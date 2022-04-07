import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Experiences = ({ Experiences }) => {
  const { user: currentUser } = useContext(AuthContext);
  const handleDelete = async () => {
    try {
      await axios.delete(`/experience/${Experiences._id}`, {
        data: { userId: Experiences.userId },
      });
      window.location.reload("/profile");
    } catch (err) {}
  };
  return (
    <div>
      <ul className="certificate">
        <li className="certificates">
          <h4>{Experiences.title}</h4>
          {currentUser._id === Experiences.userId && (
            <div className="deleteicon">
              <i class="far fa-trash-alt" onClick={handleDelete}></i>
            </div>
          )}
        </li>
        <small className="descriptionOfCerti">{Experiences.company}</small>(
        <small>{Experiences.type}</small>)
        <br />
        <p>{Experiences.timeduration}</p>
      </ul>
    </div>
  );
};
