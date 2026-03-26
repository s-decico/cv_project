import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/system";
import { MuiThemeContext } from "./MuiThemeContext";
import Home from "./Pages/Home";
import Login from "./Pages/LoginForms/Login";
import Registration from "./Pages/LoginForms/Registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CVInputBox from "./Pages/CVInputBox";
import CVBox from "./Pages/CVBox";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <ThemeProvider theme={MuiThemeContext}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cvinput" element={<CVInputBox />} />
            <Route path="/cv" element={<CVBox />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
