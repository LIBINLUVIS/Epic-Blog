import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../Styles/read.css";
import Button from "@mui/material/Button";
import axios from "../Axios.js";

/**
 * Blog readings
 * @type {string}
 */

function Read() {
  let navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [selecttech, setSelecttech] = useState(false);
  const [selectcul, setSelectcul] = useState(false);
  const [selectpol, setSelectpol] = useState(false);
  const [selectcry, setSelectcry] = useState(false);
  const [selectedu, setSelectedu] = useState(false);
  const [selectsci, setSelectsci] = useState(false);
  const [selecthist, setSelecthist] = useState(false);
  const [selecttra, setSelecttra] = useState(false);
  const [selectnew, setSelectnew] = useState(false);

  const addtopic = (event, param) => {
    setTopics((current) => [...current, param.name]);
    param.str(true);
  };
  const removetopic = (event, param) => {
    setTopics((current) =>
      current.filter((element) => {
        return element !== param.name;
      })
    );
    param.str(false);
  };

  const fetchtopicpost = () => {
    console.log(topics[0]);
    localStorage.setItem("topic", topics[0]);
  };

  const topicslist1 = [
    { id: 1, name: "Technology", select: selecttech, str: setSelecttech },
    { id: 2, name: "Culture", select: selectcul, str: setSelectcul },
    { id: 3, name: "Politics", select: selectpol, str: setSelectpol },
  ];

  const topicslist2 = [
    { id: 4, name: "Crypto", select: selectcry, str: setSelectcry },
    { id: 5, name: "Science", select: selectsci, str: setSelectsci },
    { id: 6, name: "Education", select: selectedu, str: setSelectedu },
  ];

  const topicslist3 = [
    { id: 7, name: "History", select: selecthist, str: setSelecthist },
    { id: 8, name: "Travel", select: selecttra, str: setSelecttra },
    { id: 9, name: "News", select: selectnew, str: setSelectnew },
  ];

  console.log(topics);
  console.log(selecttech);
  return (
    <>
      <div className="topic_section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "25px",
          }}
        >
          <div style={{ display: "flex", alignContent: "center" }}>
            <ArrowBackIcon style={{ color: "#808080" }} />
            <Link
              to="/authhome"
              style={{ textDecorationLine: "none", color: "GrayText" }}
            >
              <h>Go back</h>
            </Link>
          </div>
          <Link to="/allblogs" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="warning">
              Skip
            </Button>
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Dive into your interests</h1>
        </div>
        <div className="reading_recommentation_text">
          <p style={{ color: "grey" }}>
            We'll recommend top publications based on the topics you select
          </p>
        </div>
        <div className="reading_topics">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            {topicslist1.map((topic) => {
              return (
                <>
                  {topic.select ? (
                    <>
                      <button
                        className="each_ele"
                        onClick={(event) => removetopic(event, topic)}
                        style={{ backgroundColor: "#808080", color: "white" }}
                      >
                        <h>{topic.name}</h>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="each_ele"
                        onClick={(event) => addtopic(event, topic)}
                      >
                        <h>{topic.name}</h>
                      </button>
                    </>
                  )}
                </>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            {topicslist2.map((topic) => {
              return (
                <>
                  {topic.select ? (
                    <>
                      <button
                        className="each_ele"
                        onClick={(event) => removetopic(event, topic)}
                        style={{ backgroundColor: "#808080", color: "white" }}
                      >
                        <h>{topic.name}</h>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="each_ele"
                        onClick={(event) => addtopic(event, topic)}
                      >
                        <h>{topic.name}</h>
                      </button>
                    </>
                  )}
                </>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            {topicslist3.map((topic) => {
              return (
                <>
                  {topic.select ? (
                    <>
                      <button
                        className="each_ele"
                        onClick={(event) => removetopic(event, topic)}
                        style={{ backgroundColor: "#808080", color: "white" }}
                      >
                        <h>{topic.name}</h>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="each_ele"
                        onClick={(event) => addtopic(event, topic)}
                      >
                        <h>{topic.name}</h>
                      </button>
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>

        <div className="continue_btn_raed">
          <Link to={`/blogs/${topics[0]}`}>
            <button className="cont_btn">Continue</button>
          </Link>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          height: "80px",
          bottom: "0px",
          width: "100%",
          position: "fixed",
        }}
      >
        <hr style={{ width: "99%" }}></hr>
        <p>© 2022 All rights reserved.</p>
      </div>
    </>
  );
}

export default Read;
