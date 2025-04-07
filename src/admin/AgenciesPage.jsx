// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Button,
//   IconButton,
//   Chip,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Menu,
//   MenuItem,
//   Tabs,
//   Tab
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   MoreVert as MoreVertIcon
// } from '@mui/icons-material';

// // Sample data - replace with API calls
// const mockAgenciesData = [
//   {
//     id: '001',
//     name: 'Media Solutions',
//     email: 'john-smith@example.com',
//     phone: '(123) 456-7890',
//     totalHoardings: 15,
//     activeHoardings: 12,
//     status: 'Active',
//     bankDetails: {
//       bankName: 'City Bank',
//       accountHolderName: 'Media Solutions',
//       accountNumber: '123456789',
//       iban: 'US123456789'
//     }
//   },
//   {
//     id: '002',
//     name: 'Advert Pro',
//     email: 'advert@example.com',
//     phone: '(987) 654-3210',
//     totalHoardings: 8,
//     activeHoardings: 5,
//     status: 'Active',
//     bankDetails: {
//       bankName: 'National Bank',
//       accountHolderName: 'Advert Pro',
//       accountNumber: '987654321',
//       iban: 'US987654321'
//     }
//   }
// ];

// export default function AgenciesPage() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [agencies, setAgencies] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [currentAgency, setCurrentAgency] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchAgencies = async () => {
//       try {
//         // TODO: Replace with actual API call
//         // const response = await fetch('/api/agencies');
//         // const data = await response.json();
//         // setAgencies(data);
        
//         // Using mock data for now
//         setAgencies(mockAgenciesData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching agencies:', error);
//         setLoading(false);
//       }
//     };

//     fetchAgencies();
//   }, []);

//   //For Navigation to "Agency Detail Table" and "Agency Bank details"
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   //For Searching Bar
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   //for the purpose of Add/Edit table data
//   const handleDialogOpen = (agency = null) => {
//     setCurrentAgency(agency);
//     setOpenDialog(true);
//   };
//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setCurrentAgency(null);
//   };

//   //Save the Data of table "Agency Details" after Editing
//   const handleSaveAgency = async () => {
//     try {
//       // TODO: Replace with actual API call
//       if (currentAgency) {
//         // Update existing agency
//         // await fetch(`/api/agencies/${currentAgency.id}`, {
//         //   method: 'PUT',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(formData)
//         // });
//       } else {
//         // Create new agency
//         // await fetch('/api/agencies', {
//         //   method: 'POST',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(formData)
//         // });
//       }
//       // Refresh data
//       // const response = await fetch('/api/agencies');
//       // const data = await response.json();
//       // setAgencies(data);
      
//       handleDialogClose();
//     } catch (error) {
//       console.error('Error saving agency:', error);
//     }
//   };

//   //Update Table After Delete the "Agencies Details" Data
//   const handleDelete = async (id) => {
//     try {
//       // TODO: Replace with actual API call
//       // await fetch(`/api/agencies/${id}`, { method: 'DELETE' });
//       // Refresh data
//       // const response = await fetch('/api/agencies');
//       // const data = await response.json();
//       // setAgencies(data);
//     } catch (error) {
//       console.error('Error deleting agency:', error);
//     }
//   };

//   //for searching purpose
//   const filteredAgencies = agencies.filter(agency =>
//     Object.values(agency).some(
//       value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//   ));

//   return (
//     <Box sx={{ ml: '240px', p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Agency Management
//       </Typography>

//       {/* Tabs for Agencies Details and Bank Details */}
//       <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
//         <Tabs value={activeTab} onChange={handleTabChange}>
//           <Tab label="Agencies Details" />
//           <Tab label="Agency Bank Details" />
//         </Tabs>
//       </Box>

//       {/* Search and Add Button */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           size="small"
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
//           }}
//           sx={{ width: 400 }}
//           onChange={handleSearch}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={() => handleDialogOpen()}
//         >
//           Add Agency
//         </Button>
//       </Box>

