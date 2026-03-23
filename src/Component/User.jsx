import React from "react";
import usericon from "../Images/user.png";
import "./header.css";

function User() {
  return (
    <div>
      <img src={usericon} alt="User" className="userimg" />
    </div>
  );
}

export default User;
