import React, { useContext } from "react";
import "../Styles/Signup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { Link } from "react-router-dom";
import "../Styles/homemain.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 400,
    [theme.breakpoints.down("md")]: {
      width: 300,
    },
  },
  signup_username_text: {
    fontSize: 40,
    [theme.breakpoints.down("md")]: {
      fontSize: 30,
    },
  },
}));
/**
 * User signup 
 * @type {string}
 */

function Signup() {
  const classes = useStyles();
  let { setUseralredyin } = useContext(UserContext);
  let navigate = useNavigate();
  const setusername = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    localStorage.setItem("susername", username);
    setUseralredyin(false);
    navigate("/signup1");
  };

  return (
    <div className="main">
      <div className="loginhead">
        <ArrowBackIcon style={{ color: "#808080" }} />
        <Link to="/" className="backlink">
          <h>Go back</h>
        </Link>
      </div>
      <div className="logintext">
        <h1 className={classes.signup_username_text}>Sign up with Username</h1>
        <p>
          Enter an username to create an <br />
          <p style={{ marginLeft: "35%" }}>account</p>
        </p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <h style={{ color: "#808080", fontSize: "20px" }}>Your Username</h>
      </div>
      <div>
        <form onSubmit={setusername} className="loginauth">
          <TextField
            id="standard-basic"
            label=""
            variant="standard"
            className={classes.textField}
            name="username"
            required
          />
          <Button
            variant="contained"
            disableElevation
            style={{
              marginTop: "80px",
              borderRadius: "50px",
              width: "300px",
              height: "60px",
              backgroundColor: "#FF6719",
            }}
            type="submit"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
