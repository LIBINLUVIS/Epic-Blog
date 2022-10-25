import React, { useContext } from "react";
import "../Styles/Signup.css";
import "../Styles/homemain.css";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserContext from "../Context/UserContext";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  signup1_username_text: {
    fontSize: 40,
    [theme.breakpoints.down("md")]: {
      fontSize: 30,
    },
  },
}));

function Signup1() {
  const classes = useStyles();
  let { signup, useralredyin, usersignup } = useContext(UserContext);

  const setpassword = (e) => {
    e.preventDefault();
    let password = e.target.password.value;
    localStorage.setItem("spassword", password);
    signup();
  };

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="main">
      <div className="loginhead">
        <ArrowBackIcon style={{ color: "#808080" }} />
        <Link to="/signup" className="backlink">
          <h>Go back</h>
        </Link>
      </div>
      <div className="logintext">
        <h1 className={classes.signup1_username_text}>Setup an Password</h1>
        <p>
          Enter an Password to create an <br />
          <p style={{ marginLeft: "35%" }}>account</p>
        </p>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <h style={{ color: "#808080", fontSize: "20px" }}>Your Password</h>
      </div>
      <div>
        <form onSubmit={setpassword} className="loginauth">
          {/* <TextField id="standard-basic" label="" variant="standard" style={{width:"400px"}} name="password" /> */}
          {/* {login field} */}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
              // label="Password"
            />
          </FormControl>
          {useralredyin ? (
            <>
              <Alert
                variant="outlined"
                severity="error"
                style={{ marginTop: "30px" }}
              >
                User already exists — check it out!
              </Alert>
            </>
          ) : (
            <></>
          )}
          {/* {login button} */}
          {usersignup ? (
            <>
              <Button
                variant="contained"
                disableElevation
                style={{
                  marginTop: "50px",
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
                  marginTop: "50px",
                  borderRadius: "50px",
                  width: "300px",
                  height: "60px",
                  backgroundColor: "#FF6719",
                }}
                type="submit"
              >
                Signup
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup1;
