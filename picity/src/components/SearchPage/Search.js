import React, { useEffect, useState } from "react";
import "./search.css";
import axios from "axios";
export const Search = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const PF = "/api/images/";
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/allusers/`);
      setUser(res.data);
    };
    fetchUser();
  }, []);
  return (
    <>
      <input
        className="searchpagefilter"
        type="text"
        // autoFocus
        // className="form-control searchunit"
        placeholder="Search..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <div className="profilecards container">
        {user
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.username
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return val;
            } else {
              return false;
            }
          })
          .map((usersinfo) => (
            <div className="card profilecard">
              <center>
                <img
                  className="card-img-top usersimg"
                  src={
                    usersinfo.img
                      ? PF + usersinfo.img
                      : PF + "defaultprofileimg.png"
                  }
                  alt=""
                />
              </center>
              <div className="card-body">
                <h4 className="card-title">{usersinfo.username}</h4>
                <a
                  href={`/profile/${usersinfo.username} `}
                  className="btn profilebtn"
                >
                  View Profile
                </a>
                <div className="userslink">
                  <a href={usersinfo.instagram}>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href={usersinfo.github}>
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={usersinfo.linkedIn}>
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
