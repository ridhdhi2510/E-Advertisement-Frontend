import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
//import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import takeoutdoor from "../assets/takeoutdoorslogo.png";
import { MenuIcon } from "lucide-react";

const sidebarItems = [
  { text: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { text: "Hoardings", path: "/admin/hoardings", icon: <LocationOnIcon /> },
  { text: "Agencies", path: "/admin/agencies", icon: <BusinessIcon /> },
  { text: "Customers", path: "/admin/customers", icon: <GroupIcon /> },
  { text: "Payments", path: "/admin/payments", icon: <PaymentIcon /> },
  {
    text: "Logout", path: "/signin", icon: <LogoutIcon />, onClick: () => {
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      navigate("/signin");
    },
  },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const drawerWidth = open ? 220 : 90;


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          backgroundColor: "#1E2A47",
          color: "#E0E7FF",
        },
      }}
    >

      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%', // Makes sure the icon goes to the right
          }}
        >
          {open && (
            <img
              src={takeoutdoor}
              alt="E-Advertisement Logo"
              style={{ height: '55px', objectFit: 'contain' }}
            />
          )}

          <IconButton
            onClick={() => setOpen(!open)}

            sx={{
              color: "white",
              height: "40px",
              "&:hover": {
                backgroundColor: "#3B4F6B",
              },
              // height: "56px",
              // borderRadius: 0,
              // marginLeft: open ? "180px" : "10px", // Adjust distance based on state
              // transition: "margin-left 0.3s ease", // Smooth transition
            }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* all dashboard options */}
      <List>
        {sidebarItems.map((item) => (
          <React.Fragment key={item.text}>
            <Tooltip title={!open ? item.text : ''} placement="right">
              <ListItem disablePadding>
              <ListItemButton
                component={item.path ? Link : 'button'}
                to={item.path || undefined}
                onClick={item.onClick}
                selected={location.pathname === item.path}
                sx={{
                  p: 2,
                  justifyContent: open ? 'initial' : 'center',
                  "&:hover": {
                    backgroundColor: "#3B4F6B",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 0,
                    justifyContent: 'center',
                    display: 'flex',
                    color: '#E0E7FF',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
            <Divider sx={{ backgroundColor: 'grey' }} />
          </React.Fragment>
        ))}
      </List>

    </Drawer>

  );
}
