import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  IconButton,
  TableSortLabel,
  CircularProgress,
  InputAdornment,
  Button
} from '@mui/material';
import { Search as SearchIcon, Receipt as ReceiptIcon } from '@mui/icons-material';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('paymentDate');

  // Hardcoded data for now
  const hardcodedPayments = [
    {
      id: 'pay_001',
      bookingId: 'book_123',
      hoardingId: 'hoard_456',
      userId: 'user_789',
      amount: 1500.00,
      paymentDate: '2023-05-15',
      status: 'Completed',
      receiptUrl: '#'
    },
    {
      id: 'pay_002',
      bookingId: 'book_124',
      hoardingId: 'hoard_457',
      userId: 'user_790',
      amount: 2000.00,
      paymentDate: '2023-05-16',
      status: 'Pending',
      receiptUrl: '#'
    },
    {
      id: 'pay_003',
      bookingId: 'book_125',
      hoardingId: 'hoard_458',
      userId: 'user_791',
      amount: 1750.50,
      paymentDate: '2023-05-17',
      status: 'Failed',
      receiptUrl: '#'
    },
    {
      id: 'pay_004',
      bookingId: 'book_126',
      hoardingId: 'hoard_459',
      userId: 'user_792',
      amount: 2200.00,
      paymentDate: '2023-05-18',
      status: 'Completed',
      receiptUrl: '#'
    },
    {
      id: 'pay_005',
      bookingId: 'book_127',
      hoardingId: 'hoard_460',
      userId: 'user_793',
      amount: 1800.75,
      paymentDate: '2023-05-19',
      status: 'Refunded',
      receiptUrl: '#'
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API:
        // const response = await axios.get('http://localhost:3000/payments/getall');
        // setPayments(response.data.data);
        
        // Using hardcoded data for now
        setPayments(hardcodedPayments);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const comparatorResult = getComparator()(a[0], b[0]);
      if (comparatorResult !== 0) return comparatorResult;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };
  
  const getComparator = () => {
    return (a, b) => {
      if (orderBy === 'status' || orderBy === 'id' || orderBy === 'bookingId' || 
          orderBy === 'hoardingId' || orderBy === 'userId') {
        return order === 'desc' 
          ? b[orderBy].localeCompare(a[orderBy])
          : a[orderBy].localeCompare(b[orderBy]);
      }
      
      if (orderBy === 'amount') {
        return order === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
      
      if (orderBy === 'paymentDate') {
        return order === 'desc' 
          ? new Date(b.paymentDate) - new Date(a.paymentDate)
          : new Date(a.paymentDate) - new Date(b.paymentDate);
      }
      
      return 0;
    };
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPayments = stableSort(
    payments.filter(payment =>
      Object.values(payment).some(
        value => value !== null && 
                typeof value === 'string' && 
                value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Failed':
        return 'red';
      case 'Refunded':
        return 'blue';
      default:
        return 'black';
    }
  };

  return (
    <Box sx={{ ml: '240px', p: 3, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1E2A47', fontWeight: 'bold' }}>
        Payment Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search payments..."
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
          onChange={handleSearch}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#1E2A47' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'id'}
                      direction={orderBy === 'id' ? order : 'asc'}
                      onClick={() => handleRequestSort('id')}
                      sx={{ color: 'white !important' }}
                    >
                      Payment ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'bookingId'}
                      direction={orderBy === 'bookingId' ? order : 'asc'}
                      onClick={() => handleRequestSort('bookingId')}
                      sx={{ color: 'white !important' }}
                    >
                      Booking ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'hoardingId'}
                      direction={orderBy === 'hoardingId' ? order : 'asc'}
                      onClick={() => handleRequestSort('hoardingId')}
                      sx={{ color: 'white !important' }}
                    >
                      Hoarding ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'userId'}
                      direction={orderBy === 'userId' ? order : 'asc'}
                      onClick={() => handleRequestSort('userId')}
                      sx={{ color: 'white !important' }}
                    >
                      User ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'amount'}
                      direction={orderBy === 'amount' ? order : 'asc'}
                      onClick={() => handleRequestSort('amount')}
                      sx={{ color: 'white !important' }}
                    >
                      Amount
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'paymentDate'}
                      direction={orderBy === 'paymentDate' ? order : 'asc'}
                      onClick={() => handleRequestSort('paymentDate')}
                      sx={{ color: 'white !important' }}
                    >
                      Payment Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? order : 'asc'}
                      onClick={() => handleRequestSort('status')}
                      sx={{ color: 'white !important' }}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>Receipt</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.bookingId}</TableCell>
                    <TableCell>{payment.hoardingId}</TableCell>
                    <TableCell>{payment.userId}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell sx={{ 
                      color: getStatusColor(payment.status),
                      fontWeight: 'bold'
                    }}>
                      {payment.status}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<ReceiptIcon />}
                        onClick={() => window.open(payment.receiptUrl, '_blank')}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
