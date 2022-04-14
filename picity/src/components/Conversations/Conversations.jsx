import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";

export default function Conversations({ conversation, currentuser }) {
  const [user, setUser] = useState(null);
  const PF = "/api/images/";
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentuser._id);

    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentuser, conversation]);
  const handleDelete = async()=>{
    await axios.delete("/conversations/"+conversation._id);
    // window.alert("Conversation deleted successfully");
    window.location.reload();
  }
  return (
    <>
      {loading ? (
        <>
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={"100%"}
            height={"60px"}
          />
          <br />
        </>
      ) : (
        <div className="conversationusers">
        <div className="chatuserconversation">
          <img
            className="chatuserimg"
            src={user?.img ? PF + user?.img : PF + "defaultprofileimg.png"}
            alt="userimg"
          />
          <span className="chatusername">{user?.username}</span>
          {/* <i className="far fa-trash-alt deleteconversation" onClick={handleDelete}></i> */}
        </div>
        <div className="deleteconversation" >
        <i className="far fa-trash-alt deleteconversation" onClick={handleDelete}></i>
        </div>
        </div>
      )}
    </>
  );
}
