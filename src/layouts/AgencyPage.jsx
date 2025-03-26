import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Link,
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  AddIcCallSharp as AddIcCallSharpIcon,
  SpaceDashboardRounded as SpaceDashboardRoundedIcon,
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import TvIcon from "@mui/icons-material/Tv";
import LogoutIcon from "@mui/icons-material/Logout";




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  // whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function AgencyPage() {
  const [userName, setUserName] = useState("");
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const fetchUserData =  async() => {
    const storedUserid = localStorage.getItem("id");
    const res = await axios.get(`/user/getbyid/${storedUserid}`);
    const storedUserName=res.data.data.name
    setUserName(storedUserName)
    // console.log(userName)
  };

  useEffect(() => {
    fetchUserData();


  }, [])

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        variant="permanent"
        open={open}
        anchor="left"
        sx={{
          width: open ? "220px" : "90px",
          flexShrink: 0,
          height: "660px", // Set the desired height
          "& .MuiDrawer-paper": {
            width: open ? "220px" : "90p", // Force width
            height: "660px", // Ensure the drawer's paper follows this 
            // height
            transition: "width 0.5s ease-in-out",
            overflowY: "auto", // Enable scrolling if content overflows
          },
        }}
      >
        <DrawerHeader>
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Avatar
            alt="User Profile"
            src="/mnt/data/image.png"
            sx={{
               width: open? 64:50, 
               height: open? 64:50,
                mb: 1 }}
          />
          <Typography variant="body1" fontWeight="bold">
            {userName}
          </Typography>
          <Link href="/profile" variant="body2" underline="hover">
            Update Profile
          </Link>
        </Box>

        <List>
          {/* for Home navigation */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemButton
              sx={[
                {
                  height: "40px", 
                  padding: "5px 15px",
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  },
                ]}
              >
                <HomeIcon /> 
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

            {/* for agency dashboard navigation */}
          <ListItem disablePadding onClick={() => navigate("/agency")}>
            <ListItemButton>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>


          {/*  add Screen page  Navigation */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/agency/addscreen");
            }}
          >
            <ListItemButton
              sx={[
                {
                  height: "40px", 
                  minHeight: 32,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  },
                ]}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary="Add Screen"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          {/* view my screen  page navigation */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/agency/myscreens");
            }}
          >
            <ListItemButton
              sx={[
                {
                  height: "40px", 
                  minHeight: 32,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  },
                ]}
              >
                <TvIcon />
              </ListItemIcon>
              <ListItemText
                primary="View My Screens"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />

        <List>
          {/* for Home navigation */}
          {/* <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/addscreen");
            }}
          >
            <ListItemButton
              sx={[
                {
                  height: "40px", 
                  padding: "5px 15px",
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  },
                ]}
              >
                <SpaceDashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Add Screen"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}

          {/*  About page  Navigation */}
          {/* <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/about");
            }}
          >
            <ListItemButton
              sx={[
                {
                  height: "40px", 
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  },
                ]}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="About" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}

          {/* contact page navigation */}

          {/* Contact page navigation with Logout functionality */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              // Remove user ID and role from localStorage
              localStorage.removeItem("id");
              localStorage.removeItem("role");

              // Navigate to login page
              navigate("/signin");
            }}
          >
            <ListItemButton
              sx={{
                height: "40px", 
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",

                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
