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
  let taskCards = ""

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
      },
      tasks:[]
  })

  let [task,setTask] = useState({
    name:"",
    A:"",
    B:"",
    C:"",
    D:"",
    responseQuestion:"",
    courseId:0
  })

  let [studentResponse,setStudentResponse] = useState({
    response:"",
    studentId:0,
    taskId:0
  })

  let [tasks,setTasks] = useState([])

  const handleTask = (e) =>{
    setTask({
      ...task,
      [e.target.name]:e.target.value
    })
  }

  const registerTask = () => {
    task.courseId = parseInt(props.match.params.id)
    console.log(task)
    fetch("https://backend-estudar-tcc.herokuapp.com/tasks/course/" + props.match.params.id, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    }).then(data => {
        getCourse()
    })
  }

  const getCourse = () => {
    task.courseId = parseInt(props.match.params.id)
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
        getTasks()
        console.log(course["name"])
    }))
  }

  const handleResponse = (e) =>{
    setStudentResponse({
      ...studentResponse,
      [e.target.name]:e.target.value
    })
  }

  const registerResponse = (task_id) =>{
    console.log(task_id)
      fetch("https://backend-estudar-tcc.herokuapp.com/studentResponses/student/"+ localStorage.getItem("USER_ID") + "/task/" + task_id,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(studentResponse)
      }).then(response =>response.json().then(data =>{ 
          getTasks()
      })).catch(c => {
        setStudentResponse({
          ...studentResponse,
          response:""
        })

        setTasks([])
        getTasks()
      })
  }

  const getTaskCards = () => {
    console.log("VAAAAAAAAAAAi")
    console.log(tasks.length)
    if(localStorage.getItem("USER_TYPE") == "Estudante") {
      
      return tasks.map(task =>{
        return task["userResponse"] != null ? (
          <Card>
          <CardHeader style={{backgroundColor: task["userResponse"] == task["responseQuestion"] ? "green" : "red",color:"white",fontWeight:"bold"}}>
            <h4 className={classes.cardTitleWhite}>{
              task["userResponse"] == task["responseQuestion"] ? "Correto" : "Errado"
            }</h4>
        </CardHeader>
        <CardBody>
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <TextField style={{width:"100%"}}
                        label="Titulo atividade"
                        name="name"
                        value={task.name}
                      />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.cardTitleWhite}>Alternativas</h4>
                  <GridItem xs={12} sm={12} md={3}>
                      <TextField label="A" style={{width:"100%"}} 
                        name="A"
                        value={task.A}
                        onChange={(e) => handleTask(e)}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                      <TextField label="B" style={{width:"100%"}} 
                          name="B"
                          value={task.B}
                          onChange={(e) => handleTask(e)}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                      <TextField label="C" style={{width:"100%"}} 
                          name="C"
                          value={task.C}
                          onChange={(e) => handleTask(e)}
                      />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                      <TextField label="D" style={{width:"100%"}} 
                          name="D"
                          value={task.D}
                          onChange={(e) => handleTask(e)}
                      />
                  </GridItem>
              </GridItem>
              </GridContainer>
              </CardBody>
              </Card>
          ) : (
              <Card>
              <CardBody>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField style={{width:"100%"}}
                              label="Titulo atividade"
                              name="name"
                              value={task.name}
                            />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                      <h4 className={classes.cardTitleWhite}>Alternativas</h4>
                        <GridItem xs={12} sm={12} md={3}>
                            <TextField label="A" style={{width:"100%"}} 
                              name="A"
                              value={task.A}
                              onChange={(e) => handleTask(e)}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <TextField label="B" style={{width:"100%"}} 
                                name="B"
                                value={task.B}
                                onChange={(e) => handleTask(e)}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <TextField label="C" style={{width:"100%"}} 
                                name="C"
                                value={task.C}
                                onChange={(e) => handleTask(e)}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                            <TextField label="D" style={{width:"100%"}} 
                                name="D"
                                value={task.D}
                                onChange={(e) => handleTask(e)}
                            />
                        </GridItem>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                            <TextField label="Resposta do aluno" style={{width:"100%"}} 
                                name="response"
                                value={studentResponse.response}
                                onChange={(e) => handleResponse(e)}
                            />
                    </GridItem>
                  </GridContainer>
                  <Button onClick={() => registerResponse(task.id)}>
                     Responder
                  </Button>
                </CardBody>
              </Card>
          )
      })     
    } else {
      return tasks.map(task =>(
        <Card>
          <CardBody>
          <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <TextField style={{width:"100%"}}
                          label="Titulo atividade"
                          name="name"
                          value={task.name}
                        />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                  <h4 className={classes.cardTitleWhite}>Alternativas</h4>
                    <GridItem xs={12} sm={12} md={3}>
                        <TextField label="A" style={{width:"100%"}} 
                          name="A"
                          value={task.A}
                          onChange={(e) => handleTask(e)}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <TextField label="B" style={{width:"100%"}} 
                            name="B"
                            value={task.B}
                            onChange={(e) => handleTask(e)}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <TextField label="C" style={{width:"100%"}} 
                            name="C"
                            value={task.C}
                            onChange={(e) => handleTask(e)}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <TextField label="D" style={{width:"100%"}} 
                            name="D"
                            value={task.D}
                            onChange={(e) => handleTask(e)}
                        />
                    </GridItem>
                </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                          <TextField label="Resposta" style={{width:"100%"}} 
                              name="reponseQuestion"
                              value={task.responseQuestion}
                              onChange={(e) => handleTask(e)}
                          />
                  </GridItem>
                </GridContainer>
                </CardBody>
        </Card>
      ))     
    }
  }

  const getTasks = () =>{
    console.log("gfsdgdf")
    if(localStorage.getItem("USER_TYPE") == "Estudante") {
      console.log(course.tasks)
      course.tasks.forEach(task => {
        console.log(task)
        getTaskResponseByStudent(task.id).then(
          data => {
            data.json().then(responseData =>{
                setTasks((prevTasks) => [...prevTasks,{
                  id:task.id,
                  name:task.name,
                  A:task.A,
                  B:task.B,
                  C:task.C,
                  D:task.D,
                  responseQuestion:task.responseQuestion,
                  userResponse: responseData["response"]
                }])
            }).catch(c => {
              console.log(task)
                setTasks((prevTasks) => [...prevTasks,{
                  id:task.id,
                  name:task.name,
                  A:task.A,
                  B:task.B,
                  C:task.C,
                  D:task.D,
                  responseQuestion:task.responseQuestion,
                  userResponse: null
                }])
            })
          }
        )
      })
    } else {
      console.log(course.tasks)
      course.tasks.forEach(task =>{
        setTasks((prevTasks) => [...prevTasks,task])
      })
    }
  }
  const getTaskResponseByStudent = (task_id) => {
    return fetch("https://backend-estudar-tcc.herokuapp.com/studentResponses/task/"+ task_id + "/student/" + localStorage.getItem("USER_ID")  ,{
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    })
  }

  useEffect(() =>{
      fetch("https://backend-estudar-tcc.herokuapp.com/courses/"+ props.match.params.id,{
        method: "GET",
        headers: {'Content-Type': 'application/json'}
      }).then(response =>response.json().then(data =>{ 
          if(data["category"] == 0) {
              data["category"] = "Curso"
          }else {
            data["category"] = "Palestra"
          }
          setCourse({...data})
      }))

  },[])

  useEffect(() =>{
    setTasks([])
    getTasks()
  },[course.tasks])


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
          {localStorage.getItem("USER_TYPE") == "Instrutor" ? (
              <Card>
                  <CardHeader style={{backgroundColor: "#f50057",color:"white",fontWeight:"bold"}}>
                    <h4 className={classes.cardTitleWhite}>Cadastrar atividade</h4>
                  </CardHeader>
                  <CardBody>
                  <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                          <TextField style={{width:"100%"}}
                            label="Titulo atividade"
                            name="name"
                            value={task.name}
                            onChange={(e) => handleTask(e)}
                          />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <h4 className={classes.cardTitleWhite}>Alternativas</h4>
                          <GridItem xs={12} sm={12} md={3}>
                              <TextField label="A" style={{width:"100%"}} 
                                name="A"
                                value={task.A}
                                onChange={(e) => handleTask(e)}
                              />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                              <TextField label="B" style={{width:"100%"}} 
                                  name="B"
                                  value={task.B}
                                  onChange={(e) => handleTask(e)}
                              />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                              <TextField label="C" style={{width:"100%"}} 
                                  name="C"
                                  value={task.CardFooter}
                                  onChange={(e) => handleTask(e)}
                              />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                              <TextField label="D" style={{width:"100%"}} 
                                  name="D"
                                  value={task.D}
                                  onChange={(e) => handleTask(e)}
                              />
                          </GridItem>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                          <TextField label="Resposta" style={{width:"100%", marginTop:"4%"}} 
                                  name="responseQuestion"
                                  value={task.responseQuestion}
                                  onChange={(e) => handleTask(e)}
                          />
                      </GridItem>
                    </GridContainer>
                    <Button style={{backgroundColor:"#f50057", color:"white", fontWeight:"bold",marginTop:"4%"}} onClick={registerTask}>
                      Cadastrar
                    </Button>
                  </CardBody>
            </Card>
          ):(
            null
          )}
          {
            getTaskCards()
          }
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