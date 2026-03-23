import React from "react";
import { CircularProgress } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import "../login.css";
import Navbar from "../../Component/Navbar";
import {
  WhiteTextField,
  GradientButton,
} from "../../MUIStyledComponents";
import cookie from "js-cookie";

function Registration() {
  const isAuthenticated = cookie.get("isAuthenticated");
  const navigate = useNavigate();

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  const isValidEmail = (email) => emailRegex.test(email);
  const isValidName = (name) => nameRegex.test(name);

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
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((res) => {
            if (res.status === 200) navigate("/cv");
            else navigate("/register");
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          })
          .finally(() => setLoading(false));
      } else {
        if (!isValidEmail(_email)) { setEmptyEmail(true); setLoading(false); }
        else if (!isValidName(_name)) { setEmptyName(true); setLoading(false); }
      }
    } else {
      setLoading(false);
      if (!_email) setEmptyEmail(true);
      if (!_name) setEmptyName(true);
      if (!_password) setEmptyPassword(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegistration();
  };

  return (
    <div className="auth_page">
      <Navbar />
      <div className="reg_container">
        <div className="auth_header">
          <div className="auth_logo">✨</div>
          <div className="headingLogin">Create account</div>
          <p className="auth_subtitle">Start building your professional CV today</p>
        </div>

        <WhiteTextField
          label="Full Name"
          variant="outlined"
          type="text"
          name="name"
          id="reg-name"
          inputRef={nameRef}
          error={emptyName}
          helperText={emptyName ? "Name is required (letters only)" : ""}
          sx={{ width: "100%" }}
          onKeyDown={handleKeyDown}
        />
        <WhiteTextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          id="reg-email"
          inputRef={emailRef}
          error={emptyEmail}
          helperText={emptyEmail ? "Enter a valid email" : ""}
          sx={{ width: "100%" }}
          onKeyDown={handleKeyDown}
        />
        <WhiteTextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          id="reg-password"
          inputRef={passwordRef}
          error={emptyPassword}
          helperText={emptyPassword ? "Password is required" : ""}
          sx={{ width: "100%" }}
          onKeyDown={handleKeyDown}
        />

        <GradientButton
          id="reg-submit"
          variant="contained"
          type="button"
          onClick={handleRegistration}
          sx={{ width: "100%", py: 1.1 }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Create Account"
          )}
        </GradientButton>

        <div className="auth_divider">
          <span>Already have an account?</span>
        </div>

        <GradientButton
          id="go-to-login"
          type="button"
          onClick={() => navigate("/login")}
          sx={{
            width: "100%",
            py: 1,
            background: "transparent",
            border: "1px solid rgba(124, 106, 247, 0.3)",
            color: "#a78bfa",
            "&:hover": {
              background: "rgba(124, 106, 247, 0.08)",
              border: "1px solid rgba(124, 106, 247, 0.6)",
              color: "#c4b5fd",
              transform: "translateY(-1px)",
            },
          }}
        >
          Sign In
        </GradientButton>
      </div>
    </div>
  );
}

export default Registration;
