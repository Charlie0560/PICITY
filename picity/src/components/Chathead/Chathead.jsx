import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chathead.css"

export const Chathead = ({ currentchat }) => {
  const { user } = useContext(AuthContext);
  const friendId = currentchat.members.find((m) => m !== user._id);
  const PF = "https://picitypeoples.herokuapp.com/images/";
  const [headuser, setHeadUser] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users?userId=" + friendId);
      setHeadUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, [friendId]);
  // console.log(friendId)
  return <div className="chatheaduser"> <img src={headuser.img ? PF + headuser.img : PF + "defaultprofileimg.png"} alt="" /> <b> {headuser.username}</b></div>;
}; 
