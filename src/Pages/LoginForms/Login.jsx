import React from "react";
import { TextField, Button } from "@mui/material";
import { useRef, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const token = cookie.get("token");
  useEffect(() => {
    if (!(token == null || token == undefined)) {
      navigate("/cvinput");
    }
  }, [token]);

  const handleLogin = () => {
    const _email = emailRef.current.value;
    const _password = passwordRef.current.value;
    let UserData = { email: _email, password: md5(_password) };

    axios
      .post("http://localhost:3001/login", UserData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      })
      .then(function (res) {
        console.log("Login Data Sent");
        if (res.status === 200) {
          console.log("You are logged in now");
          navigate("/cvinput");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <TextField
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          inputRef={emailRef}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          inputRef={passwordRef}
        />
        <Button variant="contained" type="button" onClick={handleLogin}>
          Submit
        </Button>
        New to us? Create an account
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Create Account
        </button>
      </div>
    </>
  );
}

export default Login;
