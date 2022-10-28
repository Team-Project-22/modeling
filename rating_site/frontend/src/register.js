import {useState} from "react";
import axiosInstance from './axios';
import {useNavigate} from 'react-router-dom';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function SignUp(){
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password1: '',
        password2: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) =>{
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post('account/registration/', {
                email: formData.email,
                username: formData.username,
                password1: formData.password1,
                password2: formData.password2,
            })
            .then((res) => {
                navigate('/login');
                console.log(res);
                console.log(res.data);
            });
    };
    const theme = createTheme();

    return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      onChange={handleChange}

                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required={false}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Password1"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Password2"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="이메일을 통해 뉴스레터를 받고싶나요?"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  이미 계정이 있나요? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
