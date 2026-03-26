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
import { useGoogleLogin } from "@react-oauth/google";
import "../login.css";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const isAuthenticated = cookie.get("isAuthenticated");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/cv");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    setPasswordIncorrect(false);
    setUserNotFound(false);
    setEmptyEmail(false);
    setEmptyPassword(false);
    setGoogleError("");

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

  // Google OAuth — uses the authorization-code flow (safest for SPAs with a backend)
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      setGoogleError("");
      try {
        const url = process.env.REACT_APP_API_URL + "/auth/google";
        const res = await axios.post(url, { access_token: tokenResponse.access_token }, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.token) {
          cookie.set("token", res.data.token, { secure: true, sameSite: "None" });
          cookie.set("isAuthenticated", true, { secure: true, sameSite: "None" });
          navigate("/cv");
        }
      } catch (err) {
        setGoogleError("Google sign-in failed. Please try again.");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setGoogleError("Google sign-in was cancelled or failed.");
    },
  });

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

        {/* OR divider */}
        <div className="auth_or_divider">
          <span>or</span>
        </div>

        {/* Google Sign-In Button */}
        <button
          id="login-google"
          className="google_auth_btn"
          type="button"
          onClick={() => handleGoogleLogin()}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <CircularProgress size={18} sx={{ color: "#5f6368" }} />
          ) : (
            <>
              <svg className="google_icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        {googleError && (
          <div className="auth_error">{googleError}</div>
        )}

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
