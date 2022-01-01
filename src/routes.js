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
 
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
import HomePage from "views/Dashboard/Home.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Setting from "views/UserProfile/Setting.js";
import Control from "views/TableList/Control.js";
import NewMission from "views/UserProfile/NewMission.js";
import Missions from "views/TableList/Missions.js";
 
import { AddBox, Gamepad, Settings } from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: HomePage,
    layout: "/admin",
  },
  {
    path: "/control",
    name: "Controls",
    rtlName: "لوحة القيادة",
    icon: Gamepad,
    component: Control,
    layout: "/admin",
  },
  {
    path: "/missions",
    name: "Missions",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Missions,
    layout: "/admin",
  },
  {
    path: "/newMission",
    name: "New Mission",
    rtlName: "لوحة القيادة",
    icon: AddBox,
    component: NewMission,
    layout: "/admin",
  },
  {
    path: "/setting",
    name: "Settings",
    rtlName: "لوحة القيادة",
    icon: Settings,
    component: Setting,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  
   
   
  
  
   
   
];

export default dashboardRoutes;
