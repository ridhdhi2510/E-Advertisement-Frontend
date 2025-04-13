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
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export default function HordingManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoardings, setHoardings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch hoardings with populated data
        const response = await axios.get('http://localhost:3000/hording/getall');
        
        // Transform the data to match the table structure
        const transformedData = response.data.data.map(hoarding => ({
          id: hoarding._id,
          type: hoarding.hoardingType,
          size: hoarding.hoardingDimension,
          state: hoarding.stateId?.name || 'N/A',
          city: hoarding.cityId?.name || 'N/A',
          area: hoarding.areaId?.name || 'N/A',
          agencyName: hoarding.userId?.name || 'N/A', // Assuming agency name is stored in user document
          availableStatus: hoarding.Availablity_Status ? 'Available' : 'Not Available',
          customerName: 'N/A' // Will be updated if booking exists
        }));
        
        // Fetch bookings to update availability status and customer names
        const bookingsResponse = await axios.get('http://localhost:3000/booking/getall');
        const bookings = bookingsResponse.data.data;
        
        // Update availability and customer name based on bookings
        const finalData = transformedData.map(hoarding => {
          const booking = bookings.find(b => b.hordingId?._id === hoarding.id);
          if (booking) {
            return {
              ...hoarding,
              availableStatus: 'Not Available',
              customerName: booking.userId?.name || 'Booked'
            };
          }
          return hoarding;
        });
        
        setHoardings(finalData);
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
      if (orderBy === 'state' || orderBy === 'city' || orderBy === 'area' || 
          orderBy === 'agencyName' || orderBy === 'customerName' || 
          orderBy === 'type' || orderBy === 'availableStatus') {
        return order === 'desc' 
          ? b[orderBy].localeCompare(a[orderBy])
          : a[orderBy].localeCompare(b[orderBy]);
      }
      
      if (b[orderBy] < a[orderBy]) {
        return order === 'desc' ? -1 : 1;
      }
      if (b[orderBy] > a[orderBy]) {
        return order === 'desc' ? 1 : -1;
      }
      return 0;
    };
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHoardings = stableSort(
    hoardings.filter(hoarding =>
      Object.values(hoarding).some(
        value => value !== null && 
                typeof value === 'string' && 
                value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  return (
    <Box sx={{ ml: '240px', p: 3, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1E2A47', fontWeight: 'bold' }}>
        Hoarding Management
      </Typography>

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
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#1E2A47' }}>
                {/* First row - Main headers */}
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Hoarding ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Hoarding Type</TableCell>
                  <TableCell sx={{ color: 'white' }}>Hoarding Size</TableCell>
                  <TableCell 
                    colSpan={3} 
                    align="center" 
                    sx={{ 
                      color: 'white',
                      borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                      borderLeft: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    Location
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>Agency Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Available Status</TableCell>
                  <TableCell sx={{ color: 'white' }}>Booking Customer</TableCell>
                </TableRow>
                
                {/* Second row - Sub headers under Location */}
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'id'}
                      direction={orderBy === 'id' ? order : 'asc'}
                      onClick={() => handleRequestSort('id')}
                      sx={{ color: 'white !important' }}
                    >
                      ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'type'}
                      direction={orderBy === 'type' ? order : 'asc'}
                      onClick={() => handleRequestSort('type')}
                      sx={{ color: 'white !important' }}
                    >
                      Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'size'}
                      direction={orderBy === 'size' ? order : 'asc'}
                      onClick={() => handleRequestSort('size')}
                      sx={{ color: 'white !important' }}
                    >
                      Size
                    </TableSortLabel>
                  </TableCell>
                  
                  {/* Location sub-headers */}
                  <TableCell sx={{ 
                    color: 'white',
                    borderRight: '1px solid rgba(255, 255, 255, 0.12)'
                  }}>
                    <TableSortLabel
                      active={orderBy === 'state'}
                      direction={orderBy === 'state' ? order : 'asc'}
                      onClick={() => handleRequestSort('state')}
                      sx={{ color: 'white !important' }}
                    >
                      State
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'city'}
                      direction={orderBy === 'city' ? order : 'asc'}
                      onClick={() => handleRequestSort('city')}
                      sx={{ color: 'white !important' }}
                    >
                      City
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ 
                    color: 'white',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.12)'
                  }}>
                    <TableSortLabel
                      active={orderBy === 'area'}
                      direction={orderBy === 'area' ? order : 'asc'}
                      onClick={() => handleRequestSort('area')}
                      sx={{ color: 'white !important' }}
                    >
                      Area
                    </TableSortLabel>
                  </TableCell>
                  
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'agencyName'}
                      direction={orderBy === 'agencyName' ? order : 'asc'}
                      onClick={() => handleRequestSort('agencyName')}
                      sx={{ color: 'white !important' }}
                    >
                      Agency
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'availableStatus'}
                      direction={orderBy === 'availableStatus' ? order : 'asc'}
                      onClick={() => handleRequestSort('availableStatus')}
                      sx={{ color: 'white !important' }}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <TableSortLabel
                      active={orderBy === 'customerName'}
                      direction={orderBy === 'customerName' ? order : 'asc'}
                      onClick={() => handleRequestSort('customerName')}
                      sx={{ color: 'white !important' }}
                    >
                      Customer
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {filteredHoardings.map((hoarding) => (
                  <TableRow key={hoarding.id} hover>
                    <TableCell>{hoarding.id}</TableCell>
                    <TableCell>{hoarding.type}</TableCell>
                    <TableCell>{hoarding.size}</TableCell>
                    <TableCell>{hoarding.state}</TableCell>
                    <TableCell>{hoarding.city}</TableCell>
                    <TableCell>{hoarding.area}</TableCell>
                    <TableCell>{hoarding.agencyName}</TableCell>
                    <TableCell sx={{ 
                      color: hoarding.availableStatus === 'Available' ? 'green' : 'red',
                      fontWeight: 'bold'
                    }}>
                      {hoarding.availableStatus}
                    </TableCell>
                    <TableCell>{hoarding.customerName}</TableCell>
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