import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import Notifications from "./components/Notifications/Notifications";
import Notice from "./components/Notices/Notice";
import Chats from "./components/Chats/Chats";
import AddPost from "./components/AddPost/AddPost";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { useEffect, useState, useContext } from "react";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signIn/SignIn";
import { AuthContext } from "./context/AuthContext";
import { Search } from "./components/SearchPage/Search";
import { UsersProfile } from "./components/Usersprofile/UsersProfile";
import { Singlepost } from "./components/Posts/Singlepost";
import { UpdatePost } from "./components/UpdatePost/UpdatePost";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Admin } from "./components/AdminPanel/Admin";
import { Resume } from "./components/Resume/Resume";
import Singleclub from "./components/singleclubupdate/singleclub";
import { Welcome } from "./components/Welcome/Welcome";
import Singleoppor from "./components/SingleOppor/singleoppor";

function App() {
  const [loading, setLoading] = useState(true);
  const [welcomeloading, setWelcomeLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const resumepath = window.location.pathname;

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    setTimeout(() => setWelcomeLoading(false), 4000);
  }, []);
  if(resumepath === "/resume"){
    document.body.contentEditable = true;
  }
  return (
    <>
      <div className="App">
        {user ? (
          <>
            {" "}
            {resumepath!=="/resume" && user && <Navbar />}
            <Router>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <>{loading === false ? <HomePage /> : <LoadingScreen />}</>
                  }
                />

                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/chats" element={<Chats />} />
                <Route exact path="/addpost" element={<AddPost />} />
                <Route exact path="/editpost/:postid" element={<AddPost />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/admin" element={<Admin />} />
                <Route exact path="/resume" element={<Resume />} />
                <Route exact path="/clubupdate/:id" element={<Singleclub />} />
                <Route exact path="/opportunity/:id" element={<Singleoppor />} />
                <Route exact path="/search" element={<Search />} />
                <Route path="/viewpost/:postid" element={<Singlepost />} />
                <Route
                  exact
                  path="/profile/:username"
                  element={<UsersProfile />}
                />
                <Route exact path="/addpost/:postid" element={<UpdatePost />} />
                <Route
                  exact
                  path="/notifications"
                  element={<Notifications />}
                />
                <Route exact path="/noticeboard" element={<Notice />} />
                <Route path="/clubs" element={<LeftSidebar />} />
                <Route path="/opportunities" element={<RightSidebar />} />
              </Routes>
            </Router>
            <Footer />{" "}
          </>
        ) : (
          <>
            <Router>
              <Routes>
                <Route exact path={"/"} element={welcomeloading === false ? <SignIn /> : <Welcome />} />
                <Route exact path={"/login"} element={welcomeloading === false ? <SignIn /> : <Welcome />} />
                <Route exact path="/register" element={<SignUp />} />
              </Routes>
            </Router>
            {/* <SignIn/> */}
          </>
        )}
      </div>
    </>
  );
}

export default App;
