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

export default function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('paymentDate');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/payment/getall');
        // Transform the data to match the table structure
        
        const transformedPayments = response.data.data.map(payment => ({
          id: payment._id,
          transactionId: payment.transactionId,
          bookingId: payment.bookingId?._id|| 'N/A',
          userId: payment.userId?.name || 'N/A',
          amount: payment.amount,
          paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
          status: payment.paymentStatus,
          refundStatus: payment.refundStatus,
          receiptUrl: payment.receiptURL || '#'
        }));
        setPayments(transformedPayments);
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
      if (orderBy === 'status' || orderBy === 'id' || orderBy === 'transactionId' || 
          orderBy === 'bookingId' || orderBy === 'userId' || orderBy === 'refundStatus') {
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
      case 'succeeded':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'failed':
        return 'red';
      case 'Refunded':
        return 'blue';
      default:
        return 'black';
    }
  };

  const getRefundStatusColor = (status) => {
    switch(status) {
      case 'Completed':
        return 'green';
      case 'Processing':
        return 'orange';
      case 'Not Requested':
        return 'gray';
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
                      active={orderBy === 'transactionId'}
                      direction={orderBy === 'transactionId' ? order : 'asc'}
                      onClick={() => handleRequestSort('transactionId')}
                      sx={{ color: 'white !important' }}
                    >
                      Transaction ID
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
                      active={orderBy === 'userId'}
                      direction={orderBy === 'userId' ? order : 'asc'}
                      onClick={() => handleRequestSort('userId')}
                      sx={{ color: 'white !important' }}
                    >
                      User 
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
                      Payment Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'refundStatus'}
                      direction={orderBy === 'refundStatus' ? order : 'asc'}
                      onClick={() => handleRequestSort('refundStatus')}
                      sx={{ color: 'white !important' }}
                    >
                      Refund Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>Receipt</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell>{payment.transactionId}</TableCell>
                    <TableCell>{payment.bookingId}</TableCell>
                    <TableCell>{payment.userId}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell sx={{ 
                      color: getStatusColor(payment.status),
                      fontWeight: 'bold'
                    }}>
                      {payment.status}
                    </TableCell>
                    <TableCell sx={{ 
                      color: getRefundStatusColor(payment.refundStatus),
                      fontWeight: 'bold'
                    }}>
                      {payment.refundStatus}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<ReceiptIcon />}
                        onClick={() => window.open(payment.receiptUrl, '_blank')}
                        disabled={!payment.receiptUrl || payment.receiptUrl === '#'}
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