import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Posts from "../Posts/Posts";
import { Certificates } from "../Certificates/Certificates";
import { Experiences } from "../Experiences/Experiences";
import { Projects } from "../Projects/Projects";
import "./usersprofile.css";
import { AuthContext } from "../../context/AuthContext";

export const UsersProfile = () => {
  const [userss, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [followersinfo, setFollowersinfo] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const username = window.location.pathname;
      const users = await axios.get(`/users/profile/${username.split("/")[2]}`);
      setUser(users.data);
      setFollowersinfo(users.data.followers);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/profile/" + userss.username);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [userss.username]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const res = await axios.get("/certificates/profile/" + userss.username);
      setCertificates(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchCertificates();
  }, [userss.username]);
  useEffect(() => {
    const fetchExperience = async () => {
      const res = await axios.get("/experience/profile/" + userss.username);
      setExperience(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchExperience();
  }, [userss.username]);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/projects/profile/" + userss.username);
      setProjects(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchProjects();
  }, [userss.username]);

  function Userskills(props) {
    const skill = props.skills;
    const splittedskills = skill.split(",");
    const mappedskills = splittedskills.map((item) => <li>{item}</li>);
    return mappedskills;
  }
  function Userachievements(props) {
    const achievement = props.achievements;
    const splittedachivements = achievement.split(",");
    const userachievement = splittedachivements.map((achievementitem) => (
      <li>{achievementitem}</li>
    ));
    return userachievement;
  }
  const followhandler = async () => {
    try {
      await axios.put("/users/" + userss._id + "/follow", {
        userId: currentUser._id,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  if (followersinfo.find((element) => element === currentUser._id)) {
    document.getElementById("followStatus").innerHTML = "Unfollow";
  }
  const skills = userss.skills;
  const achievements = userss.achievements;
  const PF = "https://picitypeoples.herokuapp.com/images/";
  return (
    <div>
      <div className="profile">
        <div className="leftcolumn">
          <div className="userinformation">
            {userss.img ? (
              <img src={PF + userss.img} alt="" />
            ) : (
              <img src={PF + "defaultprofileimg.png"} alt="" />
            )}
            <h5 className="my-2">{userss.username} </h5>
            <small>{userss.city}</small>
            <small>{userss.from}</small>
          </div>
          <div className="About">
            <h5>About</h5>
            {userss.about}
          </div>
          <div className="profilelink">
            <label htmlFor="profileLink" className="my-2">
              <h6>Profile Link</h6> <i class="fas fa-link"></i>
              <a href={window.location.href} onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.href}`
                  );
                  window.alert("Link Copied")
                }}>{window.location.href}</a>
            </label>
          </div>
          <div className="portfolioLink profilelink">
            <label htmlFor="portfolioLink" className="my-2">
              <h6>Portfolio Link</h6> <i class="fas fa-user"></i>
              <a href="/">{"http://localhost:3000"}</a>
            </label>
          </div>
          <div className="resumebtn">
            <button
              className="resume followbtn"
              id="followStatus"
              onClick={followhandler}
            >
              Follow
            </button>
          </div>

          <div className="socialicons">
            <div className="instagram">
              <a href={userss.instagram}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="github">
              <a href={userss.github}>
                <i className="fab fa-github"></i>
              </a>
            </div>
            <div className="linkedIn">
              <a href={userss.linkedIn}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="rightcolumn">
          <div className="contentsuserinfo">
            <div className="topside">
              <div className="skills">
                <h5>Skills </h5>
                <ul>{skills && <Userskills skills={skills} />}</ul>
              </div>
              <div className="achievements">
                <h5>Achievements</h5>
                <ul>
                  {achievements && (
                    <Userachievements achievements={achievements} />
                  )}
                </ul>
              </div>
            </div>
            <div className="middleside">
              <div className="certifications my-3">
                <div className="heading">
                  <h5>Certifications </h5>
                </div>
                {certificates.map((c) => (
                  <Certificates Certificates={c} key={c._id} />
                ))}
              </div>
              <div className="certifications my-3">
                <div className="heading">
                  <h5>Experience </h5>
                </div>
                {experience.map((e) => (
                  <Experiences Experiences={e} />
                ))}
              </div>
            </div>

            <div className="bottomside">
              <div className="projects">
                <h5>Projects </h5>
                {projects &&
                  projects.map((p) => <Projects projects={p} key={p._id} />)}
              </div>
            </div>
            <div className="posts">
              <h5>Posts</h5>
              {posts.map((p) => (
                <Posts posts={p} key={p._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
