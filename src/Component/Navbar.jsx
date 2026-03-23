import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Login, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GradientButton, StyledAppBar } from "../MUIStyledComponents";
import cookie from "js-cookie";

const pages = ["Home", "My CV"];
const settings = ["My CV", "Logout"];

function Navbar() {
  const isAuthenticated = cookie.get("isAuthenticated");
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    cookie.remove("token");
    cookie.remove("isAuthenticated");
    navigate("/");
  };

  const navbarSwitch = (key) => {
    switch (key) {
      case "Home": navigate("/"); break;
      case "My CV": navigate("/cv"); break;
      default: navigate("/"); break;
    }
  };

  return (
    <StyledAppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 0.75,
          }}
        >
          {/* Logo */}
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                background: "linear-gradient(135deg, #7c6af7 0%, #a78bfa 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
              }}
            >
              📄
            </Box>
            <Typography
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                color: "#f0f0ff",
                display: { xs: "none", sm: "block" },
              }}
            >
              Resumate
            </Typography>
          </Box>

          {/* Desktop nav links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => { handleCloseNavMenu(); navbarSwitch(page); }}
                sx={{
                  color: "#a0a0c0",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.75,
                  "&:hover": {
                    color: "#f0f0ff",
                    backgroundColor: "rgba(124, 106, 247, 0.08)",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Account menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(124, 106, 247, 0.2)",
                        border: "1.5px solid rgba(124, 106, 247, 0.4)",
                        width: 34,
                        height: 34,
                      }}
                    >
                      <Person sx={{ color: "#a78bfa", fontSize: "1.1rem" }} />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "50px" }}
                  id="user-menu"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#1e1e2e",
                      border: "1px solid rgba(124, 106, 247, 0.15)",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      minWidth: 150,
                    },
                  }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Logout") handleLogout();
                        if (setting === "My CV") navigate("/cv");
                      }}
                      sx={{
                        color: setting === "Logout" ? "#f87171" : "#d0d0f0",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.875rem",
                        py: 1,
                        "&:hover": {
                          background: "rgba(124, 106, 247, 0.08)",
                        },
                      }}
                    >
                      {setting}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <GradientButton
                startIcon={<Login sx={{ fontSize: "0.9rem !important" }} />}
                onClick={() => navigate("/login")}
                sx={{ fontSize: "0.85rem", py: 0.7, px: 2 }}
              >
                Sign In
              </GradientButton>
            )}

            {/* Mobile hamburger */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="small"
                onClick={handleOpenNavMenu}
                sx={{ color: "#a0a0c0" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="mobile-nav"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
                PaperProps={{
                  sx: {
                    backgroundColor: "#1e1e2e",
                    border: "1px solid rgba(124, 106, 247, 0.15)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    minWidth: 150,
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => { handleCloseNavMenu(); navbarSwitch(page); }}
                    sx={{
                      color: "#d0d0f0",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                      "&:hover": { background: "rgba(124, 106, 247, 0.08)" },
                    }}
                  >
                    {page}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Box>
      </Container>
    </StyledAppBar>
  );
}

export default Navbar;
