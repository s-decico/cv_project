import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 0.5,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            backgroundColor: "rgba(124, 106, 247, 0.12)",
            height: "6px",
            borderRadius: "999px",
            "& .MuiLinearProgress-barColorPrimary": {
              background: "linear-gradient(90deg, #7c6af7, #a78bfa)",
              borderRadius: "999px",
            },
          }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: "#a78bfa",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.78rem",
          fontWeight: 600,
          minWidth: "40px",
          textAlign: "right",
        }}
      >
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ currentPage }) {
  const [progress, setProgress] = React.useState(1);

  React.useEffect(() => {
    setProgress(Math.round((currentPage / 6) * 100));
  }, [currentPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
