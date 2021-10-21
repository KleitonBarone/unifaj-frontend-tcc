import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/auth'
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  palette: {
    type: 'dark',
  },
}));

export default function RegisterCourse() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const state = useSelector(state=>state)

  let [errors,setErros] = useState([])
  let [courseInfo,setCourseInfo] = useState({
    name: '',
    category:0,
    dateTime:'',
    link:'',
    instructor:{}
  })

  const inputCourseInfo = (event) => {
    if(event.target.name == "category") {
        event.target.value = parseInt(event.target.value)
    }
    setCourseInfo((state) => ({...state,[event.target.name]: event.target.value}))
  }

  const handlerRegisterCourse = (e) => {
    e.preventDefault()
    
    fetch("http://localhost:3001/courses/"+localStorage.getItem("EMAIL"),{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(courseInfo)
    }).then(response =>response.json().then(data =>{ 
        console.log(data)
    }))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {errors.map(err =>{
          return <div className="error-box">{err["value"]}</div>
        })}
        <form className={classes.form} noValidate>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Titulo"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(event) => inputCourseInfo(event)}
            />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="link"
                label="Link"
                name="link"
                autoComplete="link"
                autoFocus
                onChange={(event) => inputCourseInfo(event)}
                 />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                type="date"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="link"
                name="link"
                autoComplete="link"
                autoFocus
                onChange={(event) => inputCourseInfo(event)}
                 />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Radio value="0" color="primary" name="type" onChange={inputCourseInfo}/>}
                label="Curso"
                name="category"
              />
              <FormControlLabel
                control={<Radio value="1" color="primary" name="type" onChange={inputCourseInfo}/>}
                label="Palestra"
                name="category"
              />
            </Grid>
         </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlerRegisterCourse}
          >
            Cadastrar
          </Button>
        </form>
      </div>
      <Box mt={8}>
     
      </Box>
    </Container>
  );
}