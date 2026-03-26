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
import { useGoogleLogin } from "@react-oauth/google";
import cookie from "js-cookie";

function Registration() {
  const isAuthenticated = cookie.get("isAuthenticated");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/cv");
    }
  }, [isAuthenticated, navigate]);

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");

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
    setGoogleError("");

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

  // Google OAuth sign-up — same endpoint as login (backend upserts the user)
  const handleGoogleSignUp = useGoogleLogin({
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
        setGoogleError("Google sign-up failed. Please try again.");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setGoogleError("Google sign-up was cancelled or failed.");
    },
  });

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

        {/* OR divider */}
        <div className="auth_or_divider">
          <span>or</span>
        </div>

        {/* Google Sign-Up Button */}
        <button
          id="reg-google"
          className="google_auth_btn"
          type="button"
          onClick={() => handleGoogleSignUp()}
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
              Sign up with Google
            </>
          )}
        </button>

        {googleError && (
          <div className="auth_error">{googleError}</div>
        )}

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
