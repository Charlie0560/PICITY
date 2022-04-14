import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import Posts from "../Posts/Posts";
import RightSidebar from "../RightSidebar/RightSidebar";
import "./homepage.css";

const HomePage = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [suggesteduser, setSuggestedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const PF = "https://picitypeoples.herokuapp.com/images/";
  useEffect(() => {
    const fetchPosts = async () => {
      // const res = username
      //   ? await axios.get("/posts/profile/" + username)
      //   : await axios.get("/posts/timeline/" + user._id);
      const res = await axios.get("/posts/");
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const res = await axios.get(`/users/allusers/`);
      setSuggestedUser(res.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div className="homepage row">
      <div className="leftcol col-md-3">
        <LeftSidebar />
      </div>
      <div className="middlecol col-md-6">
        {!username || username === user.username}
        {posts ? (
          posts.map((p) => <Posts posts={p} key={p._id} />)
        ) : (
          <>
            <center>
              <div
                className="container centercontainer"
              >
                <h2>Please follow peoples to view the posts</h2>
              </div>
            </center>
            {loading && (
              <div className="boxcontainer">
                <center>
                  <small>Loading...</small>
                </center>
              </div>
            )}
            <div
              className="container-fluid profilecontainers"
            >
              {/* <h2>Bootstrap Horizontal Scrolling with Flexbox</h2> */}
              <div className="row flex-nowrap">
                {suggesteduser.map((usersinfo) => (
                  <div className="col">
                    <div className="card card-block blockcard">
                      <div className="card profilecard">
                        <center>
                          <img
                            className="card-img-top usersimg"
                            src={
                              usersinfo.img
                                ? PF + usersinfo.img
                                : PF + "defaultprofileimg.png"
                            }
                            alt=""
                          />
                        </center>
                        <div className="card-body">
                          <h4 className="card-title">{usersinfo.username}</h4>
                          <a
                            href={`/profile/${usersinfo.username} `}
                            className="btn profilebtn"
                          >
                            View Profile
                          </a>
                          <div className="userslink">
                            <a href={usersinfo.instagram}>
                              <i className="fab fa-instagram"></i>
                            </a>
                            <a href={usersinfo.github}>
                              <i className="fab fa-github"></i>
                            </a>
                            <a href={usersinfo.linkedIn}>
                              <i className="fab fa-linkedin"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="rightcol col-md-3 ">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
