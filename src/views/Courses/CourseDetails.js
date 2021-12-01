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
import VideoCall from '@material-ui/icons/VideoCall';

import CardAvatar from "components/Card/CardAvatar";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputLabel from "@material-ui/core/InputLabel";

import avatar from "assets/img/faces/marc.jpg";

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

export default function CourseDetails(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const state = useSelector(state=>state)

  let [course,setCourse] = useState({
      id:"",
      name:"",
      category:"",
      link:"",
      description:"",
      dateTime:"",
      instructor:{
          firstName:"",
          lastName:"",
          email:""
      }
  })

  useEffect(() =>{
      console.log(props.match.params.id)
      fetch("https://backend-estudar-tcc.herokuapp.com/courses/"+ props.match.params.id,{
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      }).then(response =>response.json().then(data =>{ 
          console.log(data)

          if(data["category"] == 0) {
              data["category"] = "Curso"
          }else {
            data["category"] = "Palestra"
          }
          setCourse({...data})
          console.log(course["name"])
      }))

  },[])


  return (
    <Container component="main">
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Conteúdo</h4>
              <p className={classes.cardCategoryWhite}>{course["name"]}</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        formControlProps={{
                        fullWidth: true,
                        }}
                        inputProps={{
                            value: course["dateTime"]
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        formControlProps={{
                        fullWidth: true,
                        }}
                        inputProps={{
                            value: course["category"]
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                        value: course["description"]
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary"><a href={course["link"]} target="_blank">Ir para seção</a></Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Instrutor</h6>
              <h4 className={classes.cardTitle}>{course["instructor"]["firstName"] + " " + course["instructor"]["lastName"]}</h4>
              <h3 className={classes.cardTitle}>{course["instructor"]["email"]}</h3>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Container>
  );
}