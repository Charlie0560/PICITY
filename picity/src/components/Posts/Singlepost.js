import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./singlepost.css";
import { AuthContext } from "../../context/AuthContext";
// import TextTruncate from "react-text-truncate";
export const Singlepost = () => {
  const [post, setPost] = useState("");
  const postid = window.location.pathname;
  const [postuser, setPostuser] = useState({});
  const [commentmsg, setCommentmsg] = useState("");
  // const [commentoruser, setCommentoruser] = useState("");
  // const [commentorid, setCommentorid] = useState("");
  const PF = "https://picitypeoples.herokuapp.com/images/";
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${postid.split("/")[2]}`);
      setPost(res.data);
      console.log(res.data);
    };
    fetchPost();
  }, [postid]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setPostuser(res.data);
      // console.log(res.data);
    };
    fetchUser();
  }, [post.userId]);
  const handlecomment = async () => {
    const data = {
      userId: currentUser._id,
      comment: commentmsg,
      username: currentUser.username,
    };
    try {
      await axios.post(`/posts/${post._id}/comment`, data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  try {
    if (post.embeddedvideo !== null) {
      var videolink = post.embeddedvideo;
      var splittedcode = videolink.split("/");
      var srcLink = splittedcode[3];
    }
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="container viewpostpage">
      <div className="postbox">
        <div className="row ">
          {(post.img || post.video || post.embeddedvideo) &&<div className="col-lg-8 col-md-12 postimgbox">
            {post.img && <img src={PF + post.img} alt="" />}
            {post.video && (
              <video src={post.video} autoPlay className="postedimg" alt="" />
            )}
            {post.embeddedvideo && (
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
          </div>}
          <div className={(post.img || post.video || post.embeddedvideo) ? `col-lg-4 col-md-12 postcontents` : `col-md-12 postcontents`} >
            <div className="infosection">
              <h5 style={{color: 'white', padding: '5px'}}>{postuser.username}</h5>
              {/* <div className="menuicon">
                <i class="fas fa-ellipsis-v"></i>
              </div> */}
            </div>
            <hr className="hrline" />
            {!(post.img || post.video || post.embeddedvideo) &&<> <div className="postdesc" style={{ whiteSpace: 'break-spaces'}}> {post.desc}</div> <hr className="hrline" /> </>}
            <div className="commentsbox">
              <div className="singlecomments">
                {post.comments &&
                  post.comments.map((comment) => (
                    <ul className="comments">
                      {/* <li
                        style={
                          comment.commentor === currentUser.username
                            ? { textAlign: "right" }
                            : { textAlign: "left" }
                        }
                      >
                        {comment.commentor}
                      </li>
                      <li className="singlepostcomment"
                        style={
                          comment.commentor === currentUser.username
                            ? { textAlign:"right" }
                            : { textAlign: 'left' }
                        }
                      >
                        {comment.commentmsg}
                      </li> */}
                      <p>
                        <b>{comment.commentor}</b> {comment.commentmsg}
                      </p>
                    </ul>
                  ))}
              </div>
              <br />
              <br />
            </div>
            <div className="inputsection">
              <form action="" onSubmit={handlecomment}>
                <input
                  type="text"
                  onChange={(e) => setCommentmsg(e.target.value)}
                  placeholder="comment..."
                  style={{ color: "white" }}
                />
                <button type="submit">
                  <i class="far fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
