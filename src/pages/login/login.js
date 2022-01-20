import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import authSlice from "../../store/slices/auth"
import notifySlice from "../../store/slices/notify"
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosService from '../../utils/axios'



export default function Login() {
  const [setting, setSetting] = React.useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate()
  /* 
    const handleSubmit = (event) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      if (data.get('login') == "test" && data.get('password') == "test") {
        dispatch(notifySlice.actions.notifySuccess("Identifiant valide"));
        dispatch(authSlice.actions.setAccount({ nom: "LEWIS" }));
        toast.success('Succes');
  
        localStorage.setItem(
          Storage.Auth,
          JSON.stringify({ token: "data.token", refreshToken: "data.refresh" })
        );
        return navigate("dashboard")
      }
      else {
        console.log("error")
        toast.error('Identifiant invalide');
  
  
      }
  
  
  
    }*/
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('login'),
      password: data.get('password'),
    });


    axios.post("http://localhost:5002/login", {
      login: data.get('login'),
      password: data.get('password'),
    }).then(
      (data) => {
        console.log(data )

        if (data.data.statu != true) {
          console.log("not found")
          toast.error("Erreur de connexion")
        }
        else {
          try {
            console.log(data.data.token)
            dispatch(authSlice.actions.setAuthTokens({ token: data.data.token, refreshToken: data.data.token }));
            dispatch(authSlice.actions.setAccount({ account: data.data.data }));
            localStorage.setItem('user', JSON.stringify(data.data))
            return navigate("dashboard")
          }
          catch (e) {
            console.log(e)
          }
        }
      }
    ).catch((err) =>
      console.log(err)
    )
  };

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
              <ToastContainer />

      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Se connecter
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se rappeler de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Connection
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Vous n'anez pas de compte ? Inscrivez vous !"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}