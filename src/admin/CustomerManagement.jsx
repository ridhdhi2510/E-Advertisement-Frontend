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
  CircularProgress,
  InputAdornment,
  TableSortLabel,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon
} from '@mui/icons-material';

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
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

  // Sorting functions
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const handleSaveCustomer = async () => {
    try {
      setOpenDialog(false);
      setCurrentCustomer(null);
    } catch (err) {
      console.error('Error saving customer:', err);
      setError(err.message);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      console.log(`Would delete customer with ID: ${customerId}`);
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError(err.message);
    }
  };

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

  // Table headers with sorting
  const customerHeaders = [
    { id: '_id', label: 'ID', sortable: true },
    { id: 'name', label: 'Customer', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'phone', label: 'Phone', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'bookings', label: 'Bookings', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false }
  ];

  const bookingHeaders = [
    { id: '_id', label: 'Booking ID', sortable: true },
    { id: 'customer', label: 'Customer', sortable: true },
    { id: 'type', label: 'Type', sortable: true },
    { id: 'location', label: 'Location', sortable: true },
    { id: 'dates', label: 'Dates', sortable: true },
    { id: 'amount', label: 'Amount', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <Box sx={{ ml: '240px', p: 3, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1E2A47', fontWeight: 'bold' }}>
        Customer Management
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Customer Details" />
          <Tab label="Booking Details" />
        </Tabs>
      </Paper>

      {/* Search and Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'action.active' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
            width: 400,
            backgroundColor: 'white',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            }
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#1E2A47',
            '&:hover': { backgroundColor: '#3B4F6B' }
          }}
          onClick={() => {
            setCurrentCustomer(null);
            setOpenDialog(true);
          }}
        >
          Add Customer
        </Button>
      </Box>

      {activeTab === 0 ? (
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#1E2A47' }}>
                <TableRow>
                  {customerHeaders.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}
                      sx={{ color: 'white' }}
                    >
                      {headCell.sortable ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={() => handleRequestSort(headCell.id)}
                          sx={{ 
                            color: 'white !important',
                            '& .MuiTableSortLabel-icon': {
                              color: 'white !important'
                            }
                          }}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      ) : (
                        headCell.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer._id} hover>
                    <TableCell>{customer._id}</TableCell>
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
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#1E2A47' }}>
                <TableRow>
                  {bookingHeaders.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}
                      sx={{ color: 'white' }}
                    >
                      {headCell.sortable ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={() => handleRequestSort(headCell.id)}
                          sx={{ 
                            color: 'white !important',
                            '& .MuiTableSortLabel-icon': {
                              color: 'white !important'
                            }
                          }}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      ) : (
                        headCell.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map(booking => {
                  const customer = customers.find(c => c._id === booking.customerId);
                  return (
                    <TableRow key={booking._id} hover>
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
        </Paper>
      )}

      {/* Edit Customer Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#1E2A47', color: 'white' }}>
          {currentCustomer ? 'Edit Customer' : 'Add Customer'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
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
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#1E2A47' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveCustomer}
            variant="contained"
            sx={{ 
              backgroundColor: '#1E2A47',
              '&:hover': { backgroundColor: '#3B4F6B' }
            }}
          >
            {currentCustomer ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}