import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Button from "@mui/material/Button";
import "../Styles/detailblog.css";
import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import blogimg from "../assets/blog_img1.jpg";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import TextField from "@mui/material/TextField";
import axios from "../Axios.js";
import Backdrop from "@mui/material/Backdrop";
import { FacebookShareButton } from "react-share";

/**
 * Detailblog post info
 * @type {string}
 */

function Detailblog() {
  const { id } = useParams();
  // const shareurl=`http://localhost:3000/blog/${id}`
  const shareurl = `20.85.110.20/blog/${id}`;
  const [detailblog, setDetailBlog] = useState([]);
  const [commentfetch, setCommentfetch] = useState(false);
  const [comment, setComment] = useState("");
  const [commentstate, setCommentstate] = useState(false);
  const [blogcomment, setBlogcomment] = useState([]);
  const [detailblogfetch, setDetailblogfetch] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleclose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  console.log(blogcomment);

  useEffect(() => {
    handleToggle();
    axios.get(`api/posts/fetchonepost/${id}`).then((res) => {
      if (res.status == 200) {
        setDetailBlog(res.data);
        handleclose();
        setDetailblogfetch(true);
      }
    });
  }, []);
  useEffect(() => {
    const getcommentapi = `api/comments/fetchComments/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("user_token"),
      },
    };
    axios.get(getcommentapi, config).then((res) => {
      if (res.status == 200) {
        setBlogcomment(res.data);
        setCommentfetch(true);
      }
    });
  }, []);
  const [selectbot, setSelectbot] = useState(false);

  const chatbot = () => {
    setSelectbot(true);
  };
  const closechatbot = () => {
    setSelectbot(false);
  };
  const makecomment = () => {
    setCommentfetch(false);
    const commentapi = `api/comments/postComment/${id}`;
    const body = JSON.stringify({ comment: comment });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("user_token"),
      },
    };
    axios
      .post(commentapi, body, config)
      .then((res) => {
        console.log(res.data.id);
        if (res.data.id == 0) {
          setCommentstate(true);
          setCommentfetch(true);
        }
        if (res.data.id == 1) {
          setCommentstate(false);
          setComment("");
          const getcommentapi = `api/comments/fetchComments/${id}`;
          const config = {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("user_token"),
            },
          };
          axios.get(getcommentapi, config).then((res) => {
            if (res.status == 200) {
              setBlogcomment(res.data);
              setCommentfetch(true);
            }
          });
        }
      })
      .catch((err) => {
        alert(err.data);
      });
  };
  const cancelcomment = () => {
    setComment("");
  };
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          position: "fixed",
          backgroundColor: "white",
        }}
        className="hide_fotter_1"
      >
        <div className="blog_side_icons">
          <Link to="/authhome" style={{ color: "grey" }}>
            <HomeIcon id="home_icon_blog" fontSize="large" />
          </Link>
          <EditIcon id="edit_icon_blog" fontSize="large" />
          <AutoStoriesIcon id="story_icon_blog" fontSize="large" />
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
      <div className="dblog_head"></div>
      <hr></hr>
      {detailblogfetch ? (
        <>
          <div className="blog_heading">
            <h>{detailblog.title}</h>
          </div>
          <div className="user_detail">
            <div className="user_icon_name">
              <div className="inner_user_icon">
                <PersonIcon fontSize="large" style={{ color: "grey" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "15px",
                  }}
                >
                  <h>{detailblog.username}</h>
                  <span>
                    {new Date(detailblog.timestamp).toLocaleTimeString(
                      "en-IN",
                      {
                        timeZone: "Asia/Kolkata",
                      }
                    )}
                    ,
                    {new Date(detailblog.timestamp).toLocaleDateString(
                      "en-IN",
                      {
                        timeZone: "Asia/Kolkata",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="dblog_icons">
              {/* <FavoriteBorderTwoToneIcon fontSize='large' style={{color:'grey'}}/> */}
              {/* <ChatBubbleRoundedIcon fontSize='large' style={{color:'grey'}}/> */}
              <FacebookShareButton
                url={shareurl}
                quote={"This is an Blog Post post"}
                hashtag={"#blog"}
              >
                <IosShareRoundedIcon
                  fontSize="large"
                  style={{ color: "grey" }}
                />
              </FacebookShareButton>
            </div>
          </div>
          <div className="dblog_img">
            <img src={`data:image/jpeg;base64,${detailblog.postimg}`} />
          </div>

          <div className="blog_content_body">
            <p>{detailblog.description}</p>
          </div>
          <hr></hr>
          <div className="comment_sec">
            {/* <AccountCircleTwoToneIcon style={{marginRight:'20px'}}/> */}
            <div className="comment_text">
              <div className="comment_box_sec">
                {commentstate ? (
                  <>
                    <TextField
                      id="standard-textarea"
                      label=""
                      error
                      placeholder="Write a comment"
                      multiline
                      helperText="The Comment you entered is unacceptable."
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      value={comment}
                      variant="standard"
                      fullWidth
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      id="standard-textarea"
                      label=""
                      placeholder="Write a comment"
                      multiline
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      value={comment}
                      variant="standard"
                      fullWidth
                    />
                  </>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  style={{ marginRight: "10px" }}
                  onClick={cancelcomment}
                >
                  cancel
                </Button>
                <Button variant="outlined" onClick={makecomment}>
                  comment
                </Button>
              </div>
            </div>
          </div>

          <div className="message_section">
            <h style={{ fontSize: "20px", fontWeight: "bold" }}>Comments</h>
            {commentfetch ? (
              <>
                {blogcomment[0] ? (
                  <>
                    <div className="comments_user">
                      {blogcomment.map((obj) => (
                        <>
                          <div className="user_detail_icons">
                            <AccountCircleTwoToneIcon />
                            <span
                              style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                                marginLeft: "5px",
                                marginRight: "5px",
                              }}
                            >
                              {obj.username}
                            </span>
                            <span style={{ color: "#808080" }}>
                              {new Date(obj.timestamp).toLocaleTimeString(
                                "en-IN",
                                {
                                  timeZone: "Asia/Kolkata",
                                }
                              )}
                              ,
                              {new Date(obj.timestamp).toLocaleDateString(
                                "en-IN",
                                {
                                  timeZone: "Asia/Kolkata",
                                }
                              )}
                            </span>
                          </div>
                          <div className="comment">
                            <h>{obj.comment}</h>
                          </div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ marginTop: "70px", color: "grey" }}>
                    No Comments found for this Post
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <CircularProgress style={{ color: "grey" }} />
                </div>
              </>
            )}
          </div>

          <div className="fotter_mobile_blog_sec">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                zIndex: "-1",
                marginLeft: "20%",
                marginRight: "20%",
                marginTop: "30px",
                alignItems: "center",
              }}
            >
              <Link to="/authhome">
                <HomeIcon fontSize="large" style={{ color: "grey" }} />
              </Link>
              <Link to="/write">
                <EditIcon fontSize="large" style={{ color: "grey" }} />
              </Link>
              <Link to="">
                <AutoStoriesIcon fontSize="large" style={{ color: "grey" }} />
              </Link>
              <Link to="/dashboard">
                <PersonIcon fontSize="large" style={{ color: "grey" }} />
              </Link>
            </div>
          </div>
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
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
      <div
        style={{ textAlign: "center", height: "50px", marginTop: "10px" }}
        className="hide_fotter_1"
      >
        <hr style={{ width: "99%" }}></hr>
        <p>© 2022 All rights reserved.</p>
      </div>
    </>
  );
}

export default Detailblog;
