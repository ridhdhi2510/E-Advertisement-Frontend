import { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Edit, Delete, CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('AdRequests');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/user/getall")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Data:", data);
        setUsers(Array.isArray(data.data) ? data.data : []);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);


  return (
    <Box sx={{ bgcolor: '#f4f6f8', height: '100vh', padding: 3, position: 'relative' }}>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          localStorage.removeItem("id");
          localStorage.removeItem("role");

          navigate("/signin");
        }}
        sx={{ position: 'absolute', top: 16, right: 16, borderColor: 'red', 
          color: 'red', 
          backgroundColor: 'white', 
          '&:hover': {
            backgroundColor: '#ffebee' // Light red on hover
          } }}
      >
        Logout
      </Button>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary">Active Ads</Typography>
              <Typography variant="h3">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary">Users</Typography>
              <Typography variant="h3">256</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary">Revenue</Typography>
              <Typography variant="h3">₹14,500</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" p={2} color="primary">User Accounts</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.roleId?.name || "N/A"}</TableCell>
                      <TableCell>{"Active"}</TableCell> {/* Assuming status is always active */}
                      <TableCell>
                        <IconButton color="primary"><Edit /></IconButton>
                        <IconButton color="error"><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" p={2} color="primary">Ad Requests</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Advertiser</TableCell>
                    <TableCell>Ad Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>ABC Corp</TableCell>
                    <TableCell>Billboard</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>
                      <Button color="primary">ACCEPT</Button>
                      <Button color="error">REJECT</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>XYZ Ltd</TableCell>
                    <TableCell>Digital</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>
                      <Button color="primary">ACCEPT</Button>
                      <Button color="error">REJECT</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
