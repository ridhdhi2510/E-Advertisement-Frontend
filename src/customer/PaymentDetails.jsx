import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Grid,
  Tooltip,
  Stack,
  useTheme,
  TableRow
} from "@mui/material";
import {
  ArrowBack,
  Paid,
  CheckCircle,
  Print,
  Download,
  CalendarToday,
  Receipt,
  CreditCard,
  Home,
  Share
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PaymentDetails = () => {
  const theme = useTheme();
  
  // Combined payment and booking data
  const transaction = {
    id: "txn_7s8d9f2g1h3j4k5l",
    amount: 12500,
    status: "succeeded",
    date: "2023-11-15T14:30:00Z",
    method: "Credit Card",
    cardLast4: "4242",
    receiptUrl: "#",
    booking: {
      id: "book_6g7h8i9j0k1l2m3",
      hoarding: {
        type: "Premium Digital Billboard",
        location: "Times Square, NYC",
        size: "20ft x 10ft",
        dailyRate: 2500
      },
      period: {
        start: "2023-12-01T00:00:00Z",
        end: "2023-12-05T00:00:00Z",
        duration: "5 days"
      },
      campaign: {
        name: "Winter Collection Launch",
        description: "New seasonal collection from our fashion line"
      }
    }
  };

  const handlePrint = () => window.print();
  const handleShare = () => navigator.share?.({ 
    title: 'Payment Receipt', 
    text: 'Check out my payment receipt', 
    url: window.location.href 
  });

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getStatusChip = (status) => {
    const statusMap = {
      succeeded: { color: 'success', icon: <CheckCircle /> },
      failed: { color: 'error', icon: <Paid /> },
      pending: { color: 'warning', icon: <Receipt /> },
      refunded: { color: 'info', icon: <Paid /> }
    };
    
    const config = statusMap[status.toLowerCase()] || { color: 'default', icon: <Receipt /> };
    
    return (
      <Chip
        icon={config.icon}
        label={status}
        color={config.color}
        sx={{ 
          fontWeight: 700,
          textTransform: 'capitalize',
          px: 2,
          py: 1
        }}
      />
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header with actions */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />}
          sx={{ borderRadius: 2 }}
        >
          Back
        </Button>
        
        <Typography variant="h4" component="h1" fontWeight="700">
          Payment Details
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Tooltip title="Print receipt">
            <Button 
              variant="outlined" 
              startIcon={<Print />}
              sx={{ borderRadius: 2 }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Tooltip>
          <Tooltip title="Download PDF">
            <Button 
              variant="contained" 
              startIcon={<Download />}
              sx={{ borderRadius: 2 }}
            >
              Download
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      {/* Main transaction card */}
      <Card sx={{ 
        borderRadius: 3,
        boxShadow: theme.shadows[2],
        mb: 4
      }}>
        <Box sx={{ 
          bgcolor: theme.palette.primary.main,
          color: 'white',
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h5" fontWeight="700">
            Transaction Summary
          </Typography>
          {getStatusChip(transaction.status)}
        </Box>
        
        <CardContent>
          <Grid container spacing={3}>
            {/* Transaction Details Column */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ mb: 2 }}>
                Payment Information
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{transaction.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                      <TableCell>
                        <Typography fontWeight="700" color="primary">
                          ₹{transaction.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                      <TableCell>
                        <Chip
                          icon={<CreditCard />}
                          label={`${transaction.method} •••• ${transaction.cardLast4}`}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Booking Details Column */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ mb: 2 }}>
                Booking Information
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Hoarding Type</TableCell>
                      <TableCell>{transaction.booking.hoarding.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                      <TableCell>{transaction.booking.hoarding.location}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                      <TableCell>{transaction.booking.hoarding.size}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Daily Rate</TableCell>
                      <TableCell>₹{transaction.booking.hoarding.dailyRate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Booking Period</TableCell>
                      <TableCell>
                        {formatDate(transaction.booking.period.start)} to {' '}
                        {formatDate(transaction.booking.period.end)} ({transaction.booking.period.duration})
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Campaign</TableCell>
                      <TableCell>{transaction.booking.campaign.name}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          {/* Receipt and sharing options */}
          <Box sx={{ 
            mt: 3,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2
          }}>
            <Button 
              variant="contained" 
              startIcon={<Download />}
              sx={{ borderRadius: 2 }}
            >
              Download Invoice
            </Button>
            {navigator.share && (
              <Button 
                variant="outlined" 
                startIcon={<Share />}
                sx={{ borderRadius: 2 }}
                onClick={handleShare}
              >
                Share Receipt
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Payment security info */}
      <Card sx={{ 
        borderRadius: 3,
        bgcolor: theme.palette.success.light,
        color: theme.palette.success.contrastText
      }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CheckCircle fontSize="large" />
          <Box>
            <Typography variant="subtitle1" fontWeight="700">
              Secure Payment Processed
            </Typography>
            <Typography variant="body2">
              This transaction was protected with 256-bit encryption and PCI-compliant security measures.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Footer */}
      <Box sx={{ 
        mt: 4,
        p: 3,
        bgcolor: theme.palette.grey[100],
        borderRadius: 3,
        textAlign: 'center'
      }}>
        <Typography variant="body2" color="text.secondary">
          Need help with this transaction? Contact our support team
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Transaction ID: {transaction.id}
        </Typography>
      </Box>
    </Container>
  );
};

export default PaymentDetails;