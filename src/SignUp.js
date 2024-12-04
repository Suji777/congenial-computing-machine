// SignUp.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Details:', userDetails);
    // Here, you would send the data to the server to create the user account
    alert('Sign Up successful!');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={userDetails.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          type="password"
          value={userDetails.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
