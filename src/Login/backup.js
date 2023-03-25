<div className="loginbox">
  <Formik
    initialValues={{ email: "", password: "" }}
    validationSchema={LoginValidation}
  >
    {({ values, handleChange, setFieldValue }) => (
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        maxWidth="sm"
      >
        <Form noValidate onSubmit={submit}>
          <Stack spacing={2}>
            <TextField
              size="small"
              variant="outlined"
              color="primary"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              placeholder="Enter Email Address."
            />

            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              type="password"
              name="password"
              onChange={(e, value) =>
                setFieldValue("password", values.password)
              }
              placeholder="Enter Password."
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </Form>
      </Grid>
    )}
  </Formik>
</div>;

const submit = (values) => {
  // for testing purpose while thinzar change her PW
  alert(values.shit);
  setIsLoggedin(true);
  const loginDetail = {
    username: values.email,
    deviceToken: "",
    password: values.password,
    origusername: "test",
  };
  axios
    .post(baseURL, loginDetail)
    .then((res) => {
      setLoginStatus(res.data);

      const status = res.data[0].status;
      const token = res.data[0].sessionToken;
      const name = res.data[0].name;

      if (status === "ok") {
        sessionStorage.setItem("sessionToken", token);
        sessionStorage.setItem("email", loginDetail.username);
        sessionStorage.setItem("login", "true");
        sessionStorage.setItem("name", name);
        console.log("good");
        //navigate("/sendFish");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // if (sessionStorage.getItem("login") === "true") {
  //   alert("ture!");
  //   navigate("/sendfish");
  // }
};
