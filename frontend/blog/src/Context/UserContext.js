import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Axios.js";
const UserContext = createContext();

export default UserContext;
/**
 * UserContext manages the State of the application
 * @type {string}
 */
export const UserProvider = ({ children }) => {
  const [useralredyin, setUseralredyin] = useState(false);
  const [blogfetched, setBlogfetched] = useState(false);
  const [usertoken, setUsertoken] = useState(false);
  const [usersignup, setUsersignup] = useState(false);
  const [userlogin, setUserlogin] = useState(false);
  const [loginerror, setLoginerror] = useState(false);
  const [networkerror, setNetworkerror] = useState(false);
  const [userblogpost, setUserblogpost] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [fetchdp, setFetchdp] = useState(false);

  let navigate = useNavigate();


  const loginUser = async (e) => {
    setUserlogin(true);
    const loginapi = "api/auth/login";
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      username: username,
      password: password,
    });

    await axios
      .post(loginapi, body, config)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          let token = res.data.token;
          localStorage.setItem("user_token", token);
          setUserlogin(false);
          setUsertoken(true);
          navigate("/authhome");
        }
      })
      .catch((err) => {
        console.log("login error");
        console.log(err.request);
        if (err.response.status == 401) {
          setLoginerror(true);
          setUserlogin(false);
        }
        if (!err.response || err.response.status == 500) {
          setNetworkerror(true);
          setUserlogin(false);
        }
      });
  };

  let signup = () => {
    setUsersignup(true);
    var username = localStorage.getItem("susername");
    var password = localStorage.getItem("spassword");

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      username: username,
      password: password,
    });
    const signupapi = "api/auth/signup";

    axios
      .post(signupapi, body, config)
      .then((res) => {
        console.log("User Created!");
        if (res.status == 200) {
          setUsersignup(false);
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.status);
        if (err.response.status == 400) {
          setUseralredyin(true);
        }
        console.log("User not Created!");
      });
  };

  const logout = () => {
    localStorage.removeItem("user_token");
    navigate("/");
  };

  const userposts = () => {
    const userpostapi = "api/posts/getUserPosts";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("user_token"),
      },
    };
    axios
      .get(userpostapi, config)
      .then((res) => {
        setUserblogpost(res.data);
        setBlogfetched(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userinfofetch = () => {
    setFetchdp(true);
    const userinfoapi = "api/auth/fetch";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("user_token"),
      },
    };
    axios.get(userinfoapi, config).then((res) => {
      if (res.status == 200) {
        setUserinfo(res.data);
        setFetchdp(false);
      }
    });
  };

  let contextData = {
    loginUser: loginUser,
    signup: signup,
    useralredyin: useralredyin,
    setUseralredyin: setUseralredyin,
    usertoken: usertoken,
    usersignup: usersignup,
    userlogin: userlogin,
    loginerror: loginerror,
    networkerror: networkerror,
    logout: logout,
    userposts: userposts,
    userblogpost: userblogpost,
    userinfo: userinfo,
    userinfofetch: userinfofetch,
    blogfetched: blogfetched,
    setFetchdp: setFetchdp,
    fetchdp: fetchdp,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
