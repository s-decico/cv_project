import React from "react";
import {
  WhiteTextField,
} from "../../MUIStyledComponents";
import { STRINGS } from "../../Constants/strings";
import "../cv.css";

function UserDetailsInput({ handleUserDetails, userDetails, errors }) {
  return (
    <>
      <div className="userDetails">
        <WhiteTextField
          id="outlined-basic"
          label={STRINGS.LABELS.FULL_NAME}
          variant="outlined"
          type="text"
          name="fullname"
          value={userDetails?.fullname || ""}
          onChange={handleUserDetails}
          error={!!errors?.fullname}
          helperText={errors?.fullname}
        />
        <WhiteTextField
          id="outlined-basic"
          label={STRINGS.LABELS.EMAIL}
          variant="outlined"
          type="text"
          name="email"
          value={userDetails?.email || ""}
          onChange={handleUserDetails}
          error={!!errors?.email}
          helperText={errors?.email}
        />
        <WhiteTextField
          id="outlined-basic"
          label={STRINGS.LABELS.PHNO}
          variant="outlined"
          type="text"
          name="phno"
          value={userDetails?.phno || ""}
          onChange={handleUserDetails}
          error={!!errors?.phno}
          helperText={errors?.phno}
        />
        <WhiteTextField
          id="outlined-basic"
          label={STRINGS.LABELS.ADDRESS}
          variant="outlined"
          type="text"
          name="address"
          value={userDetails?.address || ""}
          onChange={handleUserDetails}
          error={!!errors?.address}
          helperText={errors?.address}
        />
        <WhiteTextField
          id="outlined-basic"
          label={STRINGS.LABELS.LINKEDIN}
          variant="outlined"
          type="text"
          name="linkedin"
          value={userDetails?.linkedin || ""}
          onChange={handleUserDetails}
          error={!!errors?.linkedin}
          helperText={errors?.linkedin}
        />
        <WhiteTextField
          id="outlined-basic"
          label={STRINGS.LABELS.GITHUB}
          variant="outlined"
          type="text"
          name="github"
          value={userDetails?.github || ""}
          onChange={handleUserDetails}
          error={!!errors?.github}
          helperText={errors?.github}
        />
      </div>
    </>
  );
}

export default UserDetailsInput;
