import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import Background from './b.png';
import 'aos/dist/aos.css';

const Wrapper = ({ children }) => {
  return (
    <Box
      data-aos="fade-up"
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        paddingTop: '10px',
        paddingRight: '100px',
      }}
    >
      {children}
    </Box>
  );
};

const categories = ['Food', 'Transport', 'Entertainment', 'Others'];
const API_URL = 'https://localhost:44331/api/Expenses/AddExpense';

export const Addexpenses = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;

      if (!['image/jpeg', 'image/png'].includes(fileType)) {
        setAlert({
          open: true,
          message: 'Unsupported file type. Please upload an image or a PDF.',
          severity: 'error',
        });
        setFile(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result.split(',')[1]); 
        console.log('File Base64:', reader.result);

      };
      reader.readAsDataURL(selectedFile);
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      Amount: parseFloat(amount),
      Category: category,
      Description: description,
      Date: date,
      Base64data: file,
    };

    try {
      const response = await axios.post(API_URL, newExpense);
      setAlert({ open: true, message: 'Expense added successfully!', severity: 'success' });
      resetForm();
    } catch (error) {
      if (error.response && error.response.status === 415) {
        setAlert({ open: true, message: 'Unsupported media type. Please upload a valid file.', severity: 'error' });
      } else {
        setAlert({ open: true, message: 'Error saving expense', severity: 'error' });
      }
    }
  };

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
    setDate('');
    setFile(null);
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
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


        <input
          type="file"
          accept=" image/*"
          onChange={handleFileChange}
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: '30px', backgroundColor: 'black' }}>
          Add Expense
        </Button>
        {alert.open && (
          <Alert severity={alert.severity} sx={{ marginTop: '20px' }} onClose={handleAlertClose}>
            {alert.message}
          </Alert>
        )}
      </Box>
    </Wrapper>
  );
};
