import axios from "axios";
import { Formik, Field } from "formik";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./FishLogin.css";
import { IntlProvider, FormattedMessage, useIntl } from "react-intl";
import messages from "../Component/Message/messages";
import "./RememberMe.css";
import ForgetPassword from "./ForgetPassword";
import { TextField } from "@mui/material";

const FishLogin = () => {
  const baseURL = "https://fish-uat.globalpsa.com/AuthServer/getOktaUser/";
  const loginURL = "https://fish-uat.globalpsa.com/AuthServer/login/";
  const oktaURL = "https://fish-uat.globalpsa.com/login/";
  const forgetPasswordURL =
    "https://fish-uat.globalpsa.com/AuthServer/getPassword";
  const [oktaStatus, setOktaStatus] = useState();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [remember, setRemember] = useState(false);
  const [locale, setLocale] = useState("en");

  //const intl = useIntl();
  useEffect(() => {
    const emailValue = localStorage.getItem("email");
    console.log("email: " + emailValue);

    const rememberMeValue = localStorage.getItem("rememberMe");
    console.log(rememberMeValue);
    if (emailValue && rememberMeValue) {
      setEmail(emailValue);
      setRemember(JSON.parse(rememberMeValue));
    }
  }, []);

  useMemo(() => {
    const emailValue = localStorage.getItem("email");
    setEmail(emailValue);
  }, [email]);

  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
    sessionStorage.setItem("locale", e.target.value);
  };

  function handleEmailChange(event) {
    setEmail(event.target.value);
    localStorage.setItem("email", email);
  }

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="loginbg">
        {/* <div className="loginitems"> */}
        <Formik
          initialValues={{ email: email, language: "" }}
          onSubmit={(values, { setFieldError }) => {
            console.log("step 1 done!");

            const emailDetail = {
              username: values.email,
              deviceToken: "",
              password: "",
              origusername: "",
            };
            const loginDetail = {
              username: values.email,
              deviceToken: "",
              password: values.password,
              origusername: "",
            };
            console.log(emailDetail.username);
            if (showPassword === false) {
              if (!values.email) {
                setFieldError("email", "Please Enter Email");
              } else {
                if (rememberMe) {
                  localStorage.setItem("email", emailDetail.username);
                }
                if (!rememberMe) {
                  localStorage.setItem("email", "");
                }
                axios
                  .post(baseURL, emailDetail)
                  .then((res) => {
                    const OktaStatus = res.data[0].isOkta;
                    console.log("ok Status" + OktaStatus);
                    if (OktaStatus === "n") {
                      sessionStorage.setItem("eMail", values.email);

                      console.log(values.email);
                      setShowPassword(true);
                    }
                    if (OktaStatus === "y") {
                      window.location.assign(oktaURL);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            } else {
              axios.post(loginURL, loginDetail).then((res) => {
                // setLoginStatus(res.data);
                const status = res.data[0].status;
                const token = res.data[0].sessionToken;
                const name = res.data[0].name;
                console.log(status);
                if (status === "ok") {
                  sessionStorage.setItem("sessionToken", token);
                  sessionStorage.setItem("email", loginDetail.username);
                  sessionStorage.setItem("login", "true");
                  sessionStorage.setItem("name", name);

                  console.log("good");
                  navigate("/sendFish");
                } else {
                  setFieldError("password", "Incorrect Password");
                }
              });
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login" dir={locale === "ar" ? "rtl" : "ltr"}>
              <div className="login-form">
                <div className="left"></div>
                <div className="right">
                  <form className="form-right" onSubmit={handleSubmit}>
                    <div className="login-group">
                      <label className="selectLanguage">
                        {" "}
                        <FormattedMessage id="selectlanguage" />
                      </label>
                      <select
                        className="languages"
                        name="language"
                        onChange={handleLocaleChange}
                      >
                        <option value="en" label="ENGLISH"></option>
                        <option value="id" label="BAHASA INDONESIA"></option>
                        <option value="zh" label="CHINESE"></option>
                        <option value="nl" label="DUTCH"></option>
                        <option value="it" label="ITALIAN"></option>
                        <option value="ko" label="KOREAN"></option>
                        <option value="tr" label="TURKISH"></option>
                        <option value="ar" label="ARABIC"></option>
                      </select>
                    </div>
                    <div>
                      <div className="login-group">
                        <div>
                          <Field
                            name="email"
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={
                                  <FormattedMessage
                                    id="email"
                                    defaultMessage="Test"
                                  />
                                }
                                variant="standard"
                                size="small"
                                error={touched.email && errors.email}
                                //helperText={touched.name && errors.name}
                              />
                            )}
                          />
                          {/* <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            label="Email ID"
                            // placeholder="Enter email id / username"
                            // className="form-control inp_text"
                            id="email"
                          ></input> */}
                          <div>
                            {errors.email && touched.email ? (
                              <div>{errors.email}</div>
                            ) : null}
                          </div>
                          <div>
                            <div className="rememberme">
                              <input
                                type="checkbox"
                                checked={remember}
                                onChange={(event) => {
                                  setRemember(event.target.checked);
                                  const isChecked = event.target.checked;
                                  if (isChecked) {
                                    localStorage.setItem(
                                      "rememberMe",
                                      JSON.stringify(isChecked)
                                    );
                                    localStorage.setItem("email", values.email);
                                  } else {
                                    localStorage.removeItem("rememberMe");
                                    localStorage.setItem("email", "");
                                  }
                                }}
                              />
                              <label className="selectLanguage">
                                <FormattedMessage id="rememberme" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {showPassword && (
                        <div className="login-group">
                          {/* <label className="login-password">
                            <FormattedMessage id="password" />
                          </label> */}
                          <div>
                            {/* <input
                              type="password"
                              name="password"
                              onChange={handleChange}
                              value={values.password}
                            ></input> */}
                            <Field
                              name="password"
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  type="password"
                                  label={
                                    <FormattedMessage
                                      id="password"
                                      defaultMessage="Test"
                                    />
                                  }
                                  InputLabelProps={{
                                    classes: {
                                      root: { minWidth: "200px" },
                                    },
                                  }}
                                  variant="standard"
                                  size="small"
                                  error={touched.password && errors.password}
                                  //helperText={touched.name && errors.name}
                                />
                              )}
                            />
                            <div className>
                              <ForgetPassword
                                locale={locale}
                                email={values.email}
                              />
                            </div>
                            <div>
                              {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="terms">
                          <FormattedMessage id="terms" />
                        </span>
                      </div>
                    </div>
                    <div className="submitbtn ">
                      <button type="submit">
                        <FormattedMessage id="login" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="warning-terms">
                WARNING: Access to information on this machine and network is
                restricted to authorised personnel only. Any unauthorised user
                is subject to criminal prosecution under the Computer Misuse Act
                1993.
              </div>
            </div>
          )}
        </Formik>

        {/* </div> */}
      </div>
    </IntlProvider>
  );
};

export default FishLogin;
