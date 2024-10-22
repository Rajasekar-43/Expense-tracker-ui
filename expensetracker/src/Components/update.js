import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import BackgroundGif from './b.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Wrapper = ({ children }) => {
  return (
    <Box data-aos="fade-up"
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${BackgroundGif})`,
        backgroundSize: 'cover',
        paddingTop: '10px',
        paddingRight: '100px',
      }}
    >
      {children}
    </Box>
  );
}

const categories = ['Food', 'Transport', 'Entertainment', 'Others'];
const API_URL = 'https://localhost:44331/api/Expenses/AddExpense';
const API_URL1 = 'https://localhost:44331/api/Expenses/ViewExpense';

export const UpdateExpenses = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [file, setFile] = useState(null); 
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL1);
      setExpenses(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 3000 });
    fetchExpenses(); 
  }, []);
 
  const handleSubmit = async (e) => {                                           
    e.preventDefault();
    const newExpense = new FormData();   
    newExpense.append('amount', parseFloat(amount));
    newExpense.append('category', category);
    newExpense.append('description', description); 
    newExpense.append('date', date);
    if (file) {
      newExpense.append('file', file); 
    }

    try {
      const response = await axios.post(API_URL, newExpense, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      setExpenses([...expenses, response.data]);
      setSnackbarMessage('Expense added successfully!');
      resetForm();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving expense:', error);
      setSnackbarMessage('Error saving expense');
      setSnackbarOpen(true);
    }
  };
  

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription(''); 
    setDate('');
    setFile(null); 
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  return (
    <Wrapper>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: 3,
          backgroundColor: 'rgba(97, 97, 212, 0.345)',
          maxWidth: '400px',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
          Expense Tracker
        </Typography>
        <TextField
          label="Amount"
          type="number"
          value={amount}

   onChange={(e) => setAmount(e.target.value)}
          required
          variant="outlined"
          margin="normal"
          fullWidth
        />    

        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            required
          >
            <MenuItem value=""><em>All</em></MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description" 
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          margin="normal"
          fullWidth
        />
        
        <Button variant="contained" component="label" sx={{ marginTop: '20px' }}>
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <Button variant="contained" type="submit" sx={{ marginTop: '30px', backgroundColor: 'black' }}>
          Add Expense
        </Button>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Wrapper>
  );
};
