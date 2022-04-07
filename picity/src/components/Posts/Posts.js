import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import TextTruncate from "react-text-truncate";
import "./posts.css";
import { Skeleton } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import { dark } from "@mui/material/styles/createPalette";
// import { Singlepost } from "./Singlepost";
// import {
//   EmailShareButton,
//    FacebookShareButton,
//   InstapaperShareButton,
//   LinkedinShareButton,
//   WhatsappShareButton,
// } from "react-share";

const Posts = ({ posts }) => {
  const [like, setLike] = useState(posts.likes.length);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [postuser, setPostuser] = useState({});
  const PF = "https://picitypeoples.herokuapp.com/images/";
  const { user: currentUser } = useContext(AuthContext);
  const [lines,setLines] = useState(3) 

  useEffect(() => {
    setIsLiked(posts.likes.includes(currentUser._id));
  }, [currentUser._id, posts.likes]);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${posts.userId}`);
      setPostuser(res.data);
      setLoading(false);
    };
    fetchUser();
  }, [posts.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + posts._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${posts._id}`, {
        data: { userId: posts.userId },
      });
      window.location.reload("/profile");
    } catch (err) {}
  };
  // const showmore = () => {
  //   document.getElementById("content").className = "showContent";
  //   document.getElementById("showcase").innerHTML = "";
  // };
  if (posts.embeddedvideo !== null) {
    var videolink = posts.embeddedvideo;
    var splittedcode = videolink.split("/");
    var srcLink = splittedcode[3];
  }
  const showpost = () => {
    window.location.replace(`/addpost/${posts._id}`);
  };

  // const viewsinglepost = ()=>{
  //   window.location.replace(`/viewpost/${posts._id}`);
  // }

  return (
    <div className="posts">
      <ToastContainer />
      <div className="allposts">
        {loading ? (
          <>
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"100%"}
              height={500}
              animation="wave"
              style={{marginTop: '2%'}}
            />
            {/* <br /> */}
          </>
        ) : (
          <div className="post">
            <div className="headerpart">
              <div className="userinfo">
                <div className="userimg">
                  {postuser.img ? (
                    <img src={PF + postuser.img} alt="" />
                  ) : (
                    <img src={PF + "defaultprofileimg.png"} alt="" />
                  )}
                </div>
                <p>
                  <a
                    className="post_username"
                    href={`http://localhost:3000/profile/${postuser.username}`}
                  >
                    {postuser.username}
                  </a>
                </p>
              </div>
              <div className="rightcontents">
                <small>({format(posts.createdAt)})</small>
                {posts.userId === currentUser._id && (
                  <i class="far fa-edit certificateedit" onClick={showpost}></i>
                )}
                {posts.userId === currentUser._id && (
                  <i class="far fa-trash-alt" onClick={handleDelete}></i>
                )}
              </div>
            </div>
            <div
              className="showContent hideContent postdescription"
              id="content"
                style={{ marginBottom: "10px" ,whiteSpace: 'break-spaces'}}
            >
              <TextTruncate
                line={lines}
                element="span"
                truncateText="…"
                text={posts.desc}
                textTruncateChild={
                  <p onClick={()=>setLines(10000)} style={{cursor: 'pointer'}}>
                    <b>Read more</b>
                  </p>
                }
              />
              <br />
              {posts.projectlink && (
                <>
                  {" "}
                  Project Link: -{" "}
                  <a
                    href={posts.projectlink}
                    style={{ color: "lightblue", fontWeight: "bold" }}
                  >
                    {posts.projectlink}
                  </a>
                </>
              )}
            </div>
            {/* <div className="show-more" onClick={showmore}>
            <p id="showcase">
              <b>Show more</b>
            </p>
          </div> */}
            <div className="postimg is-loading" onDoubleClick={likeHandler}>
              <center>
                {posts.img && (
                  <img src={PF + posts.img} className="postedimg" alt="" />
                )}
                {posts.video && (
                  <video
                    src={posts.video}
                    autoPlay
                    className="postedimg"
                    alt=""
                  />
                )}
                {posts.embeddedvideo && (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${srcLink}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    id="myimg"
                  ></iframe>
                )}
              </center>
            </div>
            <div className="postreactions my-1">
              <div className="likes" onClick={likeHandler}>
                <i
                  class={isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}
                  id="likeicon"
                ></i>
                <small className="tags">Likes </small>
                <small>{like}</small>
              </div>
              <div className="comments editbtn btn-open-modal">
                <a href={`/viewpost/${posts._id}`}>
                  <i class="far fa-comment"></i>
                  <small className="tags">Comments</small>
                </a>
              </div>
              <div
                className="share"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.href}viewpost/${posts._id}`
                  );
                  // window.alert("Link Copied")
                  toast("Link Copied" , {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                  })
                }}
              >
                <i class="far fa-share-square"></i>
                <small
                  className="tags"
                >
                  Share
                </small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
