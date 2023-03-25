import "./FishNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import inbin from "./inBin.png";
import outbin from "./outBin.png";

const FishNavBar = () => {
  // const onClickHandler = (e) => {
  //   e.preventDefault();
  //   sessionStorage.setItem("login", "out");
  //   console.log(sessionStorage.getItem("login"));
  //   navigate("/logout");
  // };
  const name = sessionStorage.getItem("name");
  const handleLogout = () => {
    sessionStorage.clear();
  };
  const baseURL = "https://fish-uat.globalpsa.com/AuthServer/getInOutCount";
  const [fishescount, setFishesCount] = useState([]);
  const sessionToken = sessionStorage.getItem("sessionToken");
  const sessionDetails = {
    username: sessionToken,
  };

  useEffect(() => {
    axios
      .post(baseURL, sessionDetails)
      .then((res) => {
        setFishesCount(res.data);
        console.log(res.data.totalfishin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Nav className="Navbar">
      <span className="nav-user">{name}</span>

      <div className="nav-items">
        <a href="/Inbox">
          <img src={inbin} className="inbin"></img>
          {fishescount.totalfishin}
        </a>
        <a href="/OutBox">
          <img src={outbin} className="outbin"></img>
          {fishescount.totalfishout}
        </a>
      </div>
    </Nav>
  );
};

export default FishNavBar;
