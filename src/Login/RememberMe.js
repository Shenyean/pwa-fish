import React, { useState } from "react";
import { useEffect } from "react";
import "./RememberMe.css";

function RememberMe() {
  const [remember, setRemember] = useState(false);
  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue) {
      setRemember(JSON.parse(rememberMeValue));
    }
  });

  function handleChange(event) {
    setRemember(event.target.checked);
    const isChecked = event.target.checked;
    if (isChecked) {
      localStorage.setItem("rememberMe", JSON.stringify(isChecked));
      localStorage.setItem("email");
    } else {
      localStorage.removeItem("rememberMe");
    }
  }

  return (
    <div className="rememberme">
      <input type="checkbox" checked={remember} onChange={handleChange} />
      <label>REMEMBER ME</label>
    </div>
  );
}

export default RememberMe;
