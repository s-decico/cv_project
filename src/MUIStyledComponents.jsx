import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";

const WhiteTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: "10px",
    color: "#f0f0ff",
    "& fieldset": {
      borderColor: "rgba(124, 106, 247, 0.2)",
      transition: "border-color 0.2s ease",
    },
    "&:hover fieldset": {
      borderColor: "rgba(124, 106, 247, 0.45)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(124, 106, 247, 0.7)",
      borderWidth: "1.5px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#7070a0",
    fontSize: "0.9rem",
    "&.Mui-focused": {
      color: "#a78bfa",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#f87171",
    marginLeft: "2px",
  },
  "& input": {
    color: "#f0f0ff",
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #16161f inset",
      WebkitTextFillColor: "#f0f0ff",
    },
  },
});

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(135deg, #7c6af7 0%, #a78bfa 100%)",
  border: "none",
  color: "#ffffff",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: "0.9rem",
  letterSpacing: "0.01em",
  borderRadius: "999px",
  padding: "0.65rem 1.5rem",
  textTransform: "none",
  boxShadow: "0 4px 20px rgba(124, 106, 247, 0.35)",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #6b5ae8 0%, #9070f5 100%)",
    boxShadow: "0 6px 28px rgba(124, 106, 247, 0.55)",
    transform: "translateY(-1px)",
    color: "#ffffff",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 12px rgba(124, 106, 247, 0.35)",
  },
  "&:focus": {
    background: "linear-gradient(135deg, #7c6af7 0%, #a78bfa 100%)",
    color: "#ffffff",
  },
  "&.Mui-disabled": {
    background: "rgba(124, 106, 247, 0.3)",
    color: "rgba(255,255,255,0.4)",
  },
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  background: "transparent",
  border: "1px solid rgba(124, 106, 247, 0.3)",
  color: "#a78bfa",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  fontSize: "0.9rem",
  letterSpacing: "0.01em",
  borderRadius: "999px",
  padding: "0.65rem 1.5rem",
  textTransform: "none",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "rgba(124, 106, 247, 0.1)",
    border: "1px solid rgba(124, 106, 247, 0.6)",
    color: "#c4b5fd",
    transform: "translateY(-1px)",
  },
}));

const WhiteDeleteIcon = styled(DeleteIcon)({
  color: "#f87171",
  fontSize: "1.1rem",
});

const WhiteAddIcon = styled(Add)({
  color: "#a78bfa",
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: "90%",
  maxWidth: "1100px",
  margin: "1rem auto 0",
  borderRadius: "999px",
  backdropFilter: "blur(20px)",
  backgroundColor: "rgba(26, 26, 40, 0.85)",
  border: "1px solid rgba(124, 106, 247, 0.15)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    width: "92%",
    borderRadius: "16px",
    margin: "0.75rem auto 0",
  },
}));

export {
  WhiteTextField,
  GradientButton,
  OutlineButton,
  WhiteDeleteIcon,
  WhiteAddIcon,
  StyledAppBar,
};
