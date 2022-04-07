import React, { useContext, useEffect, useRef, useState } from "react";
import Conversations from "../Conversations/Conversations";
import Message from "../Message/Message";
import "./chats.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import { Chathead } from "../Chathead/Chathead";

const Chats = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const topRef = useRef(null);
  const [typing, setTyping] = useState(false);

  const scrolltoTop = () => {
    topRef?.current?.scrollIntoView();
    setCurrentChat(null);
  };
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  console.log(onlineUsers);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setLoading(false);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
      createdAt: Date.now(),
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    if (newMessage !== "") {
      try {
        const res = await axios.post("/messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
        setTyping(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      window.alert("Please type some msg first");
    }
  };
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // console.log(messages);
  const [searchTerm, setSearchTerm] = useState("");
  const [recievers, setRecievers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/allusers/`);
      setRecievers(res.data);
    };
    fetchUser();
  }, []);
  const addconversation = async (id) => {
    const data = {
      senderId: user._id,
      receiverId: id,
    };
    try {
      await axios.post("/conversations", data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(currentChat.receiverId)
  return (
    <div className="container chatcontainer">
      <div className="chatusers" ref={topRef}>
        <div className="chatuserwrapper">
          <input
            type="text"
            placeholder="Search..."
            className="searchinput"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {searchTerm && (
            <div className="searchrecievers container">
              {recievers
                .filter((val) => {
                  if (searchTerm === "") {
                    return null;
                  } else if (
                    val.username
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase())
                  ) {
                    return val;
                  } else {
                    return false;
                  }
                })
                .map((usersinfo) => (
                  <ul className="searchconver" style={{ width: "100%" }}>
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={() => addconversation(usersinfo._id)}
                    >
                      {usersinfo.username}
                    </li>
                  </ul>
                ))}
            </div>
          )}
          {conversations?.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversations
                conversation={c}
                currentuser={user}
                onClick={() => setCurrentChat(c)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="chatbox">
        <div className="chatboxwrapper">
          {currentChat && (
            <div className="chatboxhead">
              <div className="headerofchat">
                <button className="gotoTop" onClick={scrolltoTop}>
                  <i class="fa-solid fa-arrow-left-long"></i>
                </button>
                <Chathead currentchat={currentChat} />{" "}
              </div>
            </div>
          )}
          {currentChat ? (
            <div>
              <div
                className="chatboxtop"
                ref={messages ? scrollRef : scrollRef}
              >
                {loading ? (
                  <>
                    <div className="loadingdiv">loading...</div>
                  </>
                ) : (
                  messages.map((m) => (
                    <>
                      <div ref={scrollRef}>
                        <Message
                          msg={m}
                          own={m.sender === user._id}
                          typing={typing}
                        />
                      </div>
                    </>
                  ))
                )}
              </div>
              <div className="chatboxbottom">
                <textarea
                  className="chatmsginput"
                  id="msginput"
                  placeholder="Write something..."
                  onChange={(e) =>
                    setNewMessage(e.target.value) && setTyping(true)
                  }
                  value={newMessage}
                  required={true}
                ></textarea>
                {/* <input type="text"  placeholder='Write something...' className="chatmsginput" /> */}
                <button onClick={handleSubmit} className="msgsendbtn">
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="defaultchatbox">
              <div
                className="defaultchaticon"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15%",
                }}
              >
                {/* <i class="fas fa-comment-dots"></i> */}
                <MarkUnreadChatAltIcon
                  style={{ color: "gray", fontSize: "200px" }}
                />
              </div>
              <div className="defaulttext">
                <p className="defaultconversation">
                  Open a conversation to start a chat
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
