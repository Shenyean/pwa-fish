import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FishPasswordLogin = () => {
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("eMail");
  const [loginStatus, setLoginStatus] = useState();
  const baseURL = "https://fish-uat.globalpsa.com/AuthServer/login/";
  const forgetPWURL = "https://fish-uat.globalpsa.com/AuthServer/getPassword/";
  function forgetPasswordHandler(e) {
    e.preventDefault();
    alert("Please check your email for password reset email " + userEmail);
    axios.post(forgetPWURL, userEmail).then((res) => {
      console.log(res.data[0].status);
    });
  }
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Minimum 8 characters required"),
  });
  const submitHandler = (values, { setFieldError }) => {
    const loginDetail = {
      username: userEmail,
      deviceToken: "",
      password: values.password,
      origusername: "test",
    };
    axios.post(baseURL, loginDetail).then((res) => {
      setLoginStatus(res.data);
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
  };

  return (
    <>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <div className="login">
            <div className="form">
              <Form>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <href onClick={forgetPasswordHandler}>Forget Password?</href>
                <button type="submit">Submit</button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default FishPasswordLogin;
