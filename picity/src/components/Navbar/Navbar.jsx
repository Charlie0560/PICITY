import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const [users, setUser] = useState([]);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/allusers/`);
      setUser(res.data);
    };
    fetchUser();
  }, []);
  const home = () => {
    window.location.replace("/");
  };
  const addpost = () => {
    window.location.replace("/addpost");
  };
  const chats = () => {
    window.location.replace("/chats");
  };
  const profile = () => {
    window.location.replace("/profile");
  };
  // const settings = () => {
  //   window.location.replace("/settings");
  // };
  const searchpage = () => {
    window.location.replace("/search");
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  };
  const Dashboard = () => {
    window.location.replace("/dashboard");
  };
  const admin = () => {
    window.location.replace("/admin");
  };
  return (
    <div>
      <div className="topbar">
        <div
          className="topbar_brand"
          onClick={home}
          style={{ cursor: "pointer" }}
        >
          <p className="navbar-brand">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            <b className="title">PICITY</b>
          </p>
        </div>
        <div className="search">
          <input
            type="text"
            // autoFocus
            // className="form-control searchunit"
            placeholder="Search..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {/* <i class="fas fa-search"></i> */}
        </div>

        <div className="nav-items">
          <ul className="itemcontents">
            <li className="searchnav" onClick={searchpage}>
              {" "}
              <i class="fas fa-search"></i>
            </li>
            {user.isBoss === true && (
              <li className="logout dashboard" onClick={Dashboard}>
                <i class="fas fa-crown"></i>
              </li>
            )}
            {user.isAdmin === true && (
              <li className="logout dashboard" onClick={admin}>
                <i class="fas fa-user"></i>
              </li>
            )}
            <li className="home">
              <i class="fas fa-home" onClick={home}></i>
            </li>

            <li className="addpost">
              <i class="fas fa-plus-square" onClick={addpost}></i>
            </li>
            <li className="chat">
              <i class="fas fa-comment-dots" onClick={chats}></i>
            </li>
            <li className="profile">
              <i class="fas fa-user-graduate" onClick={profile}></i>
            </li>
            <li className="logout" onClick={logout}>
              <i class="fas fa-sign-out-alt"></i>{" "}
            </li>
          </ul>
        </div>
      </div>
      {searchTerm && (
        <div className="searchusers container">
          {users
            .filter((val) => {
              if (searchTerm === "") {
                return null;
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
              <ul>
                <li>
                  <a
                    href={`http://localhost:3000/profile/${usersinfo.username}`}
                  >
                    {usersinfo.username}
                  </a>
                </li>
              </ul>
            ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
