import React, { Component, useEffect } from "react";
import "./App.css";
import FishNavBar from "./Component/Navigation/FishNavBar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Footer from "./Component/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Inbox from "./Component/FishIn/Inbox";
import Outbox from "./Component/FishOut/Outbox";
import FishForm from "./Component/SendFish/FishForm";
import FishSent from "./Component/SendFish/FishSent";
import PWAPrompt from "react-ios-pwa-prompt";

import Logout from "./Login/Logout";
import { HomeLayout } from "./Component/HomeLayout/HomeLayout";
import ProtectedLayout from "./Component/ProtectedLayout/ProtectedLayout";
import ErrorPage from "./Component/Error/ErrorPage";
import FishLogin from "./Login/FishLogin";
import FishPasswordLogin from "./Login/FishPasswordLogin";
function App() {
  const [isLoggedin, setIsLoggedin] = useState(
    sessionStorage.getItem("login") || false
  );
  const [locale, setLocale] = useState("en");
  const [currentUser, setCurrentUser] = useState(undefined);
  // const loginDetail = {
  //   username: "missthinzar.4th@gmail.com",
  //   deviceToken: "",
  //   password: "Test@1234",
  //   origusername: "test",
  // };
  // const email = loginDetail.username;
  // const baseURL = "https://fish-uat.globalpsa.com/AuthServer/login/";
  // const [loginStatus, setLoginStatus] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("login") === "true") {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }

    if (!sessionStorage.getItem("locale")) {
      sessionStorage.setItem("locale", "en");
    }
    const sessionLocale = sessionStorage.getItem("locale");
    setLocale(sessionLocale);
  }, [isLoggedin]);
  // }, []);
  // const onClickHandler = (e) => {
  //   e.preventDefault();

  // };
  console.log(isLoggedin);
  return (
    <>
      <div className="background">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<FishLogin />} />
            <Route path="/fishPassword" element={<FishPasswordLogin />} />
            <Route element={<ProtectedLayout />}>
              <Route element={<HomeLayout />}>
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/sendFish" element={<FishForm />} />
                <Route path="/outbox" element={<Outbox />} />
                <Route path="/fishSent" element={<FishSent />} />
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Route>
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Router>

        <div></div>
      </div>
    </>
  );
}

export default App;
