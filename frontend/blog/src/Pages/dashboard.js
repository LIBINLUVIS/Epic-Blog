import React, { useState, useContext, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, NavLink } from "react-router-dom";
import "../Styles/dashboard.css";
import pic from "../assets/Ellipse 4.png";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Skeleton from "@mui/material/Skeleton";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import UserContext from "../Context/UserContext";
import axios from "../Axios.js";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";


/**
 * User Dashboard
 * @type {string}
 */
function Dashboard() {
  let {
    logout,
    userposts,
    userblogpost,
    userinfofetch,
    userinfo,
    blogfetched,
    setFetchdp,
    fetchdp
  } = useContext(UserContext);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [namesave, setNamesave] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [erropen, setErropen] = useState(false);
  const [newusername, setNewusername] = useState("");
  const [uploadprogress,setUploadprogress]=useState(0);
  const [ispicselected, setIspicselected] = useState(false);

  useEffect(() => {
    userposts();
  }, []);
  useEffect(() => {
    userinfofetch();
  }, []);

  console.log(userinfo);
  const [edit, setEdit] = useState(true);

  const makeedit = () => {
    setEdit(false);
  };

  const changeusername = () => {
    setEdit(true);
    setNamesave(true);
    const namechangeapi = "api/auth/changeusername";
    const body = JSON.stringify({ username: newusername });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("user_token"),
      },
    };

    axios
      .put(namechangeapi, body, config)
      .then((res) => {
        if (res.status == 200) {
          setNamesave(false);
          userinfofetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // post to database apis
  };
  const deletepost = (id) => {
    console.log(id);
    const deleteapi = `api/posts/deletePost/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("user_token"),
      },
    };
    axios.delete(deleteapi, config).then((res) => {
      if (res.status == 200) {
        userposts();
      }
    });
  };
  const UpdateUserPassword = (e) => {
    e.preventDefault();
    const pass1 = password1;
    const pass2 = password2;
    const UpdatePassapi = "api/auth/changepw";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("user_token"),
      },
    };
    const body = JSON.stringify({ newpass: pass2 });
    if (pass1 === pass2) {
      axios
        .put(UpdatePassapi, body, config)
        .then((res) => {
          if (res.status == 200) {
            setPassword1("");
            setPassword2("");
            setOpen(true);
          }
        })
        .catch((err) => {
          setErropen(true);
          console.log("Password Not Changed");
        });
    } else {
      alert("passwords are not matching");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const closemsg = () => {
    setOpen(false);
  };
  const closemsgerror = () => {
    setErropen(false);
  };

  const getupdatedval = (e) => {
    const updatedname = e.target.value;
    setNewusername(updatedname);
  };

  const formData = new FormData();

  const uploaduserpic = () => {
    document.getElementById("blogimg").click();
  };
  const FileSelectHandler = (event) => {
    const userdpapi = "api/auth/changedp";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": localStorage.getItem("user_token"),
      },
      onUploadProgress:(data)=>{
        let progress=Math.round((data.loaded/data.total)*100)
        setUploadprogress(progress>=100 ? 0:progress)
      }, 
    }
    console.log(event.target.files[0])
    if (event.target && event.target.files[0]) {
     
      setIspicselected(true);
      formData.append('image', event.target.files[0]);
   
      axios.put(userdpapi,formData,config).then((res)=>{
        console.log("Scuccessful")
        userinfofetch();
        
      }).catch((err)=>{
        console.log(err.data)
        console.log(err)
      });
    }
  };
  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIspicselected(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose1}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose1}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

 function uploadpic(event) {
      for (const value of formData.values()) {
        console.log(value);
      }
      console.log("hey")
 //  e.preventDefault();
  //  event.preventDefault();
  //   const userdpapi = "api/auth/changedp";
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       "auth-token": localStorage.getItem("user_token"),
  //     }
  //   };

  //   axios.put(userdpapi,formData,config).then((res)=>{
  //      console.log("Scuccessful")
  //   }).catch((err)=>{
  //     console.log(err);
  //     console.log(err.data);
  //   })
 }


 

  return (
    <div className="dashmain">
      <div className="dashback_logout">
        <div style={{ display: "flex" }}>
          <ArrowBackIcon style={{ color: "#808080" }} />
          <Link
            to="/authhome"
            style={{ textDecorationLine: "none", color: "GrayText" }}
          >
            <h>Go back</h>
          </Link>
        </div>
        <h style={{ fontWeight: "bold", cursor: "pointer" }} onClick={logout}>
          Logout
        </h>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "40px" }}
      >
        <h1>Profile Settings</h1>
      </div>

      <div className="profile">
        <div className="pic_username">
          <div className="profile_pic">
            {userinfo ? (
              <>
                {userinfo.profilepic ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={`data:image/jpeg;base64,${userinfo.profilepic}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        display: "block",
                      }}
                    />
                    {fetchdp?<div className="profilepicloader-box">
                    <CircularProgress  className="profilepicloader" style={{color:'green'}}/>
                    </div>:<div className="picuploadprogress-box">
                    <CircularProgress variant="determinate" value={uploadprogress} className="picuploadprogress" />
                    </div>}  
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                     <img
                      src={pic}
                      style={{ width: "100px", height: "100px" }}
                    />
                   <div className="profilepicloader-box">
                    <CircularProgress  className="profilepicloader" style={{color:'green'}}/>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <CircularProgress
                  style={{
                    height: "30px",
                    width: "30px",
                    marginTop: "30px",
                    color: "grey",
                  }}
                />
              </>
            )}

            <button
              type="button"
              onClick={uploaduserpic}
              style={{ backgroundColor: "white", border: "none" }}
            >
              <CameraAltIcon className="profilepicico" />
            </button>
            <input
              id="blogimg"
              type="file"
              style={{ display: "none" }}
              onChange={FileSelectHandler}
            />

            {/* <button
              type="button"
              onClick={uploadpic}
              style={{ backgroundColor: "greenyellow", border: "none" }}
            >
            <UploadIcon  className="profileuploadico" />
            </button> */}
            
          </div>
          <div className="profile_username">
            <div>
              <h>Username</h>
            </div>
            <div style={{ display: "flex" }}>
              {!fetchdp ? (
                <>
                  <TextField
                    id="standard-read-only-input"
                    label=""
                    value={userinfo.username}
                    InputProps={{
                      readOnly: false,
                    }}
                    variant="standard"
                    onChange={getupdatedval}
                  />
                </>
              ) : (
                <><CircularProgress  style={{color:'blue',height:'30px',width:'30px',marginTop:'45px',margin:'5px'}}/></>
              )}

              <EditIcon
                style={{ color: "grey", cursor: "pointer" }}
                onClick={makeedit}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {edit ? (
                <></>
              ) : (
                <>
                  <button
                    style={{
                      backgroundColor: "#3CB371",
                      borderRadius: "30px",
                      color: "white",
                      border: "none",
                      marginTop: "20px",
                      width: "60px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                    onClick={changeusername}
                  >
                    Save
                  </button>
                </>
              )}
              {namesave ? (
                <>
                  <CircularProgress
                    style={{
                      height: "30px",
                      width: "30px",
                      marginTop: "30px",
                      color: "green",
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={UpdateUserPassword}>
          <div className="change_password">
            <h style={{ marginTop: "10px" }}>Change Password</h>
            <TextField
              id="standard-search"
              label="New Password"
              type="search"
              onChange={(e) => setPassword1(e.target.value)}
              variant="standard"
              value={password1}
              style={{ marginTop: "15px" }}
            />
            <TextField
              id="standard-search"
              label="Confirm Password"
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              variant="standard"
              value={password2}
              style={{ marginTop: "15px" }}
            />
            <button
              style={{
                backgroundColor: "#3CB371",
                color: "white",
                border: "none",
                marginTop: "20px",
                width: "60px",
                height: "30px",
                cursor: "pointer",
              }}
              type="submit"
            >
              Done
            </button>
          </div>
          {open ? (
            <>
              <Alert
                onClose={() => {
                  closemsg();
                }}
                style={{ marginTop: "10px" }}
              >
                Password Updated!
              </Alert>
            </>
          ) : (
            <></>
          )}
          {erropen ? (
            <>
              <Alert
                onClose={() => {
                  closemsgerror();
                }}
                style={{ marginTop: "10px" }}
                severity="error"
              >
                Password Not Updated!
              </Alert>
            </>
          ) : (
            <></>
          )}
        </form>
        <>
          <Snackbar
            open={ispicselected}
            autoHideDuration={3000}
            onClose={handleClose1}
            message="Image Uploading"
            action={action}
          />
        </>
      </div>

      <div className="user_posts_head">
        <h1>Posts</h1>
        {blogfetched ? (
          <>
            {userblogpost[0] ? (
              <>
                <div className="user_posts">
                  {userblogpost.map((obj) => (
                    <div className="user_post">
                      <div className="post_head">
                        <h>{obj.title}</h>
                        <NavLink
                          to={`/blog/${obj._id}`}
                          style={{ color: "grey" }}
                        >
                          <ArrowForwardIcon />
                        </NavLink>
                      </div>
                      <div className="post_content">
                      <span style={{ color: "#808080" }}>
                          {new Date(obj.timestamp).toLocaleTimeString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })} , 

                          {new Date(obj.timestamp).toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })}
                      </span>
       
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {/* <FavoriteBorderOutlinedIcon style={{color:'#808080'}}/><span>100</span> */}
                        </div>
                        {/* <CommentIcon style={{cursor:'pointer',color:'#808080'}}/> */}

                        <DeleteIcon
                          style={{ color: "#808080", cursor: "pointer" }}
                          onClick={(e) => deletepost(obj._id)}
                        />
                        <Link to={`/updatepost/${obj._id}`}>
                          <EditIcon
                            style={{ color: "#808080", cursor: "pointer" }}
                          />
                        </Link>
                      </div>
                      <div className="post_view">
                        <h
                          style={{
                            marginLeft: "40px",
                            fontSize: "40px",
                            color: "grey",
                          }}
                        >
                          2
                        </h>
                        <h style={{ color: "grey" }}>TOTAL VIEWS</h>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1 style={{ color: "grey" }}>No Posts Yet by the user</h1>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Skeleton variant="rectangular" width={300} height={250} />
            <Skeleton
              variant="rectangular"
              width={300}
              height={250}
              style={{ margin: "20px" }}
            />
            <Skeleton variant="rectangular" width={300} height={250} />
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <hr style={{ width: "99%" }}></hr>
        <p>© 2022 All rights reserved.</p>
      </div>
    </div>
  );
}

export default Dashboard;
