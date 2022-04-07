import "./footer.css";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {
  const { dispatch } = useContext(AuthContext);

  const addpost = () => {
    window.location.replace("/addpost");
  };
  const home = () => {
    window.location.replace("/");
  };
  const chats = () => {
    window.location.replace("/chats");
  };
  const notices = () => {
    window.location.replace("/noticeboard");
  };
  // const settings = ()=>{
  //   window.location.replace("/settings")
  // }
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  };
  window.onscroll = function () {
    myFunction();
  };
  function myFunction() {
    if (
      document.body.scrollTop > 350 ||
      document.documentElement.scrollTop > 350
    ) {
      document.getElementById("footer").className = "disabledfooter";
    } else {
      document.getElementById("footer").className = "footer";
    }
  }
  return (
    <div className="footer" id="footer">
      <div className="nav-items footercontent">
        <ul className="footerUl">
          <li className="chaticon">
            <i class="fas fa-comments" onClick={chats}></i>
          </li>
          <li className="infoicon">
            <i class="fas fa-info-circle" onClick={notices}></i>
          </li>
          <li className="bellicon">
            <i class="fas fa-home" onClick={home}></i>
          </li>
          <li className="addicon">
            <i class="fas fa-plus-square" onClick={addpost}></i>
          </li>
          <li className="settingsicon" onClick={logout}>
            <i class="fas fa-sign-out-alt"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
