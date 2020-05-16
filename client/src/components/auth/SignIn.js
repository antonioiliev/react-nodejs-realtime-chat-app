import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../footer/Footer';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessageContainer: {
    width: '100%',
    background: '#ff0000',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 3,
    padding: 10,
    marginTop: 15
  },
  errorMessage: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500
  }
}));

const SignIn = props => {
  const classes = useStyles();
  const [signInData, setSignInData] = React.useState({
      username: '',
      password: ''
  });

  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = event => {
      setSignInData({ ...signInData, [event.target.id]: event.target.value });

      if (event.target.id === 'username') {
        setErrorMessage('');
      }
  };

  const submit = () => {
    console.log('submitting');
    if (signInData.username === '' && signInData.password !== '') {
      setErrorMessage('Please enter a username');
    } else if (signInData.username === '' && signInData.password === '') {
      setErrorMessage('Please enter a username and a password');
    } else if (signInData.password === '' && signInData.username !== '') {
      setErrorMessage('Please enter a password');
    } else {
      axios.post(`${config.api_url}/login`, signInData).then(res => {
        console.log(res);

        if (!res.data.status) {
          setErrorMessage(res.data.message);
        } else {
          if (res.data.token !== undefined) {
            Cookies.set('jwt_mltst', res.data.token);
            props.history.push('/');
          }
        }
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorMessage !== '' ? (
          <div className={classes.errorMessageContainer}>
            <p className={classes.errorMessage}>{errorMessage}</p>
          </div>
        ) : null}
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            value={signInData.username}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={signInData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Sign In
          </Button>
        </div>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}

export default SignIn;