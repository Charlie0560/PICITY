import axios from "axios";
import React, { useEffect, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import "./leftsidebar.css";
import { Skeleton } from "@mui/material";

const LeftSidebar = () => {
  const [clubupdates, setClubupdates] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchClubupdate = async () => {
      const res = await axios.get("/clubupdates/");
      setClubupdates(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setLoading(false);
      console.log(res.data);
    };
    fetchClubupdate();
  }, []);
  return (
    <div className="leftsidebar">
      <div className="clubs">
        <h3 style={{ display: "flex", justifyContent: "center" }}>
          Clubs Updates
        </h3>
        {loading && (
          <>
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"100%"}
              height={150}
            />
            <hr />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"100%"}
              height={150}
            />
            <hr />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"100%"}
              height={150}
            />
            <hr />
          </>
        )}
        {clubupdates.map((c) => (
          <>
            <div className="club">
              <h4>{c.clubname}</h4>
              <div className="clubdescription">
                <h6>{c.title}</h6>
                <small>
                  <LinesEllipsis
                    text={c.desc}
                    maxLine="3"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </small>
              </div>
              <small style={{ float: "right" }} className="moreinfobtn">
                <a href={`/clubupdate/${c._id}`}>More Info</a>
              </small>
            </div>
            <hr className="my-4 hrline" />
          </>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
