import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import RemoveFromQueueRoundedIcon from '@mui/icons-material/RemoveFromQueueRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
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
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const fetchUserData =  async() => {
    const storedUserid = localStorage.getItem("id");
    const res = await axios.get(`/user/getbyid/${storedUserid}`);
    const storedUserName=res.data.data.name
    setUserName(storedUserName)
    // console.log(userName)
  };
  const location = useLocation();
  useEffect(() => {

    fetchUserData();
    if (location.state?.refresh) {
      window.history.replaceState({}, ""); // Reload the page when refresh is true
  }
  }, [location.state])


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
          <Link href="/customer/update" variant="body2" underline="hover">
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

          {/* customer Dashboard navigation */}
          <ListItem disablePadding onClick={() => navigate("/customer")}>
            <ListItemButton>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/*  Book Hoarding Nevigation */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
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

          {/* view my screen  page navigation */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
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
                  },
                ]}
              >
               <PaymentRoundedIcon/>
              </ListItemIcon>
              <ListItemText
                primary="Payment Detail"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>


          {/* view my booking nevigation page */}
          <ListItem
            disablePadding
            sx={{ display: "block" }}
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
                  },
                ]}
              >
                <RemoveFromQueueRoundedIcon/>
              </ListItemIcon>
              <ListItemText
                primary="View My Bookings"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />

        <List>
            <ListItem
            disablePadding
            sx={{ display: "block" }}
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
                  },
                ]}
              >
                <DeleteIcon color="red"/>
              </ListItemIcon>
              <ListItemText
                primary="Delete Account"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

         {/* for Logout */}
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







