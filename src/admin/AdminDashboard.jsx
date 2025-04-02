import { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Edit, Delete, CheckCircle, Cancel } from '@mui/icons-material';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('AdRequests');

  return (
    <Box sx={{ bgcolor: '#f4f6f8', height: '100vh', padding: 3 }}>
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
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Advertiser</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>
                      <IconButton color="primary"><Edit /></IconButton>
                      <IconButton color="error"><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>Agency</TableCell>
                    <TableCell>Inactive</TableCell>
                    <TableCell>
                      <IconButton color="primary"><Edit /></IconButton>
                      <IconButton color="error"><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
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
