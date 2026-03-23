import React from "react";
import {
  WhiteTextField,
} from "../../MUIStyledComponents";
import "../cv.css";

function UserDetailsInput({ handleUserDetails, userDetails }) {
  return (
    <>
      <div className="userDetails">
        <WhiteTextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          type="text"
          name="fullname"
          value={userDetails ? userDetails.fullname : ""}
          onChange={handleUserDetails}
        />
        <WhiteTextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          value={userDetails ? userDetails.email : ""}
          onChange={handleUserDetails}
        />
        <WhiteTextField
          id="outlined-basic"
          label="Phone no"
          variant="outlined"
          type="text"
          name="phno"
          value={userDetails ? userDetails.phno : ""}
          onChange={handleUserDetails}
        />
        <WhiteTextField
          id="outlined-basic"
          label="Address"
          variant="outlined"
          type="text"
          name="address"
          value={userDetails ? userDetails.address : ""}
          onChange={handleUserDetails}
        />
        <WhiteTextField
          id="outlined-basic"
          label="LinkedIn URL"
          variant="outlined"
          type="text"
          name="linkedin"
          value={userDetails ? userDetails.linkedin : ""}
          onChange={handleUserDetails}
        />
        <WhiteTextField
          id="outlined-basic"
          label="Github URL"
          variant="outlined"
          type="text"
          name="github"
          value={userDetails ? userDetails.github : ""}
          onChange={handleUserDetails}
        />
      </div>
    </>
  );
}

export default UserDetailsInput;
