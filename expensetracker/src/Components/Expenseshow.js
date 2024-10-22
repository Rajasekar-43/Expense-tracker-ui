import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { keyframes } from '@mui/system';
import 'aos/dist/aos.css';

const 
foldOutAnimation = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
`;
export const ExpenseShow = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('https://localhost:44331/api/Expenses/ViewExpense');
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        alert("Start date must be before end date");
        return;
      }
      try {
        const res = await axios.get('https://localhost:44331/api/Expenses/filter', {
          params: {
            startDate: startDate,
            endDate: endDate
          }
        });
        setFilteredData(res.data);
      } catch (err) {
        console.error("Error fetching filtered data:", err);
      }
    } else {
      setFilteredData(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`https://localhost:44331/api/Expenses/DeleteExpense${id}`);
        fetchExpenses();
      } catch (err) {
        console.error("Error deleting expense:", err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/UpdateExpense/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: '5%', marginX: '5%', backgroundColor: '#f0f8ff', padding: '2%' }}>
      <Typography data-aos="fade-down" variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
        Monthly Expense Tracker
      </Typography>

      <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <TextField
           label="From Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: '10px' }}
        />
        <TextField
          label="To Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: '10px' }}>
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                minWidth: 275,
                boxShadow: 3,
                transition: 'transform 0.2s',
                backgroundColor: '#ffffff',
                '&:hover': {
                  animation: `${foldOutAnimation} 0.5s forwards`,
                  boxShadow: 6,
                  backgroundColor: '#e1bee7'
                }
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  {item.description}
                </Typography>
                
                <Typography sx={{ mb: 1.5 }} color="text.primary">
                  Amount: {item.amount} | Date: {new Date(item.date).toLocaleDateString()}
                </Typography>

                {item.billDoc &&(
                  <img
                  src={`data:image/jpeg;base64,${item.billDoc}`}
                  alt='Bill document'
                  style={{width:'100%',height:'300px',marginBlockStart:'10px'}}/>
                )}

                <Button variant="contained" onClick={() => handleEdit(item.id)} sx={{ marginRight: '10px' }}>
                  Edit
                </Button>

                <Button variant="outlined" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
