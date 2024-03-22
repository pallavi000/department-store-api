import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/reducers/authReducer";
import { fetchAllCategories } from "../../redux/reducers/categoriesReducer";

const pages = ["Products", "Pricing", "Blog"];

function UserNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, access_token, totalOrderQuantity, categories } = useSelector(
    (state: AppState) => ({
      user: state.auth.user,
      access_token: state.auth.access_token,
      totalOrderQuantity: state.carts.totalOrderQuantity,
      categories: state.categories.categories,
    })
  );
  console.log(categories);

  React.useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  React.useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"}>Home</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {categories &&
                categories.map((category) => (
                  <MenuItem key={category._id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to={`/product-category/${category._id}`}>
                        {category.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"}>LOGO</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {categories &&
              categories.map((category) => (
                <Typography textAlign="center">
                  <Link to={`/product-category/${category._id}`}>
                    {category.name}
                  </Link>
                </Typography>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!isLoggedIn ? (
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <Button variant="contained">
                  <Link to={"/sign-in"}>Sign In</Link>
                </Button>
                <Button variant="contained">
                  <Link to={"/sign-up"}>Sign Up</Link>
                </Button>
              </Stack>
            ) : (
              <Stack alignItems={"center"} flexDirection={"row"} gap={3}>
                <Box sx={{ position: "relative" }}>
                  <Typography
                    variant="body2"
                    sx={{ position: "absolute", top: -15, right: 5 }}
                  >
                    {totalOrderQuantity}
                  </Typography>
                  <ShoppingCart />
                </Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.name}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to={"/profile"}>
                  <Typography textAlign="center" variant="body2">
                    Profile
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={() => dispatch(logout({}))}>
                <Typography variant="body2">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserNavBar;
