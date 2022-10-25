import React, { useContext, useEffect } from "react";
import "../Styles/authhomesidemenu.css";
import "../Styles/homemain.css";
import banner from "../assets/Frame.png";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HomeIcon from "@mui/icons-material/Home";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";

const useStyles = makeStyles((theme) => ({
  fotter_hide: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  fotter_mobile: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  banner_img: {
    width: "1123px",
    height: "470px",
    [theme.breakpoints.down("xs")]: {
      width: 360,
      height: 430,
    },
  },
}));
/**
 * after login Screen by the user 
 * @type {string}
 */
function Authhome() {
  const classes = useStyles();

  return (
    <div className="home">
      <div
        style={{
          overflow: "hidden",
          position: "fixed",
          backgroundColor: "white",
        }}
        className={classes.fotter_hide}
      >
        <div className="blog_side_icons">
          <Link to="/authhome">
            <HomeIcon style={{ color: "grey" }} fontSize="large" />
          </Link>
          <Link to="/write">
            <CreateIcon
              style={{ color: "grey" }}
              fontSize="large"
              id="create_icon"
            />
          </Link>
          <Link to="/Read">
            <AutoStoriesIcon style={{ color: "grey" }} fontSize="large" />
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
          <Link to="/dashboard">
            <PersonIcon fontSize="large" style={{ color: "grey" }} />
          </Link>
        </div>
      </div>
      <div className="home-main">
        <h2 style={{ color: "#FF6719" }}>
          Inc. This Morning<br></br>
          <span style={{ marginLeft: "19%", fontSize: "40px" }}>
            <span style={{ color: "grey" }}>"</span>Blog
            <span style={{ color: "grey" }}>"</span>
          </span>
        </h2>
        <p>
          <span style={{ marginLeft: "50px" }}>
            awesome place to make oneself
          </span>
          <br></br>
          productive and entertained through daily updates
        </p>

        <div className="background">
          <img
            src={banner}
            className={classes.banner_img}
            id="home_banner_img"
          />
          <h1 className="img-text">
            The home for great <br></br> writers and readers
          </h1>
          <Link to="/Read">
            <button className="read-btn">Start Reading</button>
          </Link>
          <Link to="/Write">
            <button className="write-btn">Start Writing</button>
          </Link>
        </div>
        <div
          style={{
            textAlign: "center",
            height: "80px",
            bottom: "0px",
            position: "fixed",
            width: "100%",
            zIndex: "-1",
          }}
          className={classes.fotter_hide}
        >
          <hr style={{ width: "100%" }}></hr>
          <p>© 2022 All rights reserved.</p>
        </div>

        <div
          style={{
            height: "100px",
            bottom: "0px",
            position: "fixed",
            width: "100%",
            borderStyle: "solid",
            borderWidth: "thin",
            borderColor: "grey",
          }}
          className={classes.fotter_mobile}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "30px",
            }}
          >
            <Link to="/authhome">
              <HomeIcon style={{ color: "grey" }} fontSize="large" />
            </Link>
            <Link to="/write">
              <CreateIcon style={{ color: "grey" }} fontSize="large" />
            </Link>
            <Link to="/Read">
              <AutoStoriesIcon style={{ color: "grey" }} fontSize="large" />
            </Link>
            <Link to="/dashboard">
              <PersonIcon fontSize="large" style={{ color: "grey" }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authhome;
