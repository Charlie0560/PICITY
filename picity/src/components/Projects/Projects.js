import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./projects.css";

export const Projects = ({ projects }) => {
  const { user: currentUser } = useContext(AuthContext);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/projects/${projects._id}`, {
        data: { userId: projects.userId },
      });
      window.location.reload("/profile");
    } catch (err) {}
  };
  return (
    <div class="">
      <ul className="projectitem">
        <li className="certificates">
          <h4>{projects.title}</h4>
          {currentUser._id === projects.userId && (
            <div className="deleteicon">
              <i class="far fa-trash-alt" onClick={handleDelete}></i>
            </div>
          )}
        </li>
        <small className="descriptionOfProject">{projects.desc}</small>
        <br />
        <br />
        <a href={projects.projectlink}>See Credentials</a>
      </ul>
    </div>
  );
};
