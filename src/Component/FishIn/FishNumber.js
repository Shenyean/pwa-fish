import React from "react";
import "./FishNumber.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";
import fishOut from "./8.png";

const FishNumber = (props) => {
  const fishCount = props.fishcount;
  console.log("this is" + fishCount);
  const fishBasket = [];
  for (let i = 0; i < fishCount; i++) {
    fishBasket.push("e");
  }

  return (
    <div className="container apple ">
      {fishBasket.map((fishInBasket) => (
        <div className="fishBasket">
          <img src={fishOut} className="fishOutImg"></img>
        </div>
      ))}
    </div>
  );
};

export default FishNumber;
