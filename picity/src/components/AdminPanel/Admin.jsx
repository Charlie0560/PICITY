import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./admin.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const Admin = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [adminselect, setAdminselect] = useState("club");
  const [clubname, setClubname] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [googlelink, setGooglelink] = useState("");
  const handleSubmitclub = async (e) => {
    const clubdata = {
      userId: currentUser._id,
      clubname,
      title,
      desc,
      link,
    };
    try {
      await axios.post("/clubupdates/", clubdata);
      window.location.replace("/")
      console.log("Data updated successfully");
      toast("Data updated successfully" , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmitOppor = async (e) => {
    const oppor = {
      userId: currentUser._id,
      title,
      desc,
      googlelink,
    };
    try {
      await axios.post("/opportunity/", oppor);
      window.location.replace("/")
      console.log("Data updated successfully");
      toast("Data updated successfully" , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="container admincontainer">
        <select
          name="roles"
          id="roles"
          onChange={(e) => setAdminselect(e.target.value)}
          className="customselect"
        >
          <option value="club">Club's Update</option>
          <option value="opportunity">Opportunity</option>
        </select>
      </div>
      <div className="container forms">
        {adminselect === "club" && (
          <form action="" onSubmit={handleSubmitclub}>
            <div className="clubs">
              <label htmlFor="clubname">Club Name</label>
              <br />
              <input
                type="text"
                style={{ color: "white" }}
                onChange={(e) => {
                  setClubname(e.target.value);
                }}
              />
              <br />
              <label htmlFor="sig">Title</label>
              <br />
              <input
                type="text"
                style={{ color: "white" }}
                name="title"
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <br />
              <label htmlFor="desc">Description</label>
              <br />
              <textarea
                name="desc"
                style={{ color: "white" }}
                id="desc"
                rows="5"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
              <br />
              <label htmlFor="Links">Link</label>
              <br />
              <input
                type="text"
                style={{ color: "white" }}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
              <div className="buttons">
                <button className="my-4" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
        {adminselect === "opportunity" && (
          <form action="" onSubmit={handleSubmitOppor}>
            <div className="oppor">
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <br />
              <label htmlFor="desc">Description</label>
              <br />
              <textarea
                name="desc"
                id="desc"
                rows={"10"}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
              <br />
              <label htmlFor="links">Links</label>
              <br />
              <input
                type="text"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
              <br />
              <label htmlFor="embedgoogleform">Google Form Link</label>
              <br />
              <input
                type="text"
                onChange={(e) => {
                  setGooglelink(e.target.value);
                }}
              />
              <div className="buttons">
                <button className="my-4" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
