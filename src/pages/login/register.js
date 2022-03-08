import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from "../../components/CustomButtons/Button";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axiosService from '../../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [setting, setSetting] = React.useState({})
    const [isReady, setReady] = React.useState(false)
    let navigation = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event)
        const data = new FormData(event.currentTarget);
        console.log(data);
        setReady(true)
        axiosService.post("/create/user", {
            login: data.get('email'),
            password: data.get('password'),
            people: [
                {
                    name: data.get('name'),
                    surname: data.get('surname'),
                    email: data.get('email'),
                    username: data.get('login')
                }
            ],
            is_active: false,
            authorization: 0
        }).then(
            (data) => {
                setReady(false)
                if (data.data?.statu === 400) {
                    toast.error("Essayer avec une autre adress mail identifiant")
                }
                else {
                    console.log(data);
                    toast.error("Inscription reussi")
                    return navigation("/")
                }
            }
        ).catch((err) => {
            toast.error("Une erreur s'est produite")
            setReady(false)

        }
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
                        S'inscrire
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Nom"
                            id="name"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="surname"
                            label="Prenom"
                            id="surname"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="E-mail"
                            id="email"
                        />

    

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                        />




                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Se rappeler de moi"
                        />
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isReady}
                        >
                            Inscription
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Vous avez un compte ? Connecter vous ici !"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}