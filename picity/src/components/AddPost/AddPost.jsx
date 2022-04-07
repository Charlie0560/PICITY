import React, { useRef, useContext, useState } from "react";
import "./addpost.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const desc = useRef();
  const embeddedvideo = useRef();
  const projectLink = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      embeddedvideo: embeddedvideo.current.value,
      projectlink: projectLink.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post("/posts/", newPost);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="postadd">
      <form className="container postcontainer" onSubmit={handleSubmit}>
        <h4>Create a Post</h4>
        <div className="imgcontainer">
          {file && (
            <>
              <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
            </>
          )}
        </div>
        <div className="inputboxes">
          <label htmlFor="fileInput">
            <i class="far fa-image fileInputIcon"></i>
            add a photo
          </label>

          <label htmlFor="videoInput" className="utubelink">
            <i class="fab fa-youtube fileInputIcon"></i>
            <input
              type="text"
              placeholder="Enter YouTube Video Link"
              ref={embeddedvideo}
            />
          </label>
          <label htmlFor="projectLink" className="projectLink">
            <i class="fas fa-link fileInputIcon"></i>
            <input
              type="text"
              placeholder="Enter Your Project Link"
              ref={projectLink}
            />
          </label>
        </div>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* <br /> */}
        <label htmlFor="">Description</label>
        <textarea
          className="createpostdescription"
          type="url"
          ref={desc}
        ></textarea>
        <button type="submit" className="addpostbtn">
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
