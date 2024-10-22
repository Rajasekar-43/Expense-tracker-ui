import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import Background from './b.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
 
const Wrapper = ({ children }) => {
  return (
    <Box data-aos="fade-up"
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        paddingTop: '10px',
        paddingRight:'100px'
      }}
    >
      {children}
    </Box>
  );
};
 
const categories = ['Food', 'Transport', 'Entertainment', 'Others'];

 
export const UpdateExpenses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [file,setFile]=useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });


 
  useEffect(() => {
    AOS.init({ duration: 3000 });
    fetchExpense();
 
  }, []);
 
  
  const fetchExpense = async () => {
    try {
      const response = await axios.get(`https://localhost:44331/api/Expenses/EditExpence/${id}`);
      const expense = response.data;
    
      setAmount(expense.amount);
     
      setCategory(expense.category);
      setDescription(expense.description);
      setDate(expense.date.split('T')[0]);
      setFile(expense.file);
    } catch (error) {
      console.error('Error fetching expense:', error);
      setSnackbarMessage('Error fetching expense data');
      setSnackbarOpen(true);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;

      if (!['image/jpeg', 'image/png',].includes(fileType)) {
        setAlert({
          open: true,
          message: 'Unsupported file type. Please upload an image' ,
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
    const updatedExpense = {   Amount: parseFloat(amount),
      Category: category,
      Description: description,
      Date: date,
      Base64data: file,};
    try {
      await axios.put(`https://localhost:44331/api/Expenses/UpdateExpense/${id}`, updatedExpense);
      setSnackbarMessage('Expense updated successfully!');
      setSnackbarOpen(true);
      setTimeout(() => navigate('/view'), 500);
    } catch (error) {
      console.error('Error updating expense:', error);
      setSnackbarMessage('Error updating expense');
      setSnackbarOpen(true);
    }
  };
 
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
          Update Expense
        </Typography>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
     
          variant="outlined"
          margin="normal"
          fullWidth
        />
 
        <FormControl variant="outlined" margin="normal" fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
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
 
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '30px' }}>
          <Button variant="contained" type="submit" sx={{ backgroundColor: 'black' }} onClick={handleSubmit}>
            Update Expense
          </Button>
         
        </Box>
 
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Wrapper>
  );
};