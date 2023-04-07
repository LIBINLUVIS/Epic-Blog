import React, { useEffect, useState } from "react";
import "../Styles/blogs.css";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonIcon from "@mui/icons-material/Person";
import dumyimg from "../assets/Rectangle 44.png";
import { Link, NavLink, useParams } from "react-router-dom";
import bot from "../assets/chatbot.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "../Axios.js";


/**
 * Fetching the blogs with category
 * @type {string}
 */
function Blogs() {
  const { id } = useParams();
  console.log(id);

  const [selectbot, setSelectbot] = useState(false);
  const [categoryblog, setCategoryblog] = useState([]);
  const [categoryblogfetched, setCategoryblogfetched] = useState(false);
  const [date, setdate] = useState("");
  const [rerender, setrerender] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleclose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setdate(
      new Date(categoryblog.timestamp).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    );
    setTimeout(() => {
      if (rerender == 0) {
        setrerender(1);
        console.log("rerender");
        console.log(date);
      }
    }, 1500);

    // eslint-disable-next-line
  }, [rerender]);

  const chatbot = () => {
    setSelectbot(true);
  };
  const closechatbot = () => {
    setSelectbot(false);
  };
  console.log(categoryblog);
  useEffect(() => {
    console.log("hello");
    handleToggle();
    const catgeoryfetchapi = `api/posts/categoricalfetch/${id}`;
    axios.get(catgeoryfetchapi).then((res) => {
      if (res.status == 200) {
        console.log(res.data);
        setCategoryblog(res.data);
        handleclose();
        setCategoryblogfetched(true)
      }
    });
  }, []);

  return (
    <div className="main_blogs_container">
      <div className="blog_sec_sidemenu">
        <div className="blog_side_icons">
          <Link to="/authhome" style={{ color: "grey" }}>
            <HomeIcon id="home_icon_blog" fontSize="large" />
          </Link>
          <EditIcon id="edit_icon_blog" fontSize="large" />
          <Link to='/Read' style={{cursor:'pointer',color:'grey'}}>
          <AutoStoriesIcon id="story_icon_blog" fontSize="large" />
          </Link>
          
        </div>
        <div
          style={{
            height: "50vh",
            borderRight: "1px solid black",
            color: "grey",
            display: "flex",
            flexDirection: "column",
            width: "100px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PersonIcon fontSize="large" />
        </div>
      </div>

      <div className="blog_head">
        <h1>Inbox</h1>
        {/* <div className='text_area1'>
     <TextField id="standard-basic" label="" variant="standard" style={{marginTop:'9px'}}/>
     <SearchIcon style={{marginTop:'10px',color:'grey',cursor:'pointer'}}/>
     </div> */}
      </div>
      <>
        <hr style={{ width: "99%" }}></hr>
      </>

      <div className="blog_section">
        <div className="blogs">
          <div className="blogs_scroll">
            {categoryblogfetched ? (
              <>
                {categoryblog[0] ? (
                  <>
                    {categoryblog.map((obj) => (
                      <div className="blog_box">
                        <div className="ineer_blog_head">
                          <span>
                            <NavLink
                              to={`/blog/${obj._id}`}
                              style={{ color: "grey" }}
                            >
                              <ArrowForwardIcon />
                            </NavLink>
                          </span>
                          <span>{obj.username}</span>
                          <span>{
                            new Date(obj.timestamp).toLocaleTimeString("en-IN", {
                              timeZone: "Asia/Kolkata",
                            })}
                          </span>
                          <span>
                            {
                              new Date(obj.timestamp).toLocaleDateString("en-IN", {
                                timeZone: "Asia/Kolkata",
                              })}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "thin",
                            marginLeft: "25px",
                            marginTop: "10px",
                          }}
                        >
                          <h>{obj.title}</h>
                        </div>
                        <div className="inner_blog_body">
                        <img  src={`data:image/jpeg;base64,${obj.postimg}`} />
                          <p>{obj.description}....</p>

                          {/* <NavLink to={`/blog/${obj._id}`} style={{textDecoration:'none',cursor:'pointer'}}>
              read more
              </NavLink> */}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <h1 style={{ color: "grey" }}>
                      No Posts Yet For this Topic
                    </h1>
                  </>
                )}
              </>
            ) : (
              <>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                  onClick={handleclose}
                >
                  <CircularProgress color="inherit"/>
                </Backdrop>
              </>
            )}
          </div>
        </div>

        <div className="chat_bot">
          {selectbot ? (
            <>
              <div className="chat_area1">
                <div className="cross_icon">
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    onClick={closechatbot}
                  />
                </div>
                <div className="message_box">
                  <div className="user_query">
                    <PersonIcon style={{ color: "blue" }} />
                    <div className="user_msg">
                      <h>hello</h>
                    </div>
                  </div>

                  <div className="bot_query">
                    <SmartToyIcon style={{ color: "orange" }} />
                    <div className="bot_result">
                      <h>hai...</h>
                    </div>
                  </div>
                </div>
                <div className="text_box">
                  <div className="text_area">
                    <TextField
                      id="standard-basic"
                      label=""
                      variant="standard"
                    />
                  </div>
                  <SendIcon style={{ color: "grey", cursor: "pointer" }} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="chat_area2">
                <div className="cross_icon"></div>
                <div className="message_box"></div>
              </div>
            </>
          )}
          {/* <div className="chatbot">
            <img src={bot} onClick={chatbot} />
          </div> */}
        </div>
      </div>

      <div
        style={{ textAlign: "center", height: "100px", marginTop: "auto" }}
        className="hide_fotter"
      >
        <hr style={{ width: "99%" }}></hr>
        <p>© 2022 All rights reserved.</p>
      </div>
    </div>
  );
}

export default Blogs;
