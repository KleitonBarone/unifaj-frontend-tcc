import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/auth'
import { Radio } from '@material-ui/core';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardFooter from 'components/Card/CardFooter';
import VideoCall from '@material-ui/icons/VideoCall';
import Update from '@material-ui/icons/Update';

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

export default function Courses() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const state = useSelector(state=>state)

  let [courses,setCourses] = useState([])

  const getCourses = () => {
    
    fetch("https://backend-estudar-tcc.herokuapp.com/courses",{
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    }).then(response =>response.json().then(data =>{ 
        console.log(data)

        data.forEach((course,i) => {
            course.students.forEach(student =>{
              if(student.id == localStorage.getItem("USER_ID")) {
                data.splice(i,1)
              }
            })
        })

        console.log(data)
        setCourses([...data])
    }))
  }

  const subscription = (courseId) =>{
    console.log(courseId)
    fetch(`https://backend-estudar-tcc.herokuapp.com/courses/subscription/${courseId}/student/${localStorage.getItem("USER_ID")}`,{
      method: "POST",
      headers: {'Content-Type': 'application/json'}
    }).then(data =>{
      getCourses()
    })
  }

  useEffect(() =>{
      getCourses()
  },[])

  return (
    <Container component="main">
      <GridContainer>
        {
          courses.map(course =>{
              return(<GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                  <VideoCallIcon />
                  </CardIcon>
                  <p className={classes.cardCategory} style={{color:"black", fontSize: 17}}>{"Data de inicio: " + new Date(course["dateTime"]).getDay() + "/" + new Date(course["dateTime"]).getMonth() + "/" + new Date(course["dateTime"]).getFullYear()}</p>
                  <h3 className={classes.cardTitle} style={{color:"black"}}>{course["name"]}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                    <Button onClick={() => subscription(course["id"])}>
                      inscrever-se
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>)
          })
        }
      </GridContainer>
    </Container>
  );
}