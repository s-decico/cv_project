import React from "react";
import { CircularProgress } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import Navbar from "../../Component/Navbar";
import {
  WhiteTextField,
  GradientButton,
} from "../../MUIStyledComponents";
import "../login.css";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const isAuthenticated = cookie.get("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/cv");
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setPasswordIncorrect(false);
    setUserNotFound(false);
    setEmptyEmail(false);
    setEmptyPassword(false);

    const _email = emailRef.current.value;
    const _password = passwordRef.current.value;

    if (_email && _password) {
      setLoading(true);
      let UserData = { email: _email, password: md5(_password) };
      let url = process.env.REACT_APP_API_URL + "/login";
      axios
        .post(url, UserData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        })
        .then(function (res) {
          if (res.status === 200) {
            if (res.data) {
              const tokenValue = res.data.token;
              const isAuthenticatedValue = res.data.isAuthenticated;
              if (tokenValue && isAuthenticatedValue) {
                cookie.set("token", tokenValue, { secure: true, sameSite: "None" });
                cookie.set("isAuthenticated", isAuthenticatedValue, { secure: true, sameSite: "None" });
              }
            }
            navigate("/cv");
          }
        })
        .catch(function (err) {
          setLoading(false);
          if (err && err.response) {
            if (err.response.status === 401) setPasswordIncorrect(true);
            else if (err.response.status === 404) setUserNotFound(true);
          }
        })
        .finally(() => setLoading(false));
    } else {
      if (!_email) setEmptyEmail(true);
      if (!_password) setEmptyPassword(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="auth_page">
      <Navbar />
      <div className="login_container">
        <div className="auth_header">
          <div className="auth_logo">🔐</div>
          <div className="headingLogin">Welcome back</div>
          <p className="auth_subtitle">Sign in to your Resumate account</p>
        </div>

        <WhiteTextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          id="login-email"
          inputRef={emailRef}
          error={userNotFound || emptyEmail}
          helperText={
            userNotFound
              ? "No account found with this email"
              : emptyEmail
              ? "Email is required"
              : ""
          }
          sx={{ width: "100%" }}
          onKeyDown={handleKeyDown}
        />
        <WhiteTextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          id="login-password"
          inputRef={passwordRef}
          error={passwordIncorrect || emptyPassword}
          helperText={
            passwordIncorrect
              ? "Incorrect password"
              : emptyPassword
              ? "Password is required"
              : ""
          }
          sx={{ width: "100%" }}
          onKeyDown={handleKeyDown}
        />

        <GradientButton
          id="login-submit"
          variant="contained"
          type="button"
          onClick={handleLogin}
          sx={{ width: "100%", py: 1.1 }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Sign In"
          )}
        </GradientButton>

        <div className="auth_divider">
          <span>Don't have an account?</span>
        </div>

        <div className="auth_switch">
          <GradientButton
            id="go-to-register"
            variant="outlined"
            type="button"
            onClick={() => navigate("/register")}
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
            Create Account
          </GradientButton>
        </div>
      </div>
    </div>
  );
}

export default Login;
