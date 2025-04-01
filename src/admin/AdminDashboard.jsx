import React from 'react';
import { Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Grid, IconButton } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, DollarSign } from 'lucide-react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const adRequests = [
  { id: 1, advertiser: 'ABC Corp', adType: 'Billboard', status: 'Pending' },
  { id: 2, advertiser: 'XYZ Ltd', adType: 'Digital', status: 'Pending' },
];

const payments = [
  { id: 1, advertiser: 'ABC Corp', amount: 5000, status: 'Paid' },
  { id: 2, advertiser: 'XYZ Ltd', amount: 3000, status: 'Pending' },
];

const users = [
  { id: 1, name: 'John Doe', role: 'Advertiser', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Admin', status: 'Inactive' },
];

const AdminDashboard = () => {
  return (
    <div>
    <h1>Admin Dashboard</h1>
    <Grid container spacing={4} padding={4}>
      {/* Overview Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Activity size={32} />
            <Typography variant="h6">Active Ads</Typography>
            <Typography variant="h4">12</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Users size={32} />
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4">256</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <DollarSign size={32} />
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4">$14,500</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* User Account Management */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>User Accounts</Typography>
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
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <IconButton><EditIcon /></IconButton>
                      <IconButton color="error"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>

      {/* Ad Requests Management */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>Ad Requests</Typography>
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
                {adRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>{request.advertiser}</TableCell>
                    <TableCell>{request.adType}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      <Button color="primary">Accept</Button>
                      <Button color="error">Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </div>
  );
};

export default AdminDashboard;