import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { createSearchParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useFormik, Field, FormikProvider, Form, Formik } from "formik";
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import apple from "./sendbtn.png";
import "./FishForm.css";
import ballon from "./FishBallon.png";
// import background from "./background8.png";

const FishForm = () => {
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name,
  });

  const navigate = useNavigate();
  const [apiValues, setApiValues] = useState([]);
  const CustomizedSelectForFormik = ({ children, form, field }) => {
    const { name, value } = field;
    const { setFieldValue } = form;
    return (
      <Select
        name={name}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
        }}
        style={{
          borderRadius: "0",
          height: "1.5em",
          border: "solid",
          borderWidth: "5px",
          borderColor: "#000000",
          borderStyle: "solid",
          borderBottomWidth: "2px",
          borderLeftWidth: "2px",
          borderRightWidth: "2px",
          borderTopWidth: "2px",
          width: "250px",
        }}
      >
        {children}
      </Select>
    );
  };
  const baseURL = "https://fish-uat.globalpsa.com/AuthServer/sendFish/";
  const sessionToken = sessionStorage.getItem("sessionToken");
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const initialValues = {
    recipients: [],
    message: "",
    fishes: 4,
    cc: [],
  };
  const submit = (values) => {
    console.log(JSON.stringify(values, null, 2));

    const recipientsId = [values.recipients.id];
    const fishesNumber = values.fishes;
    const fishnumber = [];
    for (var i = 0; i < fishesNumber; i++) {
      fishnumber.push(1);
    }
    const ccID = [values.cc.id];
    const message = values.message;
    const recipientsEmail = [values.recipients.userid];
    sessionStorage.setItem("sentEmail", recipientsEmail);

    const fishesValue = {
      source: "web",
      principle1: "Yes",
      principle2: "Yes",
      principle3: "Yes",
      principle4: "Yes",
      username: sessionToken,
      recipients: recipientsId,
      message: message,
      fishes: fishnumber,
      cc: ccID,
      principleText: "Hello World Text",
      language: "EN",
    };
    console.log(fishesValue);
    axios
      .post(baseURL, fishesValue)
      .then((res) => {
        console.log("sent" + res.data[0]);
        setApiValues(res.data[0]);
        navigate("/fishSent");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/get").then((res) => {
      setNameList(res.data);
      console.log("success");
    });
  }, []);

  return (
    <div
      className="fishFormContent"
      // style={{
      //   backgroundImage: `url(${background})`,
      //   backgroundSize: "1400px 560px",
      // }}
    >
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ handleChange, values, setFieldValue }) => (
          // <Container maxWidth="sm">
          <Form className="form-big">
            {/* <Stack spacing={2}> */}

            <div className="form-left">
              <div className="fish-left-inside">
                <div className="fish-today">
                  {" "}
                  <span className="send-word">SEND</span>{" "}
                  <span className="bold-fish">FISH </span>
                  <span className="today-word">TODAY</span>{" "}
                </div>

                <Autocomplete
                  filterOptions={filterOptions}
                  disablePortal
                  className="recipients-field"
                  name="recipients"
                  id="recipients"
                  options={nameList}
                  getOptionLabel={(option) =>
                    option.name + " , " + option.userid
                  }
                  onChange={(e, value) =>
                    setFieldValue(
                      "recipients",
                      value !== null ? value : initialValues.recipients
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      className="reciepient-text"
                      label="TO:"
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          paddingLeft: "20px !important",
                          borderRadius: "15px",
                          height: "40px",
                        },
                      }}
                      // InputProps={{
                      //   style: {
                      //     alignSelf: "center",
                      //     borderRadius: "25px",
                      //     height: "35px",
                      //   },
                      // }}
                    />
                  )}
                ></Autocomplete>
                <Autocomplete
                  filterOptions={filterOptions}
                  disablePortal
                  name="cc"
                  id="cc"
                  options={nameList}
                  getOptionLabel={(option) =>
                    option.name + " , " + option.userid
                  }
                  onChange={(e, value) =>
                    setFieldValue(
                      "cc",
                      value !== null ? value : initialValues.cc
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="CC:"
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          paddingLeft: "20px !important",
                          borderRadius: "15px",
                          height: "40px",
                        },
                      }}
                      name="cc"
                    />
                  )}
                ></Autocomplete>
                <div className="form-fishNumber">
                  <span>NUMBER OF FISHES:</span>
                  <FormControl>
                    <Field name="fishes" component={CustomizedSelectForFormik}>
                      <MenuItem value={1}>One</MenuItem>
                      <MenuItem value={2}>Two</MenuItem>
                      <MenuItem value={3}>Three</MenuItem>
                      <MenuItem value={4}>Four</MenuItem>
                    </Field>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="form-right">
              <div className="fish-right-inside">
                <div className="message-title">
                  <span>Your Message</span>
                </div>
                <div className="textfield-with-lines">
                  <TextField
                    id="message-multiline"
                    name="message"
                    multiline="true"
                    minRows={8}
                    onChange={handleChange}
                    value={values.message}
                    variant="standard"
                    InputProps={{
                      style: {
                        borderRadius: "25px",
                        zIndex: 1,
                        width: "400px",
                      },
                      disableUnderline: true,
                      className: "MuiInputBase-input",
                      startAdornment: (
                        <div className="lines">
                          <div className="lines-inner"></div>
                        </div>
                      ),
                    }}
                  ></TextField>
                </div>
                <div className="fish-send-btn">
                  {" "}
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Button className="send-btn" type="submit">
                      <img src={apple} />
                    </Button>
                  </Box>
                </div>
              </div>
              <div>BROUGHT TO YOU BY GROUP HR AND GROUP IT</div>
              {/* </Stack> */}
            </div>
          </Form>
          // </Container>
        )}
      </Formik>
    </div>
  );
};

export default FishForm;
