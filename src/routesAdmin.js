/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
//import AddTaskIcon from '@mui/icons-material/AddTask';
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import RegisterCourse from "views/RegisterCourse/RegisterCourse";
import RegisterTask from "views/RegisterTask/RegisterTask";
import Courses from "views/Courses/Courses";
import CourseDetails from "views/Courses/CourseDetails";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/cadastrar-curso",
    name: "Cadastrar Curso",
    rtlName: "إخطارات",
    icon: LibraryBooks,
    component: RegisterCourse,
    layout: "/admin",
  },
  {
    path: "/cadastrar-atividades",
    name: "Cadastrar atividades",
    rtlName: "إخطارات",
    icon: LibraryBooks,
    component: RegisterTask,
    layout: "/admin",
  },
  {
    path: "/cursos-e-palestras",
    name: "Cursos e Palestras",
    rtlName: "إخطارات",
    icon: LibraryBooks,
    component: Courses,
    layout: "/admin",
  },
  {
    path: "/cursos-e-palestras",
    name: "Cursos e Palestras",
    rtlName: "إخطارات",
    icon: Notifications,
    component: Courses,
    layout: "/admin",
  },
  {
    path: "/curso-detalhe/:id",
    name: "Detalhe curso",
    rtlName: "إخطارات",
    icon: Notifications,
    component: CourseDetails,
    layout: "/admin",
  },
];

export default dashboardRoutes;
