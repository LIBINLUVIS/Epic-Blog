import React, { useContext, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UserContext from "../Context/UserContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../Styles/login.css";
import "../Styles/homemain.css";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 400,
    [theme.breakpoints.down("md")]: {
      width: 300,
    },
  },
}));

/**
 * Login Function
 * @type {string}
 */
function Login() {
  const classes = useStyles();
  let { loginUser, userlogin, loginerror, networkerror } =
    useContext(UserContext);

  return (
    <div className="main">
      <div className="loginhead">
        <ArrowBackIcon style={{ color: "#808080" }} />
        <Link to="/" className="backlink">
          <h>Go back</h>
        </Link>
      </div>
      <div className="logintext">
        <h1>Login</h1>
      </div>
      <div>
        <form onSubmit={loginUser} className="loginauth">
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            className={classes.textField}
            name="username"
            required
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            className={classes.textField}
            name="password"
          />
          {loginerror ? (
            <>
              <Alert
                variant="outlined"
                severity="error"
                style={{ marginTop: "10px" }}
              >
                Password or Username incorrect — check it out!
              </Alert>
            </>
          ) : (
            <></>
          )}
          {networkerror ? (
            <>
              <Alert
                variant="outlined"
                severity="error"
                style={{ marginTop: "10px" }}
              >
                Network Error — check it out!
              </Alert>
            </>
          ) : (
            <></>
          )}
          {userlogin ? (
            <>
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
                <CircularProgress style={{ color: "white" }} />
              </Button>
            </>
          ) : (
            <>
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
                Login
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
