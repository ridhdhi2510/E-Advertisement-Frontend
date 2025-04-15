import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import RemoveFromQueueRoundedIcon from '@mui/icons-material/RemoveFromQueueRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { useTheme, useMediaQuery } from "@mui/material";
import {
  Link,
  Box,
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
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { styled } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  MoveToInbox as InboxIcon,
} from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { Delete as DeleteIcon } from '@mui/icons-material';


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

// eslint-disable-next-line no-unused-vars
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

export default function UserPage() {
  const [userName, setUserName] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isSmallScreen);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const fetchUserData = async () => {
    const storedUserid = localStorage.getItem("id");
    const res = await axios.get(`/user/getbyid/${storedUserid}`);
    const storedUserName = res.data.data.name
    setUserName(storedUserName)
    // console.log(userName)
  };
  const location = useLocation();
  useEffect(() => {

    fetchUserData();
    if (location.state?.refresh) {
      window.history.replaceState({}, ""); // Reload the page when refresh is true
    }
    setOpen(!isSmallScreen);
  }, [location.state, isSmallScreen])


  const handleDeleteAccount = async () => {
    const storedUserid = localStorage.getItem("id");
    if (storedUserid) {
      await axios.delete(`/user/delete/${storedUserid}`);
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      navigate("/");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        anchor="left"
        sx={{
          width: open ? "220px" : "90px",
          flexShrink: 0,
          height: "100vh", // Set the desired height
          "& .MuiDrawer-paper": {
            width: open ? "220px" : "90px", // Force width
            height: "100vh", // Ensure the drawer's paper follows this 
            // height
            transition: "width 0.5s ease-in-out",
            overflowY: "auto", // Enable scrolling if content overflows
            backgroundColor: "#1E2A47 ",
            color: "#E0E7FF",
            //color: "#b0b0b0",
          },
        }}
      >

        <DrawerHeader
          sx={{
            padding: 0,
            backgroundColor: "#5C738F",
            display: "flex",
            justifyContent: open ? "flex-end" : "flex-start", // Align based on open state
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              setOpen(!open);
            }}
            sx={{
              color: "white",
              height: "56px",
              borderRadius: 0,
              marginLeft: open ? "180px" : "10px", // Adjust distance based on state
              transition: "margin-left 0.3s ease", // Smooth transition
            }}
          >
            <MenuIcon />
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
            height: "90px",
            mt: "12px"
          }}
        >
          {open ? (
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                color: "white",
                fontSize: "20px",
                textAlign: "center",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Hi, {userName}
            </Typography>
          ) : (
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#fff", // Change color as needed
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "navy",
                fontWeight: "bold",
                fontSize: "18px",
                mx: "auto", // to center horizontally if needed
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </Box>
          )}

          {open && (
            <Link
              href="/customer/update"
              variant="body2"
              underline="hover"
              sx={{ fontSize: "13px", textAlign: "left", mt: "4px" }}
            >
              Update Profile
            </Link>
          )}

        </Box>

        <List>
          {/* for Home navigation */}
          <ListItem
            disablePadding
            sx={{
              display: "block", p: 0.3, "&:hover": {
                backgroundColor: "#3B4F6B", // Hover background
              },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemButton
              sx={[
                {
                  // height: "40px",
                  // padding: "5px 15px",
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
                    color: '#E0E7FF'
                  },
                ]}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: 'grey' }} /> {/* Divider line */}

          {/* customer Dashboard navigation */}
          <ListItem disablePadding onClick={() => navigate("/customer")} sx={{
            p: 0.5, "&:hover": {
              backgroundColor: "#3B4F6B", // Hover background
            },
          }}>
            <ListItemButton sx={[
              {
                // height: "40px",
                // padding: "5px 15px",
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              },
            ]}>
              <ListItemIcon sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: '#E0E7FF'
              }}><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: 'grey' }} /> {/* Divider line */}

          {/*  Book Hoarding Nevigation */}
          <ListItem
            disablePadding
            sx={{
              display: "block", p: 0.7, "&:hover": {
                backgroundColor: "#3B4F6B", // Hover background
              },
            }}
            onClick={() => {
              navigate("/customer/bookhording");
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
                    color: '#E0E7FF'
                  },
                ]}
              >
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary="Book Hoarding"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: 'grey' }} /> {/* Divider line */}

          {/* view my screen  page navigation */}
          <ListItem
            disablePadding
            sx={{
              display: "block", p: 0.8, "&:hover": {
                backgroundColor: "#3B4F6B", // Hover background
              },
            }}
            onClick={() => {
              navigate("/customer/paymentdetails");
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
                    color: '#E0E7FF'
                  },
                ]}
              >
                <PaymentRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Payment Detail"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: 'grey' }} /> {/* Divider line */}

          {/* view my booking nevigation page */}
          <ListItem
            disablePadding
            sx={{
              display: "block", p: 1.2, "&:hover": {
                backgroundColor: "#3B4F6B", // Hover background
              },
            }}
            onClick={() => {
              navigate("/customer/mybookings");
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
                    color: '#E0E7FF'
                  },
                ]}
              >
                <RemoveFromQueueRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="View My Bookings"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        {/* </List> */}
        <Divider sx={{ backgroundColor: 'grey' }} /> {/* Divider line */}

        {/* <List> */}
        {/* for delete */}
        {/* <ListItem
          disablePadding
          sx={{
            display: "block", p: 0.5, "&:hover": {
              backgroundColor: "#3B4F6B", // Hover background
            },
          }}
          onClick={() => setDeleteDialogOpen(true)}
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
                  color: '#E0E7FF'
                },
              ]}
            >
              <DeleteIcon color="red" />
            </ListItemIcon>
            <ListItemText
              primary="Delete Account"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem> */}
        <Divider sx={{ backgroundColor: 'grey' }} /> {/* Divider line */}

        {/* for Logout */}
        <ListItem
          disablePadding
          sx={{
            display: "block", p: 0.5, "&:hover": {
              backgroundColor: "#3B4F6B", // Hover background
            },
          }}
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
                color: '#E0E7FF'
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ backgroundColor: 'grey' }} /> {/* Divider line */}

        </List>
      </Drawer>


      {/* delete popup */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}







