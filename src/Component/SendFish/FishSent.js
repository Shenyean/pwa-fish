import React from "react";
import "./FishSent.css";
import background from "./background8.png";

const FishSent = () => {
  const toEmail = sessionStorage.getItem("sentEmail");
  return (
    <div
      className="fishSent"
      // style={{
      //   backgroundImage: `url(${background})`,
      //   backgroundSize: "cover",
      // }}
    >
      <p>Fish Message Sent successfully to {toEmail} </p>
    </div>
  );
};

export default FishSent;