//       {/* Agencies Details Table */}
//       {activeTab === 0 && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Agency ID</TableCell>
//                 <TableCell>Agency Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Phone</TableCell>
//                 <TableCell>Total Hoardings</TableCell>
//                 <TableCell>Active Hoardings</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredAgencies.map((agency) => (
//                 <TableRow key={agency.id}>
//                   <TableCell>{agency.id}</TableCell>
//                   <TableCell>{agency.name}</TableCell>
//                   <TableCell>{agency.email}</TableCell>
//                   <TableCell>{agency.phone}</TableCell>
//                   <TableCell>{agency.totalHoardings}</TableCell>
//                   <TableCell>{agency.activeHoardings}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleDialogOpen(agency)}>
//                       <EditIcon color="primary" />
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(agency.id)}>
//                       <DeleteIcon color="error" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Bank Details Table */}
//       {activeTab === 1 && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Agency ID</TableCell>
//                 <TableCell>Agency Name</TableCell>
//                 <TableCell>Bank Name</TableCell>
//                 <TableCell>Account Number</TableCell>
//                 <TableCell>Account Holder</TableCell>
//                 <TableCell>IBAN/SWIFT</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredAgencies.map((agency) => (
//                 <TableRow key={agency.id}>
//                   <TableCell>{agency.id}</TableCell>
//                   <TableCell>{agency.name}</TableCell>
//                   <TableCell>{agency.bankDetails.bankName}</TableCell>
//                   <TableCell>{agency.bankDetails.accountNumber}</TableCell>
//                   <TableCell>{agency.bankDetails.accountHolderName}</TableCell>
//                   <TableCell>{agency.bankDetails.iban}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleDialogOpen(agency)}>
//                       <EditIcon color="primary" />
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(agency.id)}>
//                       <DeleteIcon color="error" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Add/Edit Dialog */}
//       <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
//         <DialogTitle>{currentAgency ? 'Edit Agency' : 'Add New Agency'}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Agency Name"
//                 defaultValue={currentAgency?.name || ''}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 type="email"
//                 defaultValue={currentAgency?.email || ''}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Phone"
//                 defaultValue={currentAgency?.phone || ''}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Total Hoardings"
//                 type="number"
//                 defaultValue={currentAgency?.totalHoardings || ''}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Active Hoardings"
//                 type="number"
//                 defaultValue={currentAgency?.activeHoardings || ''}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
//                 Bank Details
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Bank Name"
//                 defaultValue={currentAgency?.bankDetails?.bankName || ''}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Account Holder Name"
//                 defaultValue={currentAgency?.bankDetails?.accountHolderName || ''}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Account Number"
//                 defaultValue={currentAgency?.bankDetails?.accountNumber || ''}
//                 margin="normal"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="IBAN/SWIFT"
//                 defaultValue={currentAgency?.bankDetails?.iban || ''}
//                 margin="normal"
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Cancel</Button>
//           <Button variant="contained" color="primary" onClick={handleSaveAgency}>
//             {currentAgency ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

import React, { useState, useEffect } from 'react';
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
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

export default function AgenciesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [agencies, setAgencies] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAgency, setCurrentAgency] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch agencies data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch agencies details
        const agenciesRes = await fetch('http://localhost:3000/agency/agencies');
        const agenciesData = await agenciesRes.json();
        setAgencies(agenciesData.data);

        // Fetch bank details
        const bankRes = await fetch('http://localhost:3000/agency/agency-bank-details');
        const bankData = await bankRes.json();
        setBankDetails(bankData.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      const response = await fetch(`http://localhost:3000/agency/update-bank-details/${currentAgency.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentAgency.bankDetails)
      });
      
      const data = await response.json();
      // Update local state
      setBankDetails(bankDetails.map(agency => 
        agency.id === currentAgency.id ? data.data : agency
      ));
      handleDialogClose();
    } catch (error) {
      console.error('Error updating bank details:', error);
    }
  };

  const filteredAgencies = agencies.filter(agency =>
    Object.values(agency).some(
      value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const filteredBankDetails = bankDetails.filter(agency =>
    Object.values(agency).some(
      value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ ml: '240px', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Agency Management
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Agencies Details" />
          <Tab label="Agency Bank Details" />
        </Tabs>
      </Box>

      {/* Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          }}
          sx={{ width: 400 }}
          onChange={handleSearch}
        />
      </Box>

      {/* Agencies Details Table */}
      {activeTab === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Agency ID</TableCell>
                <TableCell>Agency Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Total Hoardings</TableCell>
                <TableCell>Active Hoardings</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAgencies.map((agency) => (
                <TableRow key={agency.id}>
                  <TableCell>{agency.id}</TableCell>
                  <TableCell>{agency.name}</TableCell>
                  <TableCell>{agency.email}</TableCell>
                  <TableCell>{agency.phone || 'N/A'}</TableCell>
                  <TableCell>{agency.totalHoardings}</TableCell>
                  <TableCell>{agency.activeHoardings}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => console.log('Edit', agency.id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => console.log('Delete', agency.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Bank Details Table */}
      {activeTab === 1 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Agency ID</TableCell>
                  <TableCell>Agency Name</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Account Holder</TableCell>
                  <TableCell>IBAN/SWIFT</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBankDetails.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell>{agency.id}</TableCell>
                    <TableCell>{agency.name}</TableCell>
                    <TableCell>{agency.bankName}</TableCell>
                    <TableCell>{agency.accountNumber}</TableCell>
                    <TableCell>{agency.accountHolderName}</TableCell>
                    <TableCell>{agency.iban}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDialogOpen(agency)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Edit Bank Details Dialog */}
          <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Bank Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    defaultValue={currentAgency?.bankName || ''}
                    margin="normal"
                    onChange={(e) => setCurrentAgency({
                      ...currentAgency,
                      bankDetails: {
                        ...currentAgency?.bankDetails,
                        bankName: e.target.value
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Holder Name"
                    defaultValue={currentAgency?.accountHolderName || ''}
                    margin="normal"
                    onChange={(e) => setCurrentAgency({
                      ...currentAgency,
                      bankDetails: {
                        ...currentAgency?.bankDetails,
                        accountHolderName: e.target.value
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    defaultValue={currentAgency?.accountNumber || ''}
                    margin="normal"
                    onChange={(e) => setCurrentAgency({
                      ...currentAgency,
                      bankDetails: {
                        ...currentAgency?.bankDetails,
                        accountNumber: e.target.value
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="IBAN/SWIFT"
                    defaultValue={currentAgency?.iban || ''}
                    margin="normal"
                    onChange={(e) => setCurrentAgency({
                      ...currentAgency,
                      bankDetails: {
                        ...currentAgency?.bankDetails,
                        iban: e.target.value
                      }
                    })}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={handleSaveBankDetails}>
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}