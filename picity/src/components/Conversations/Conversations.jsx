import { Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";

export default function Conversations({ conversation, currentuser }) {
  const [user, setUser] = useState(null);
  const PF = "https://picitypeoples.herokuapp.com/images/";
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
        <div className="conversationusers" style={{display: 'flex' , justifyContent: 'space-between'}}>
        <div className="chatuserconversation">
          <img
            className="chatuserimg"
            src={user?.img ? PF + user?.img : PF + "defaultprofileimg.png"}
            style={{ width: "40px", height: "40px" }}
            alt=""
          />
          <span className="chatusername">{user?.username}</span>
          {/* <i class="far fa-trash-alt deleteconversation" onClick={handleDelete} style={{marginLeft: '5%'}}></i> */}
        </div>
        <div className="deleteconversation" style={{cursor: 'pointer'}}>
        <i class="far fa-trash-alt deleteconversation" onClick={handleDelete} style={{marginLeft: '5%'}}></i>
        </div>
        </div>
      )}
    </>
  );
}
