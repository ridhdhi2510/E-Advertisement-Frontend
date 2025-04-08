import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Avatar,
  CircularProgress,
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
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:3000/user/getall")
      .then((response) => {
        console.log("Customer API Response:", response.data);
        setCustomers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  }, []);

  // Fetch bookings when customers are loaded
  useEffect(() => {
    if (customers.length > 0) {
      const fetchBookings = async () => {
        try {
          const response = await fetch("http://localhost:3000/bookings/getall");
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch bookings');
          }

          setBookings(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
          console.error('Error fetching bookings:', err);
        }
      };

      fetchBookings();
    }
  }, [customers]);

  // Handle saving customer data
  const handleSaveCustomer = async () => {
    try {
      // Here you would typically make an API call to save/update the customer
      // For now, we'll just close the dialog
      setOpenDialog(false);
      setCurrentCustomer(null);

      // TODO: Add actual API call to save customer data
      // const method = currentCustomer ? 'PUT' : 'POST';
      // const url = currentCustomer 
      //   ? `http://localhost:3000/user/${currentCustomer._id}`
      //   : 'http://localhost:3000/user';
      // 
      // const response = await fetch(url, {
      //   method,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to save customer');
      // }
      // 
      // // Refresh customer list
      // const updatedResponse = await fetch("http://localhost:3000/user/getall");
      // const updatedData = await updatedResponse.json();
      // setCustomers(updatedData.data.filter(user => user.role === 'customer'));

    } catch (err) {
      console.error('Error saving customer:', err);
      setError(err.message);
    }
  };

  // Handle deleting a customer
  const handleDelete = async (customerId) => {
    try {
      // TODO: Implement actual delete API call
      // await fetch(`http://localhost:3000/user/${customerId}`, {
      //   method: 'DELETE'
      // });
      // 
      // // Refresh customer list
      // const response = await fetch("http://localhost:3000/user/getall");
      // const data = await response.json();
      // setCustomers(data.data.filter(user => user.role === 'customer'));

      console.log(`Would delete customer with ID: ${customerId}`);
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError(err.message);
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (customer.name && customer.name.toLowerCase().includes(searchLower)) ||
      (customer.email && customer.email.toLowerCase().includes(searchLower)) ||
      (customer.phone && customer.phone.toString().toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ ml: '240px', p: 3 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ ml: '240px', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Customer Details" />
          <Tab label="Booking Details" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search customers..."
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          }}
          sx={{ width: 400 }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentCustomer(null);
            setOpenDialog(true);
          }}
        >
          Add Customer
        </Button>
      </Box>

      {activeTab === 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Bookings</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {filteredCustomers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer._id.substring(0, 8)}...</TableCell>
                  <TableCell>{customer.name}</TableCell>
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
                    {bookings.filter(b => b.customerId === customer._id).length}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => {
                      setCurrentCustomer(customer);
                      setOpenDialog(true);
                    }}>
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
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(booking => {
                const customer = customers.find(c => c._id === booking.customerId);
                return (
                  <TableRow key={booking._id}>
                    <TableCell>{booking._id.substring(0, 8)}...</TableCell>
                    <TableCell>
                      {customer?.name || 'Unknown Customer'}
                    </TableCell>
                    <TableCell>{booking.hoardingType || 'N/A'}</TableCell>
                    <TableCell>{booking.location || 'N/A'}</TableCell>
                    <TableCell>
                      {booking.startDate || 'N/A'} to {booking.endDate || 'N/A'}
                    </TableCell>
                    <TableCell>₹{booking.amount || '0'}</TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status || 'Pending'}
                        color={
                          booking.status === 'Active' ? 'primary' :
                            booking.status === 'Completed' ? 'success' :
                              'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => navigate(`/bookings/${booking._id}`)}>
                        <InfoIcon color="info" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              defaultValue={currentCustomer?.name || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              defaultValue={currentCustomer?.email || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              defaultValue={currentCustomer?.phone || ''}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Status"
              defaultValue={currentCustomer?.status || 'Active'}
              margin="normal"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveCustomer} color="primary" variant="contained">
            {currentCustomer ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}