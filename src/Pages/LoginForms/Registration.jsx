import React from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import "../login.css";
import Navbar from "../../Component/Navbar";
import { Google } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
} from "../../MUIStyledComponents";
import cookie from "js-cookie";

function Registration() {
  const isAuthenticated = cookie.get("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/cv");
    }
  }, [isAuthenticated]);

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };
  const isValidName = (name) => {
    return nameRegex.test(name);
  };

  const handleRegistration = () => {
    setEmptyEmail(false);
    setEmptyName(false);
    setEmptyPassword(false);
    const _email = emailRef.current.value;
    const _password = passwordRef.current.value;
    const _name = nameRef.current.value;

    if (_email && _password && _name) {
      setLoading(true);
      if (isValidEmail(_email) && isValidName(_name)) {
        let UserData = { name: _name, email: _email, password: md5(_password) };
        let url = process.env.REACT_APP_API_URL + "/register";
        axios
          .post(url, UserData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("Registration Data Sent");
              navigate("/cv");
            } else navigate("/register");
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (!isValidEmail(_email)) {
        setEmptyEmail(true);
        setLoading(false);
      } else if (!isValidName(_name)) {
        setEmptyName(true);
        setLoading(false);
      }
    } else {
      setLoading(false);
      if (!_email) setEmptyEmail(true);
      if (!_name) setEmptyName(true);
      if (!_password) setEmptyPassword(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="reg_container">
        <div className="headingLogin">Register with us</div>
        <WhiteTextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          inputRef={nameRef}
          error={emptyName}
          sx={{ width: "100%" }}
          helperText={
            emptyName ? "Name cannot be empty or has special characters" : ""
          }
        />
        <WhiteTextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          inputRef={emailRef}
          error={emptyEmail}
          sx={{ width: "100%" }}
          helperText={emptyEmail ? "Email cannot be empty or invalid" : ""}
        />
        <WhiteTextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          inputRef={passwordRef}
          error={emptyPassword}
          sx={{ width: "100%" }}
          helperText={emptyPassword ? "Password cannot be empty" : ""}
        />
        <GradientButton
          variant="contained"
          type="button"
          onClick={handleRegistration}
          sx={{
            width: "100%",
            backgroundColor: "#ce4949",
            border: "2px solid #ce4949",
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#FFF" }} />
          ) : (
            "Submit"
          )}
        </GradientButton>
        <span className="reg_login">
          Already have an account?
          <GradientButton
            variant="contained"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </GradientButton>
        </span>
      </div>
    </>
  );
}

export default Registration;
