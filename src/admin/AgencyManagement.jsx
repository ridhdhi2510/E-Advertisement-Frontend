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
  const [hoardingCounts, setHoardingCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Get roleId for 'agency' first
        const rolesResponse = await axios.get('/role/getall');
        const agencyRole = rolesResponse.data.data.find(role => role.name === 'agency');
                
        setLoading(true);
        // Fetch agencies details
        const agenciesRes = await axios.get(`http://localhost:3000/user/getbyrole/${agencyRole._id}`);
        setAgencies(agenciesRes.data.data || []);

        // Fetch bank details
        const bankRes = await axios.get('http://localhost:3000/bankdetailsagency/getall');
        setBankDetails(bankRes.data.data || []);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
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

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };


  // Filter and sort data
  const filteredAgencies = stableSort(
    agencies.filter(agency => {
      if (!agency) return false;
      return (
        (agency.name && agency.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agency.email && agency.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agency._id && agency._id.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }),
    getComparator(order, orderBy)
  );

  useEffect(() => {
      const fetchHordingCounts = async () => {
        const counts = {};
    
        await Promise.all(
          filteredAgencies.map(async (agency) => {
            try {
              const res = await axios.get(`/hording/getHordingsbyuserid/${agency._id}`);
              counts[agency._id] = res.data.data.length;
            } catch (e) {
              console.error("Error fetching hording for", agency._id, e);
              counts[agency._id] = 0;
            }
          })
        );
    
        setHoardingCounts(counts);
      };
    
      if (filteredAgencies.length > 0) {
        fetchHordingCounts();
      }
    }, [filteredAgencies]);
    


  // Sorting functions
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
        `http://localhost:3000/bankdetailsagency/update/${currentAgency._id}`,
        currentAgency,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      setBankDetails(bankDetails.map(agency => 
        agency._id === currentAgency._id ? response.data.data : agency
      ));
      handleDialogClose();
    } catch (error) {
      console.error('Error updating bank details:', error);
    }
  };

  const filteredBankDetails = stableSort(
    bankDetails.filter(bank => {
      if (!bank) return false;
      const agency = agencies.find(a => a._id === bank.userId);
      return (
        (bank.bankName && bank.bankName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (bank.branchName && bank.branchName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (bank.userId && bank.userId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agency && agency.name && agency.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }),
    getComparator(order, orderBy)
  );

  // Table headers with sorting
  const agencyHeaders = [
    { id: '_id', label: 'Agency ID', sortable: true },
    { id: 'name', label: 'Agency Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'totalHoardings', label: 'Total Hoardings', sortable: true },
  ];

  const bankHeaders = [
    { id: 'userId', label: 'Agency ID', sortable: true },
    { id: 'agencyName', label: 'Agency Name', sortable: true },
    { id: 'bankName', label: 'Bank Name', sortable: true },
    { id: 'branchName', label: 'Branch Name', sortable: true },
    { id: 'accountNumber', label: 'Account Number', sortable: true },
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
                      <TableRow key={agency._id} hover>
                        <TableCell>{agency._id || 'N/A'}</TableCell>
                        <TableCell>{agency.name || 'N/A'}</TableCell>
                        <TableCell>{agency.email || 'N/A'}</TableCell>
                        <TableCell>
                        {hoardingCounts[agency._id] !== undefined
                        ? hoardingCounts[agency._id]
                        : "Loading..."}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* Bank Details Table */}
          {activeTab === 1 && (
            <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#1E2A47' }}>
                    <TableRow>
                      {bankHeaders.map((headCell) => (
                        <TableCell
                          key={headCell.id}
                          sortDirection={orderBy === headCell.id ? order : false}
                          sx={{ color: 'white', fontWeight: 'bold' }}
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
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBankDetails.length > 0 ? (
                      filteredBankDetails.map((bankDetail) => {
                        const agency = agencies.find(a => a._id === bankDetail.userId);
                        return (
                          <TableRow 
                            key={bankDetail._id} 
                            hover
                            sx={{ 
                              '&:nth-of-type(odd)': {
                                backgroundColor: 'action.hover'
                              }
                            }}
                          >
                            <TableCell sx={{ fontWeight: 500 }}>
                              {bankDetail.userId?._id || 'N/A'}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>
                              {bankDetail.userId?.name || 'N/A'}
                            </TableCell>
                            <TableCell>
                              {bankDetail.bankName || 'Not provided'}
                            </TableCell>
                            <TableCell>
                              {bankDetail.branchName || 'Not provided'}
                            </TableCell>
                            <TableCell>
                              {bankDetail.accountNumber || 'Not provided'}
                            </TableCell>
                            <TableCell>
                              <IconButton 
                                onClick={() => handleDialogOpen(bankDetail)}
                                size="small"
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
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
          )}
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Bank Details</DialogTitle>
        <DialogContent>
          {currentAgency && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  value={currentAgency.bankName || ''}
                  onChange={(e) => setCurrentAgency({...currentAgency, bankName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Branch Name"
                  value={currentAgency.branchName || ''}
                  onChange={(e) => setCurrentAgency({...currentAgency, branchName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Number"
                  value={currentAgency.accountNumber || ''}
                  onChange={(e) => setCurrentAgency({...currentAgency, accountNumber: e.target.value})}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveBankDetails} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}