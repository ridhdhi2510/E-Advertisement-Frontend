import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  TableRow,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import {
  ArrowBack,
  Paid,
  CheckCircle,
  Print,
  CalendarToday,
  Receipt,
  CreditCard,
  Home,
  ExpandMore,
  Payment
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoader from "../component/CustomLoader";
import dayjs from "dayjs";

const PaymentDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [expandedPayment, setExpandedPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("id");
        const response = await axios.get(`/payment/getallbyuserId/${userId}`);
        
        if (response.data && response.data.data) {
          const sortedPayments = response.data.data.sort((a, b) => 
            new Date(b.paymentDate) - new Date(a.paymentDate)
          );
          setPayments(sortedPayments);
          if (sortedPayments.length > 0) {
            setExpandedPayment(sortedPayments[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handlePrintAll = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>All Payment Receipts</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .receipt { margin-bottom: 40px; page-break-after: always; }
            h2 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .status { 
              padding: 5px 10px; 
              border-radius: 4px; 
              font-weight: bold;
              display: inline-block;
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          ${payments.map(payment => `
            <div class="receipt">
              <h2>Payment Receipt</h2>
              <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
              <p><strong>Date:</strong> ${formatDate(payment.paymentDate)}</p>
              <p><strong>Amount:</strong> ₹${payment.amount?.toLocaleString()}</p>
              <div class="status" style="background-color: ${
                payment.paymentStatus === 'succeeded' ? '#4caf50' : 
                payment.paymentStatus === 'failed' ? '#f44336' : '#ff9800'
              }; color: white;">
                ${payment.paymentStatus}
              </div>
              
              ${payment.bookingId ? `
                <h3>Booking Details</h3>
                <table>
                  <tr>
                    <th>Campaign</th>
                    <td>${payment.bookingId.adName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <th>Location</th>
                    <td>
                      ${payment.bookingId.hordingId?.areaId?.name || 'N/A'}, 
                      ${payment.bookingId.hordingId?.cityId?.name || 'N/A'}
                    </td>
                  </tr>
                  <tr>
                    <th>Booking Period</th>
                    <td>
                      ${formatDate(payment.bookingId.startDate)} to 
                      ${formatDate(payment.bookingId.endDate)}
                    </td>
                  </tr>
                </table>
              ` : '<p>No booking information available</p>'}
              <hr/>
              <p>Thank you for your business!</p>
            </div>
          `).join('')}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const handlePrintSingle = (payment) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Popup blocked. Please allow popups for this site.");
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt - ${payment.transactionId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h2 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .status { 
              padding: 5px 10px; 
              border-radius: 4px; 
              font-weight: bold;
              display: inline-block;
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto;">
            <h2>Payment Receipt</h2>
            <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
            <p><strong>Date:</strong> ${formatDate(payment.paymentDate)}</p>
            <p><strong>Amount:</strong> ₹${payment.amount?.toLocaleString()}</p>
            <div class="status" style="background-color: ${
              payment.paymentStatus === 'succeeded' ? '#4caf50' : 
              payment.paymentStatus === 'failed' ? '#f44336' : '#ff9800'
            }; color: white;">
              ${payment.paymentStatus}
            </div>
            
            ${payment.bookingId ? `
              <h3>Booking Details</h3>
              <table>
                <tr>
                  <th>Campaign</th>
                  <td>${payment.bookingId.adName || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>
                    ${payment.bookingId.hordingId?.areaId?.name || 'N/A'}, 
                    ${payment.bookingId.hordingId?.cityId?.name || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <th>Booking Period</th>
                  <td>
                    ${formatDate(payment.bookingId.startDate)} to 
                    ${formatDate(payment.bookingId.endDate)}
                  </td>
                </tr>
              </table>
            ` : '<p>No booking information available</p>'}
            <hr/>
            <p style="text-align: center;">Thank you for your business!</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };


  const handleDownloadInvoice = async (payment) => {
    const content = document.createElement("div");
    content.style.padding = "20px";
    content.innerHTML = `
      <h2>Payment Receipt</h2>
      <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
      <p><strong>Date:</strong> ${formatDate(payment.paymentDate)}</p>
      <p><strong>Amount:</strong> ₹${payment.amount?.toLocaleString()}</p>
      <p><strong>Status:</strong> ${payment.paymentStatus}</p>
      ${
        payment.bookingId
          ? `
        <h3>Booking Details</h3>
        <p><strong>Campaign:</strong> ${payment.bookingId.adName || "N/A"}</p>
        <p><strong>Location:</strong> ${payment.bookingId.hordingId?.areaId?.name || "N/A"}, ${payment.bookingId.hordingId?.cityId?.name || "N/A"}</p>
        <p><strong>Booking Period:</strong> ${formatDate(payment.bookingId.startDate)} to ${formatDate(payment.bookingId.endDate)}</p>
      `
          : `<p>No booking info available</p>`
      }
      <hr />
      <p>Thank you for your business!</p>
    `;
  
    document.body.appendChild(content);
  
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${payment.transactionId}.pdf`);
  
    document.body.removeChild(content);
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD MMM YYYY, hh:mm A");
  };

  const getStatusChip = (status) => {
    const statusMap = {
      succeeded: { color: 'success', icon: <CheckCircle /> },
      failed: { color: 'error', icon: <Paid /> },
      pending: { color: 'warning', icon: <Receipt /> },
      refunded: { color: 'info', icon: <Payment /> }
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

  if (isLoading) {
    return <CustomLoader />;
  }

  if (!payments || payments.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          py: 8,
          textAlign: 'center'
        }}>
          <Payment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary">
            No payment history found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            You haven't made any payments yet
          </Typography>
          <Button 
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, fontWeight: 600 }}
            onClick={() => navigate('/customer/mybookings')}
          >
            View Bookings
          </Button>
        </Box>
      </Container>
    );
  }

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
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        
        <Typography variant="h4" component="h1" fontWeight="700">
          Payment History
        </Typography>
        
        <Tooltip title="Print receipt">
          <Button 
            variant="outlined" 
            startIcon={<Print />}
            sx={{ borderRadius: 2 }}
            onClick={handlePrintAll}
          >
            Print All
          </Button>
        </Tooltip>
      </Box>

      {/* Printable area */}
      <div id="printable-area" style={{ display: 'none' }}>
        {payments.map(payment => (
          <div key={payment._id} style={{ marginBottom: '2rem', pageBreakAfter: 'always' }}>
            <h2>Payment Receipt</h2>
            <p>Transaction ID: {payment.transactionId}</p>
            <p>Date: {formatDate(payment.paymentDate)}</p>
            <p>Amount: ₹{payment.amount?.toLocaleString()}</p>
            <p>Status: {payment.paymentStatus}</p>
            {payment.bookingId && (
              <>
                <h3>Booking Details</h3>
                <p>Campaign: {payment.bookingId.adName}</p>
                <p>Location: {payment.bookingId.hordingId?.areaId?.name}, {payment.bookingId.hordingId?.cityId?.name}</p>
              </>
            )}
            <hr />
            <p>Thank you for your business!</p>
          </div>
        ))}
      </div>

      {/* Payment list with accordions */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {payments.map((payment) => (
          <Accordion 
            key={payment._id}
            expanded={expandedPayment === payment._id}
            onChange={() => setExpandedPayment(expandedPayment === payment._id ? null : payment._id)}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                bgcolor: expandedPayment === payment._id ? theme.palette.action.selected : 'inherit',
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <ListItemIcon>
                  <Payment color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={`₹${payment.amount?.toLocaleString()}`}
                  secondary={formatDate(payment.paymentDate)}
                  primaryTypographyProps={{ fontWeight: 700 }}
                />
                <Box sx={{ ml: 'auto' }}>
                  {getStatusChip(payment.paymentStatus)}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                    Payment Information
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{payment.transactionId}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                          <TableCell>
                            <Typography fontWeight="700" color="primary">
                              ₹{payment.amount?.toLocaleString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                          <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                    Booking Information
                  </Typography>
                  {payment.bookingId ? (
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Campaign</TableCell>
                            <TableCell>{payment.bookingId.adName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                            <TableCell>
                              {payment.bookingId.hordingId?.areaId?.name}, 
                              {payment.bookingId.hordingId?.cityId?.name}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Booking Period</TableCell>
                            <TableCell>
                              {formatDate(payment.bookingId.startDate)} to {' '}
                              {formatDate(payment.bookingId.endDate)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography color="text.secondary">
                        No booking information available or booking had been deleted.
                      </Typography>
                    </Paper>
                  )}
                </Grid>
              </Grid>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  startIcon={<Print />}
                  onClick={() => handlePrintSingle(payment)}
                  sx={{ mr: 2 }}
                >
                  Print Receipt
                </Button>
                <Button 
                  variant="contained"
                  onClick={() => handleDownloadInvoice(payment)}
                >
                  Download Invoice
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Container>
  );
};

export default PaymentDetails;