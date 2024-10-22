import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Logo from './ex.png'; 
import BackgroundGif from './money.gif'; 
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    if (!fname) newErrors.fullname = "Full name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!pass) newErrors.password = "Password is required";
    if (pass !== cpass) {
      newErrors.confirmPassword = "Passwords must match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('https://localhost:44331/api/Expenses/Signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name: fname,
            Email: email,
            PhoneNumber: phone,
            Password: pass,
          }),
        });

        if (response.ok) {
          console.log('Sign up successful');
          navigate('/login');
        } else {
          console.error('Sign up failed');
        }
      } catch (error) {
        console.error('Error during sign up:', error);
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
          Create an Account
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Please fill in the details to sign up
        </Typography>
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
            label="Full Name"
            variant="outlined"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            error={!!errors.fullname}
            helperText={errors.fullname}
            required
          />
      
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            required
          />

          <TextField
            label="Mobile No"
            type="number"
            value={phone}
            variant='outlined'
            onChange={(e) => setPhone(e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            required
          />
        
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            required
          />
          
          <Button 
            type="submit"
            variant="contained" 
            sx={{ marginTop: 2, width: '100%', backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }} 
          >
            Create Account
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account? 
          <a href="/login"> Log In</a>
        </Typography>
      </Paper>
    </Box>
  );
};
