import React, { useContext, useState } from "react";
import "./profile.css";
// import userimg from "../../images/clubs.jpeg";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import Posts from "../Posts/Posts";
import { Certificates } from "../Certificates/Certificates";
import { Experiences } from "../Experiences/Experiences";
import { Projects } from "../Projects/Projects";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [upusername, setUpusername] = useState();
  const [file, setFile] = useState("");
  const [upbio, setUpbio] = useState();
  const [upabout, setUpabout] = useState();
  const [upinsta, setUpinsta] = useState();
  const [upskills, setUpskills] = useState();
  const [upachivements, setUpachivements] = useState();
  const [upgit, setUpgit] = useState();
  const [uplinkedin, setUplinkedin] = useState();
  const [certificates, setCertificates] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [url, setUrl] = useState();
  const [exptitle, setExptitle] = useState();
  const [type, setType] = useState();
  const [company, setCompany] = useState();
  const [duration, setDuration] = useState();
  const [projectitle, setProjecttitle] = useState();
  const [projectdesc, setProjectDesc] = useState();
  const [projectUrl, setProjectUrl] = useState();
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/profile/" + user.username);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user.username]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const res = await axios.get("/certificates/profile/" + user.username);
      setCertificates(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchCertificates();
  }, [user.username]);
  useEffect(() => {
    const fetchExperience = async () => {
      const res = await axios.get("/experience/profile/" + user.username);
      setExperience(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchExperience();
  }, [user.username]);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get("/projects/profile/" + user.username);
      setProjects(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchProjects();
  }, [user.username]);

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
  const skills = user.skills;
  const achievements = user.achievements;
  const handleupdate = async (res) => {
    const updatedData = {
      userId: user._id,
      username: upusername,
      bio: upbio,
      about: upabout,
      instagram: upinsta,
      github: upgit,
      linkedIn: uplinkedin,
      skills: upskills,
      achievements: upachivements,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      console.log(fileName);
      data.append("name", fileName);
      data.append("file", file);
      updatedData.img = fileName;
      console.log(updatedData);
      try {
        await axios.post("/upload", data);
        // await axios.post("/users/" + user._id, data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put("/users/" + user._id, updatedData);
      // window.alert(
      //   "Profile has been updated successfully, Please relogin to your account to view the changes."
      // );
      // res.status(200).json(updatedUser);
      toast.success("Profile has been updated successfully, Please relogin to your account to view the changes." , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  const handleCreateCertificate = async (res) => {
    const data = {
      userId: user._id,
      title: title,
      date: date,
      url: url,
    };
    try {
      await axios.post("/certificates", data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreateExperience = async (res) => {
    const data = {
      userId: user._id,
      title: exptitle,
      type: type,
      company: company,
      timeduration: duration,
    };
    try {
      await axios.post("/experience", data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreateProject = async (res) => {
    const data = {
      userId: user._id,
      title: projectitle,
      desc: projectdesc,
      projectlink: projectUrl,
    };

    try {
      await axios.post("/projects", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile">
      <ToastContainer/>
      <div className="leftcolumn">
        <div className="userinformation">
          {user.img ? (
            <img
              src={`https://picitypeoples.herokuapp.com/images/${user.img}`}
              alt="profile pic"
            />
          ) : (
            <img
              src={`https://picitypeoples.herokuapp.com/images/defaultprofileimg.png`}
              alt="profile pic"
            />
          )}
          <h5 className="my-2">
            {user.username}{" "}
            <button
              className="editbtn btn-open-modal"
              data-toggle="modal"
              data-target="#modal-fullscreen-xl"
            >
              <i
                class="far fa-edit editskills"
                style={{ float: "right", paddingRight: "5%" }}
              ></i>
            </button>
          </h5>
          <small>{user.city}</small>
          <small>{user.from}</small>
          <small>{user.bio}</small>
        </div>
        <div className="About">
          <h6>About</h6>
          {user.about}
        </div>
        <div className="profilelink">
          <label htmlFor="profileLink" className="my-2">
            <p>Profile Link</p> <i class="fas fa-link"></i>
            <a href="/">{"http://localhost:3000"}</a>
          </label>
        </div>
        <div className="portfolioLink profilelink">
          <label htmlFor="portfolioLink" className="my-2">
            <p>Portfolio Link</p> <i class="fas fa-user"></i>
            <a href="/">{"http://localhost:3000"}</a>
          </label>
        </div>
        <div className="resumebtn">
          <button className="resume" onClick={()=>(window.location.replace('/resume'))}>Create a Resume</button>
        </div>

        <div className="socialicons">
          <div className="instagram">
            <a href={user.instagram}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="github">
            <a href={user.github}>
              <i className="fab fa-github"></i>
            </a>
          </div>
          <div className="linkedIn">
            <a href={user.linkedIn}>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="rightcolumn">
        <div className="contentsuserinfo">
          <div className="topside">
            <div className="skills">
              <h5>
                Skills{" "}
                <button
                  className="editbtn btn-open-modal"
                  data-toggle="modal"
                  data-target="#skillachieve"
                >
                  <i
                    class="far fa-edit editskills"
                    style={{ float: "right", paddingRight: "5%" }}
                  ></i>
                </button>
              </h5>
              <ul>
                {skills ? (
                  <Userskills skills={skills} />
                ) : (
                  <p className="defaulttext">Add Skills</p>
                )}
              </ul>
            </div>
            <div className="achievements">
              <h5>
                Achievements
                <button
                  className="editbtn btn-open-modal"
                  data-toggle="modal"
                  data-target="#skillachieve"
                >
                  <i
                    class="far fa-edit editskills"
                    style={{ float: "right", paddingRight: "5%" }}
                  ></i>
                </button>
              </h5>
              <ul>
                {achievements ? (
                  <Userachievements achievements={achievements} />
                ) : (
                  <p className="defaulttext">Add Achivements</p>
                )}
              </ul>
            </div>
          </div>
          <div className="middleside">
            <div className="certifications my-3">
              <div className="heading">
                <h5>Certifications </h5>
                <button
                  className="editbtn btn-open-modal"
                  data-toggle="modal"
                  data-target="#certificates"
                >
                  <i
                    class="fas fa-plus"
                    style={{ float: "right", paddingRight: "5%" }}
                  ></i>
                </button>
              </div>
              {certificates.map((c) => (
                <Certificates Certificates={c} key={c._id} />
              ))}
            </div>
            <div className="certifications my-3">
              <div className="heading">
                <h5>Experience </h5>
                <button
                  className="editbtn btn-open-modal"
                  data-toggle="modal"
                  data-target="#experience"
                >
                  <i
                    class="fas fa-plus"
                    style={{ float: "right", paddingRight: "5%" }}
                  ></i>
                </button>
              </div>
              {experience.map((e) => (
                <Experiences Experiences={e} />
              ))}
            </div>
          </div>

          <div className="bottomside">
            <div className="projects">
              <h5>
                Projects{" "}
                <button
                  className="editbtn btn-open-modal"
                  data-toggle="modal"
                  data-target="#projects"
                >
                  <i
                    class="fas fa-plus"
                    style={{ float: "right", paddingRight: "5%" }}
                  ></i>
                </button>
              </h5>
              {/* <UserProjects projects = {projects}/> */}
              {projects.map((p) => (
                <Projects projects={p} key={p._id} />
              ))}
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
      <div
        class="modal modal-fullscreen-xl"
        id="modal-fullscreen-xl"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 class="modal-title">Profile</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleupdate}>
              <div className="modal-body">
                <div className="profileimg">
                  <center>
                    <div
                      className="img"
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {file ? (
                        <>
                          <img
                            className="writeImg"
                            src={URL.createObjectURL(file)}
                            alt=""
                            style={{ width: "100%" }}
                          />
                        </>
                      ) : (
                        <img
                          className="writeImg"
                          src={`http://localhost:5000/images/${user.img}`}
                          alt=""
                          style={{ width: "100%" }}
                        />
                      )}
                    </div>
                    <br />
                    <label htmlFor="fileInput" style={{ color: "white" }}>
                      <i class="far fa-image fileInputIcon"></i>
                      add a photo
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={(e) => setFile(e.target.files[0])}
                      className="my-2 inputfile"
                    />
                  </center>
                </div>
                <div className="personalinfo">
                  <label htmlFor="username">Username</label>
                  <input
                    className="inputprofile"
                    type="text"
                    name="username"
                    placeholder="Username"
                    id="username"
                    defaultValue={user.username}
                    onChange={(e) => {
                      setUpusername(e.target.value);
                    }}
                  />
                  <label htmlFor="bio">Bio</label>
                  <input
                    className="inputprofile"
                    type="text"
                    name="bio"
                    id="bio"
                    defaultValue={user.bio}
                    onChange={(e) => {
                      setUpbio(e.target.value);
                    }}
                  />
                  <label htmlFor="about">About</label>
                  <textarea
                    type="text"
                    name="about"
                    id="about"
                    defaultValue={user.about}
                    onChange={(e) => {
                      setUpabout(e.target.value);
                    }}
                  />
                  <label htmlFor="instagram">Instagram</label>
                  <input
                    className="inputprofile"
                    type="text"
                    name="instagram"
                    defaultValue={user.instagram}
                    onChange={(e) => {
                      setUpinsta(e.target.value);
                    }}
                  />
                  <label htmlFor="github">Github</label>
                  <input
                    className="inputprofile"
                    type="text"
                    name="github"
                    defaultValue={user.github}
                    onChange={(e) => {
                      setUpgit(e.target.value);
                    }}
                  />
                  <label htmlFor="linkedin">LinkedIN</label>
                  <input
                    className="inputprofile"
                    type="text"
                    name="linkedin"
                    defaultValue={user.linkedIn}
                    onChange={(e) => {
                      setUplinkedin(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="skillachieve"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Skills and Achievements
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="" onSubmit={handleupdate}>
              <div className="modal-body skillachivemodal">
                <div className="modelskills">
                  <h3>Skills</h3>
                  {/* <UpdateSkills skills={skills} /> */}
                  <input
                    type="text"
                    className="w-100"
                    defaultValue={user.skills}
                    placeholder="eg. HTML,CSS,Javascript,C++"
                    onChange={(e) => {
                      setUpskills(e.target.value);
                    }}
                  />
                </div>
                <div className="modelachivements my-3">
                  <h3>Achievements</h3>
                  <textarea
                    type="text"
                    className="w-100"
                    placeholder="eg.Hackathon winner,Best Programmer award"
                    defaultValue={user.achievements}
                    onChange={(e) => {
                      setUpachivements(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="certificates"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered certificatedialog"
          role="document"
        >
          <div className="modal-content certificatecontent">
            <div className="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Certificate
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="" onSubmit={handleCreateCertificate}>
              <div className="modal-body">
                <div className="container createcertificate">
                  <label htmlFor="title">Name*</label>
                  <input
                    type="text"
                    required
                    placeholder="Certificate Name"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <label htmlFor="date">Issue Date*</label>
                  <input
                    type="text"
                    required
                    placeholder="(Month-Year)"
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <label htmlFor="url">Certificate Url</label>
                  <input
                    type="url"
                    placeholder="Url"
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="experience"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered certificatedialog"
          role="document"
        >
          <div className="modal-content certificatecontent">
            <div className="modal-header">
              <h5 classNme="modal-title exptitle" id="exampleModalLabel">
                Experience
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="" onSubmit={handleCreateExperience}>
              <div className="modal-body">
                <div className="container createcertificate">
                  <label htmlFor="title">Title*</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex.Full Stack Intern"
                    onChange={(e) => {
                      setExptitle(e.target.value);
                    }}
                  />
                  <label htmlFor="date">Employment Type*</label>
                  {/* <input type="text" required placeholder="(Month-Year)" onChange={(e)=>setDate(e.target.value)} /> */}
                  <div className="input-group mb-3">
                    <select
                      class="custom-select"
                      id="inputGroupSelect01"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option selected>Please Select</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Self Employed">Self Employed</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Tranee">Tranee</option>
                    </select>
                  </div>
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="string"
                    placeholder="Company"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <label htmlFor="duration">Duration</label>
                  <input
                    type="text"
                    placeholder="Months"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="projects"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered certificatedialog"
          role="document"
        >
          <div className="modal-content certificatecontent">
            <div className="modal-header">
              <h5 classNme="modal-title exptitle" id="exampleModalLabel">
                Project
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="" onSubmit={handleCreateProject}>
              <div className="modal-body">
                <div className="container createcertificate">
                  <label htmlFor="title">Title*</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Title"
                    onChange={(e) => {
                      setProjecttitle(e.target.value);
                    }}
                  />

                  <label htmlFor="company">Description</label>
                  {/* <input
                    type="string"
                    placeholder="Description"
                    onChange={(e) => setProjectDesc(e.target.value)}
                  /> */}
                  <textarea
                    name="desc"
                    id="desc"
                    cols="30"
                    rows="5"
                    style={{ padding: "5px" }}
                    onChange={(e) => setProjectDesc(e.target.value)}
                  ></textarea>
                  <label htmlFor="duration">Project URL</label>
                  <input
                    type="url"
                    placeholder="URL"
                    onChange={(e) => setProjectUrl(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
