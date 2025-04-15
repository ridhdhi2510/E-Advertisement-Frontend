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
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  TableSortLabel,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

export default function AgencyManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [agencies, setAgencies] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAgency, setCurrentAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  // Fetch agencies data using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch agencies details
        const agenciesRes = await axios.get('http://localhost:3000/agency/agencies');
        setAgencies(agenciesRes.data.data);

        // Fetch bank details
        const bankRes = await axios.get('http://localhost:3000/agency/agency-bank-details');
        setBankDetails(bankRes.data.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDialogOpen = (agency = null) => {
    setCurrentAgency(agency);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentAgency(null);
  };

  const handleSaveBankDetails = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/agency/update-bank-details/${currentAgency.id}`,
        currentAgency.bankDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      // Update local state
      setBankDetails(bankDetails.map(agency => 
        agency.id === currentAgency.id ? response.data.data : agency
      ));
      handleDialogClose();
    } catch (error) {
      console.error('Error updating bank details:', error);
    }
  };

  // Filter and sort data
  const filteredAgencies = stableSort(
    agencies.filter(agency =>
      Object.values(agency).some(
        value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
    getComparator(order, orderBy)
  );

  const filteredBankDetails = stableSort(
    bankDetails.filter(agency =>
      Object.values(agency).some(
        value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
    getComparator(order, orderBy)
  );

  // Table headers with sorting
  const agencyHeaders = [
    { id: 'id', label: 'Agency ID', sortable: true },
    { id: 'name', label: 'Agency Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'phone', label: 'Phone', sortable: true },
    { id: 'totalHoardings', label: 'Total Hoardings', sortable: true },
    { id: 'activeHoardings', label: 'Active Hoardings', sortable: true },
    // { id: 'actions', label: 'Actions', sortable: false }
  ];

  const bankHeaders = [
    { id: 'id', label: 'Agency ID', sortable: true },
    { id: 'name', label: 'Agency Name', sortable: true },
    { id: 'bankName', label: 'Bank Name', sortable: true },
    { id: 'accountNumber', label: 'Account Number', sortable: true },
    { id: 'accountHolderName', label: 'Account Holder', sortable: true },
    { id: 'iban', label: 'IBAN/SWIFT', sortable: true },
    // { id: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <Box sx={{ ml: '240px', p: 3, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1E2A47', fontWeight: 'bold' }}>
        Agency Management
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Agencies Details" />
          <Tab label="Agency Bank Details" />
        </Tabs>
      </Paper>

      {/* Search */}
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
          onChange={handleSearch}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Agencies Details Table */}
          {activeTab === 0 && (
            <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#1E2A47' }}>
                    <TableRow>
                      {agencyHeaders.map((headCell) => (
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
                    {filteredAgencies.map((agency) => (
                      <TableRow key={agency.id} hover>
                        <TableCell>{agency.id}</TableCell>
                        <TableCell>{agency.name}</TableCell>
                        <TableCell>{agency.email}</TableCell>
                        <TableCell>{agency.phone || 'N/A'}</TableCell>
                        <TableCell>{agency.totalHoardings}</TableCell>
                        <TableCell>{agency.activeHoardings}</TableCell>
                        {/* <TableCell>
                          <IconButton onClick={() => console.log('Edit', agency.id)}>
                            <EditIcon color="primary" />
                          </IconButton>
                          <IconButton onClick={() => console.log('Delete', agency.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* Bank Details Table */}
          {/* Bank Details Table */}
{activeTab === 1 && (
  <>
    <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E2A47' }}>
            <TableRow>
              {bankHeaders.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.875rem'
                  }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                      sx={{ 
                        color: 'white !important',
                        '&:hover': { color: 'white !important' },
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
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBankDetails.length > 0 ? (
              filteredBankDetails.map((agency) => (
                <TableRow 
                  key={agency.id} 
                  hover
                  sx={{ 
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{agency.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{agency.name}</TableCell>
                  <TableCell>
                    {agency.bankName || (
                      <Typography variant="body2" color="textSecondary">
                        Not provided
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {agency.accountNumber ? (
                      <Box component="span" sx={{ fontFamily: 'monospace' }}>
                        •••• •••• {agency.accountNumber.slice(-4)}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Not provided
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {agency.accountHolderName || (
                      <Typography variant="body2" color="textSecondary">
                        Not provided
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {agency.iban ? (
                      <Box component="span" sx={{ fontFamily: 'monospace' }}>
                        {agency.iban}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Not provided
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleDialogOpen(agency)}
                      size="small"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText'
                        }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={bankHeaders.length + 1} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    No bank details found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>

    {/* Edit Bank Details Dialog */}
    <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        backgroundColor: '#1E2A47', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Edit Bank Details</span>
        <Typography variant="subtitle2">
          Agency: {currentAgency?.name || 'N/A'}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Bank Name"
              value={currentAgency?.bankName || ''}
              margin="normal"
              onChange={(e) => setCurrentAgency({
                ...currentAgency,
                bankName: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Account Holder Name"
              value={currentAgency?.accountHolderName || ''}
              margin="normal"
              onChange={(e) => setCurrentAgency({
                ...currentAgency,
                accountHolderName: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Account Number"
              value={currentAgency?.accountNumber || ''}
              margin="normal"
              onChange={(e) => setCurrentAgency({
                ...currentAgency,
                accountNumber: e.target.value
              })}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="IBAN/SWIFT Code"
              value={currentAgency?.iban || ''}
              margin="normal"
              onChange={(e) => setCurrentAgency({
                ...currentAgency,
                iban: e.target.value
              })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={handleDialogClose} 
          variant="outlined"
          sx={{ 
            color: '#1E2A47',
            borderColor: '#1E2A47',
            '&:hover': {
              borderColor: '#3B4F6B'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSaveBankDetails}
          sx={{ 
            backgroundColor: '#1E2A47',
            '&:hover': { 
              backgroundColor: '#3B4F6B',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }
          }}
        >
          Update Details
        </Button>
      </DialogActions>
    </Dialog>
  </>
)}
        </>
      )}
    </Box>
  );
}