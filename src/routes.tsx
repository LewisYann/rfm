import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
 
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard ";
import HomePage from "./pages/Dashboard/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import Setting from "./pages/UserProfile/Setting";
import Control from "./pages/TableList/Control";
import NewMission from "./pages/UserProfile/NewMission";
import Missions from "./pages/TableList/Missions";
import Logout from "./pages/login/logout"

// core components/views for RTL layout
  //import RTLPage from "views/RTLPage/RTLPage ";
import { AddBox, Gamepad, Settings } from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: HomePage,
    layout: "",
  },
  {
    path: "/control",
    name: "Controls",
    rtlName: "لوحة القيادة",
    icon: Gamepad,
    component: Control,
    layout: "",
  },
  {
    path: "/missions",
    name: "Missions",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Missions,
    layout: "",
  },
  {
    path: "/create/mission",
    name: "New Mission",
    rtlName: "لوحة القيادة",
    icon: AddBox,
    component: NewMission,
    layout: "",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "لوحة القيادة",
    icon: Settings,
    component: Setting,
    layout: "",
  },
  {
    path: "/profil",
    name: "Profil",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "",
  },
  {
    path: "/",
    name: "Logout",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Logout,

    layout: "",
  },
  
   
];

export default dashboardRoutes;
