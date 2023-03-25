import React, { useState, useEffect } from "react";
import "./FishDate.css";

const FishDate = (props) => {
  const [screenwidth, setScreenWidth] = useState(window.innerwidth);

  const date = new Date(props.date);
  const month = date.toLocaleString("en-US", { month: "long" });
  const monthSmall = date.toLocaleString("en-US", { month: "short" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="expense-date">
      {screenwidth < 600 ? (
        <div className="expense-date__month">{month}</div>
      ) : (
        <div className="expense-date__month">{monthSmall}</div>
      )}

      <div className="expense-date__day">{day}</div>
      <div className="expense-date__year">{year}</div>
    </div>
  );
};

export default FishDate;
