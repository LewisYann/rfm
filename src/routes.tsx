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
import { AddBox, Gamepad, Settings } from "@material-ui/icons";
import { useTranslation } from "react-i18next";


const dashboardRoutes = {
  "en": [
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
    }
  ],
  "fr": [
    {
      path: "/dashboard",
      name: "Accueil",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: HomePage,
      layout: "",
    },
    {
      path: "/control",
      name: "Contrôles",
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
      name: "Nouvelle Mission",
      rtlName: "لوحة القيادة",
      icon: AddBox,
      component: NewMission,
      layout: "",
    },
    {
      path: "/settings",
      name: "Paramètres",
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
    }
  ]
}

const TranslateRoutes = () => {
  const { t } = useTranslation();

  return [
    {
      path: "/dashboard",
      name: t("sideBarHome"),
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: HomePage,
      layout: "",
    },
    {
      path: "/control",
      name: t("sideBarControl"),
      rtlName: "لوحة القيادة",
      icon: Gamepad,
      component: Control,
      layout: "",
    },
    {
      path: "/missions",
      name: t("sideBarMission"),
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: Missions,
      layout: "",
    },
    {
      path: "/create/mission",
      name: t("sideBarNewMission"),
      rtlName: "لوحة القيادة",
      icon: AddBox,
      component: NewMission,
      layout: "",
    },
    {
      path: "/settings",
      name: t("sideBarSetting"),
      rtlName: "لوحة القيادة",
      icon: Settings,
      component: Setting,
      layout: "",
    },
    {
      path: "/profil",
      name: t("sideBarProfil"),
      rtlName: "ملف تعريفي للمستخدم",
      icon: Person,
      component: UserProfile,
      layout: "",
    }


  ];
}

export default dashboardRoutes;
