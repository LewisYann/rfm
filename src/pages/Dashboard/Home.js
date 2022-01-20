import React, { useState, useEffect } from "react";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
// import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "../../components/Typography/Danger";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import axios from "axios";
// import { bugs, website, server } from "variables/general.js";
import Admin from '../../layouts/Admin'
// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import LastMission from "../../components/Perso/LastMission";
import axiosService from '../../utils/axios'
 
const useStyles = makeStyles(styles);

// const [toggle, setToggle] = useState(false);


export default function Dashboard() {
  const [mission, setMission] = useState(0)
  const [hVol, setVol] = useState(0)
  const [lastMission, setlastMission] = useState(0)
  const [listMission, setlistMission] = useState([])

  const getHoursVol = () => {
    axiosService.get("/mission/hours").then(
      (data) => {
        
        setMission(data.data);
        setVol(data.data);
      }
    )

  }
  const getMissionTotal = () => {
    axiosService.get("/mission/nombre").then(
      (data) => {
        console.log(data)
        setMission(data.data);
        setlastMission(data.data);
      }
    )

  }
  function getAllMission(){
    axiosService.get("/get/all/mission").then(
      (data) => {
        if (data.data.error!="acces denied")
        {
          setlistMission(data.data);
        }
       }
    ).catch((err)=>console.log(err))
    console.log(listMission)
  }

  const detailsListeMission=listMission.map((item) => {
    return (
      <>
        <LastMission
          nomMission={item.name}
          depart="18/04/2015"
          localisation={item.parcour}
          date={item.date}
        />
        <hr />
      </>)
  })

  useEffect(() => {
    getHoursVol()
    getMissionTotal()
    getAllMission()
   
  }, [])

  const classes = useStyles();
  return (
    <Admin>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Missions</p>
              <h3 className={classes.cardTitle}> {mission} </h3>
            </CardHeader>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}> Total h de vol </p>
              <h3 className={classes.cardTitle}>
                {hVol} 
              </h3>
            </CardHeader>
           
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}> Durée last mission </p>
              <h3 className={classes.cardTitle}>
                {lastMission}  
              </h3>
            </CardHeader>
            
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Last Mission</h4>
              <p className={classes.cardCategoryWhite}>3 last missions</p>
            </CardHeader>
            <CardBody>
              <div className="mt-5">
                {detailsListeMission}
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Admin>
  );
}
