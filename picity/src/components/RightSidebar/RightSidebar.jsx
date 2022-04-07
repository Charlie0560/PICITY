import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import "./rightsidebar.css";
import { Skeleton } from "@mui/material";

const RightSidebar = () => {
  const [opporutunity, setOpportunity] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOppor = async () => {
      const res = await axios.get("/opportunity/");
      setOpportunity(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setLoading(false);
      console.log(res.data);
    };
    fetchOppor();
  }, []);
  return (
    <div style={{height: '100vh'}}>
      <div className="internships">
        <h3 style={{ display: "flex", justifyContent: "center" }}>Jobs</h3>
        {loading && (
          <>
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"100%"}
              height={175}
            />
            <hr />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"100%"}
              height={175}
            />
            <hr />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"100%"}
              height={175}
            />
            <hr />
          </>
        )}
        {opporutunity.map((o) => (
          <>
            <div className="internship">
              <h5>{o.title}</h5>
              <small>
                {" "}
                <LinesEllipsis
                  text={o.desc}
                  maxLine="4"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                  style={{wordWrap: "break-word"}}
                />
              </small>
              <br />
              <small style={{ float: "right" }} className="moreinfobtn">
                <a href={`/opportunity/${o._id}`}>View</a>
                {/* <a href={o.googlelink}>View</a> */}
              </small>
            </div>
            <br />
          </>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
