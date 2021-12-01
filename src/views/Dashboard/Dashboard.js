import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import { useHistory } from "react-router-dom";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Groups from '@material-ui/icons/Group'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  let [courses,setCourses] = useState([])
  const history = useHistory()
  let [coursesInscriptis,setCoursesInscriptis] = useState(0)
  let [studentsInscriptis,setStudentsInscriptis] = useState(0)
  const classes = useStyles();
  const { auth } = useSelector(state=>state)
  console.log(auth.email)

  const getCoursesByInstructor = () => {
    
    fetch("https://backend-estudar-tcc.herokuapp.com/courses/instructor/"+localStorage.getItem("USER_ID"),{
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    }).then(response =>response.json().then(data =>{ 
        console.log(data)
        setCoursesInscriptis(data.length)
        setCourses([...data])

        let studentsInscripts = 0
        data.forEach(d =>{
          console.log(d["students"].length)
          setStudentsInscriptis(studentsInscripts + d["students"].length)
          console.log(studentsInscriptis)
        })
        console.log(studentsInscriptis)
        
    }))
  }


  const getCoursesByStudent = () => {
    
    fetch("https://backend-estudar-tcc.herokuapp.com/courses/student/"+localStorage.getItem("USER_ID"),{
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    }).then(response =>response.json().then(data =>{ 
        console.log(data)
        setCourses([...data])
    }))
  }

  const renderNoCoursesMessages = () => {
      if(localStorage.getItem("USER_TYPE") == "Estudante") {
        return <p>Voce não possui inscrição em nenhum curso</p>
      }

      if(localStorage.getItem("USER_TYPE") == "Instrutor") {
        return <p>Voce não possui cursos cadastrados</p>
      }
  }

  const getDetailsCourse = (courseId) => {
    history.push("/admin/curso-detalhe/" + courseId)
  }


  useEffect(() =>{
    console.log(localStorage.getItem("USER_ID"))
    if(localStorage.getItem("USER_TYPE") == "Estudante") {
      getCoursesByStudent()
    }else {
      getCoursesByInstructor()
    }
  },[])

  return (
    <div>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              <h5 className={classes.cardCategory}>Olá</h5>
              <h3 className={classes.cardTitle}>{localStorage.getItem("USER_TYPE")} {localStorage.getItem("USERNAME")}</h3>
            </CardBody>
          </Card>
        </GridItem>
        {auth.userType == "Instrutor" ? (
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        <Groups />
                      </CardIcon>
                      <h3 className={classes.cardTitle}>{studentsInscriptis}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        Alunos inscritos
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="danger" stats icon>
                      <CardIcon color="danger">
                        <YouTubeIcon />
                      </CardIcon>
                      <h3 className={classes.cardTitle}>{coursesInscriptis}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <LocalOffer />
                        Cursos e palestras cadastrados
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
          ): null}

        <GridContainer>
            {courses.length != 0 ? (
              courses.map(course => {
                return (<GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="info" stats icon>
                      <CardIcon color="info">
                        <VideoCallIcon id="teste" onClick={() => getDetailsCourse(course["id"])} style={{cursor:"pointer"}}/>
                      </CardIcon>
                      {console.log(localStorage.getItem("USER_ID"))}
                      <p className={classes.cardCategory}>{"Data de inicio: " + new Date(course["dateTime"]).getDate() + "/" + new Date(course["dateTime"]).getMonth() + "/" + new Date(course["dateTime"]).getFullYear() + " às " + new Date(course["dateTime"]).getHours() + ":" + new Date(course["dateTime"]).getMinutes()}</p>
                      <h3 className={classes.cardTitle}>{course["name"]}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Update />
                        <Button>
                          <a href={course["link"]} target="_blank">Ir para seção</a>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>);
              })) : (
              renderNoCoursesMessages()
            )}
          </GridContainer>
        </div>
  )
}
