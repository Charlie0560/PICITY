import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./singleclub.css";
import { AuthContext } from "../../context/AuthContext";
import { Skeleton } from "@mui/material";

const Singleclub = () => {
  const [update, setUpdate] = useState("");
  const { user: currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const updateid = window.location.pathname;
    setLoading(true);
    const fetchupdate = async () => {
      const res = await axios.get("/clubupdates/" + updateid.split("/")[2]);
      setUpdate(res.data);
      setLoading(false);
    };
    fetchupdate();
  }, []);
  const handledelete = async () => {
    try {
      const updateid = window.location.pathname;
      await axios.delete("/clubupdates/" + updateid.split("/")[2]);
      console.log("Deleted successfully");
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="container clubupdatebox">
        <h2 className="my-5" style={{ textAlign: "center" }}>
          {update.clubname}
        </h2>
        {currentUser._id === update.userId && (
          <div className="buttonsdiv">
            <button className="deleteclub" onClick={handledelete}>
              Delete
            </button>
          </div>
        )}

        {/* <br /> */}
        {loading ? (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={"100%"}
            height={"90vh"}
          />
        ) : (
          <div className="updatebox">
            <h3>{update.title}</h3>
            <p><b>Description</b></p>
            <p className="clubdesc">{update.desc}</p>
            <p>
              Link&nbsp;: <a href={update.link}>{update.link}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Singleclub;
