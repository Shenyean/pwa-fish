import React from "react";

const ErrorPage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <span>
          <h2>404 Page not found</h2>
          <br />
          <a href="/login">Return back to Login</a>
        </span>

        {/* <iframe src="https://giphy.com/embed/lPuW5AlR9AeWzSsIqi" width="463" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p></p> */}
      </div>
    </>
  );
};

export default ErrorPage;
