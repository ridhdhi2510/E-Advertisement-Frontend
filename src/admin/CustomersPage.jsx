import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Avatar,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon
} from '@mui/icons-material';

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch customer data from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/getall");
        const data = await response.json();
        
        // Filter users who signed up as customers (assuming role is stored in user data)
        const customerUsers = Array.isArray(data.data) 
          ? data.data.filter(user => user.role === 'customer') 
          : [];
        
        setCustomers(customerUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch booking data (you'll need to implement this API endpoint)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // TODO: Replace with actual bookings API call
        // const response = await fetch("http://localhost:3000/bookings/getall");
        // const data = await response.json();
        // setBookings(Array.isArray(data.data) ? data.data : []);
        
        // Mock data for demonstration
        const mockBookings = [
          {
            bookingId: 'B001',
            customerId: customers[0]?.id || 'C001',
            customerName: customers[0]?.name || 'John Smith',
            hoardingType: 'Digital Billboard',
            location: 'Times Square, NY',
            startDate: '2023-06-01',
            endDate: '2023-06-30',
            amount: 5000,
            status: 'Completed'
          },
          {
            bookingId: 'B002',
            customerId: customers[0]?.id || 'C001',
            customerName: customers[0]?.name || 'John Smith',
            hoardingType: 'Static Billboard',
            location: '5th Avenue, NY',
            startDate: '2023-07-15',
            endDate: '2023-08-15',
            amount: 3500,
            status: 'Active'
          }
        ];
        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (customers.length > 0) {
      fetchBookings();
    }
  }, [customers]);

  // For Navigation to "Customer Details" and "Booking Details"
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // For Searching Bar
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // For the purpose of Add/Edit table data
  const handleDialogOpen = (customer = null) => {
    setCurrentCustomer(customer);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentCustomer(null);
  };

  // Save the Data of table "Customer Details" after Editing
  const handleSaveCustomer = async () => {
    try {
      // TODO: Implement API call to save customer
      handleDialogClose();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  // Update Table After Delete the "Customer Details" Data
  const handleDelete = async (id) => {
    try {
      // TODO: Implement API call to delete customer
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // For searching purpose
  const filteredCustomers = customers.filter(customer =>
    Object.values(customer).some(
      value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  ));


  if (loading) {
    return <Typography>Loading customers...</Typography>;
  }


  return (
    <Box sx={{ ml: '240px', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>

      {/* Tabs for Customer Details and Booking Details */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Customer Details" />
          <Tab label="Booking Details" />
        </Tabs>
      </Box>

      {/* Search and Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search customers..."
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          }}
          sx={{ width: 400 }}
          onChange={handleSearch}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen()}
        >
          Add Customer
        </Button>
      </Box>

      {/* Customer Details Table */}
      {activeTab === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer._id}</TableCell>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {customer.name?.charAt(0) || 'C'}
                    </Avatar>
                    {customer.name || 'No Name'}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip 
                      label={customer.status || 'Active'} 
                      color={customer.status === 'Active' ? 'success' : 'default'} 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDialogOpen(customer)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(customer._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Booking Details Table */}
      {activeTab === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Hoarding Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking.bookingId}>
                  <TableCell>{booking.bookingId}</TableCell>
                  <TableCell>
                    {booking.customerName || 
                     customers.find(c => c._id === booking.customerId)?.name || 
                     'Unknown Customer'}
                  </TableCell>
                  <TableCell>{booking.hoardingType}</TableCell>
                  <TableCell>{booking.location}</TableCell>
                  <TableCell>
                    {booking.startDate} to {booking.endDate}
                  </TableCell>
                  <TableCell>${booking.amount}</TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.status} 
                      color={
                        booking.status === 'Active' ? 'primary' : 
                        booking.status === 'Completed' ? 'success' : 'default'
                      } 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => navigate(`/booking/${booking.bookingId}`)}>
                      <InfoIcon color="info" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>{currentCustomer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue={currentCustomer?.name || ''}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={currentCustomer?.email || ''}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue={currentCustomer?.phone || ''}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status"
                select
                defaultValue={currentCustomer?.status || 'Active'}
                margin="normal"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveCustomer}>
            {currentCustomer ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}