import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Logo from './ex.png'; 
import BackgroundGif from './money.gif'; 

export const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
        try {
            const response = await fetch(`https://localhost:44331/api/Expenses/LoginPage/${encodeURIComponent(formData.email)}/${encodeURIComponent(formData.password)}`, {  
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const valid = await response.json();
                if (valid) {
                    navigate('/addexpenses'); 
                } else {
                    setLoginError('Invalid Email/Password'); 
                }
            } else {
                setLoginError('An error occurred while logging in.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginError('An error occurred while logging in.');
        }
    } else {
        setErrors(validationErrors);
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${BackgroundGif})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      <Paper 
        elevation={4} 
        sx={{
          padding: 4,
          borderRadius: 2,
          width: '400px',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        }}
      >
        <Box 
          component="img" 
          src={Logo} 
          alt="Expense Tracker Logo" 
          sx={{ width: '100px', marginBottom: 2 }} 
        />
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Please log in to your account
        </Typography>
        {loginError && <Typography color="error" variant="body2">{loginError}</Typography>}
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Email"
            variant="outlined"
            name='email'
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            name='password'
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <Button
            type='submit'
            variant="contained" 
            sx={{ marginTop: 2, width: '100%', backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }} 
          >
            Log In
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don’t have an account? 
          <Button onClick={() => navigate('/signup')} sx={{ textDecoration: 'underline', color: '#00796b' }}>
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};
