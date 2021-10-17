
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { useForm } from 'react-hook-form'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './signup.css';
//import * as yup from 'yup';
import YouTube from '@material-ui/icons/YouTube';
import { Radio } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  // const schema = yup.object().shape({
  //   firstName: yup.string().required(),
  //   lastName: yup.string().required(),
  //   email: yup.string().email().required(),
  //   password: yup.string().required(),
  //   city: yup.string().required(),
  //   country: yup.string().required()
  // })

  let [errors,setErros] = useState([])

  let [userInfo,setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
    type: ''
  })
  const classes = useStyles();



  const inputUserInfo = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    
    setUserInfo((state) => ({...state,[event.target.name]: event.target.value}))
  }

  const registerUser = (event) =>{
    event.preventDefault()
    let hasError = false;
    setErros([])
    if(userInfo["firstName"].length == 0) {
      hasError = true
      setErros((state) =>([...state,{value:"Nome deve ser preenchido"}]))
    }
    if(userInfo["lastName"].length == 0) {
      hasError = true
      setErros((state) =>([...state,{value:"Sobrenome deve ser preenchido"}]))
    }
    if(userInfo["email"].length == 0) {
      hasError = true
      setErros((state) =>([...state,{value:"Email deve ser preenchida"}]))
    }
    if(userInfo["type"] == '') {
      hasError = true
      setErros((state) =>([...state,{value:"Tipo do usuário deve ser informado"}]))
    }
    if(userInfo["password"].length == 0) {
      hasError = true
      setErros((state) =>([...state,{value:"Senha deve ser preenchido"}]))
    }

    if(!hasError) {
      fetch("https://backend-estudar-tcc.herokuapp.com/"+userInfo["type"],{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
      }).then(response => console.log(response.json().then(data => console.log(data)))).catch(err => console.log(err))  
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
          Cadastrar-se
        </Typography>
        {errors.map(err =>{
          return <div className="error-box">{err["value"]}</div>
        })}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
                onChange={(event) => inputUserInfo(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="lastName"
                onChange={inputUserInfo}
                value={userInfo["lastName"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Conta de e-mail"
                name="email"
                autoComplete="email"
                onChange={inputUserInfo}
                value={userInfo["email"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputUserInfo}
                value={userInfo["password"]}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="telefone"
                type="phone"
                id="phone"
                autoComplete="phone"
                onChange={inputUserInfo}
                value={userInfo["phone"]}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="city"
                label="cidade"
                type="text"
                id="city"
                autoComplete="city"
                onChange={inputUserInfo}
                value={userInfo["city"]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="country"
                label="pais"
                type="text"
                id="country"
                autoComplete="country"
                onChange={inputUserInfo}
                value={userInfo["country"]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Radio value="students" color="primary" name="type" onChange={inputUserInfo}/>}
                label="Estudante"
                name="type"
              />
              <FormControlLabel
                control={<Radio value="instructors" color="primary" name="type" onChange={inputUserInfo}/>}
                label="Instrutor"
                name="type"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerUser}
          >
            Inscrever-se
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
               Já possui uma conta ? Entre aqui
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}