import React, { useState } from "react";
import { TextField, Button, Divider } from "@mui/material";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
  WhiteAddIcon,
} from "../../MUIStyledComponents";
import { Add } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function InterestsInput({ interests, setInterests }) {
  const [inputValue, setInputValue] = useState("");
  const handleInterestDelete = (index) => {
    console.log(index);
    let temp = [...interests];
    temp.splice(index, 1);
    setInterests(temp);
    console.log(temp);
  };
  return (
    <>
      <div className="skillLangIntMain">
        <div className="skillLangIntInput">
          <WhiteTextField
            id="outlined-basic"
            label="Type your interests"
            variant="outlined"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />

          <IconButton
            aria-label="add"
            onClick={() => {
              setInterests([...interests, inputValue]);
              setInputValue("");
            }}
          >
            <WhiteAddIcon />
          </IconButton>
        </div>
        <div className="skillLangIntdisplay">
          {interests.map((x, index) => {
            return (
              <>
                <div className="skillLangIntdisplayunit">
                  {x}
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleInterestDelete(index)}
                  >
                    <WhiteDeleteIcon />
                  </IconButton>
                </div>
                <Divider />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default InterestsInput;
