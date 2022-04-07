import React, { useState } from "react";
import "./addpost.css";
import axios from "axios";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const UpdatePost = () => {
  const PF = "https://picitypeoples.herokuapp.com/images/";
  const [post, setPost] = useState("");
  const [embedded, setEmbedded] = useState("");
  const [projectlink, setProjectlink] = useState("");
  const [postdesc, setPostDesc] = useState("");
  const postid = window.location.pathname;

  const handleupdate = async (res) => {
    const data = {
      userId: post.userId,
      desc: postdesc,
      embeddedvideo: embedded,
      projectlink: projectlink,
    };
    try {
      await axios.put(`/posts/${post._id}`, data);
      toast("Post has been updated successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: 'dark'
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${postid.split("/")[2]}`);
      setPost(res.data);
    };
    fetchPost();
  }, [postid]);
  return (
    <div className="postadd">
      <ToastContainer />
      <form className="container postcontainer" onSubmit={handleupdate}>
        <h4>Create a Post</h4>
        <div className="imgcontainer">
          {post.img && (
            <>
              <img className="writeImg" src={PF + post.img} alt="" />
            </>
          )}
        </div>
        <div className="inputboxes">
          <label htmlFor="videoInput" className="utubelink">
            {!post.img && (
              <>
                <i class="fab fa-youtube fileInputIcon"></i>
                <input
                  type="text"
                  placeholder="Enter YouTube Video Link"
                  defaultValue={post.embeddedvideo}
                  onChange={(e) => setEmbedded(e.target.value)}
                />
              </>
            )}
          </label>
          <label htmlFor="projectLink" className="projectLink">
            <i class="fas fa-link fileInputIcon"></i>
            <input
              type="text"
              placeholder="Enter Your Project Link"
              defaultValue={post.projectlink}
              onChange={(e) => setProjectlink(e.target.value)}
            />
          </label>
        </div>

        <label htmlFor="">Description</label>
        <textarea
          className="createpostdescription"
          type="url"
          defaultValue={post.desc}
          onChange={(e) => setPostDesc(e.target.value)}
        ></textarea>
        <button type="submit" className="addpostbtn">
          Update
        </button>
      </form>
    </div>
  );
};
