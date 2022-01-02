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
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";
// import { bugs, website, server } from "variables/general.js";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
 import LastMission from "components/Perso/LastMission";

const useStyles = makeStyles(styles);

// const [toggle, setToggle] = useState(false);


export default function Dashboard() {
  const [mission, setMission] = useState(0)
  const [hVol, setVol] = useState(0)
  const [lastMission, setlastMission]=useState(0)

  const getHoursVol = () => {
    axios.get("http://localhost:5000/mission/hours/d30c77c0-bca0-4c0e-8e1d-c5dcf368e9d6").then(
      (data) => {
        setMission(data.data); 
        setVol(data.data); 
        console.log('Test')
 
      }
    ) 

  }
  const getMissionTotal = () => {
    axios.get("http://localhost:5000/mission/nombre/d30c77c0-bca0-4c0e-8e1d-c5dcf368e9d6").then(
      (data) => {
        setMission(data.data); 
        setlastMission(data.data); 
      }
    ) 

  }
 
  useEffect(() => {
    getHoursVol()
    getMissionTotal()
  }, [])

  const classes = useStyles();
  return (
    <div>
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
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}> Total h de vol </p>
              <h3 className={classes.cardTitle}>
                {hVol} <small>h</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
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
                {lastMission} <small>h</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
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
                <LastMission
                  nomMission="Tokpa"
                  depart="18/04/2015"
                  localisation="15226-528584"
                  date="Tokpa"
                />
                <hr />
                <LastMission
                  nomMission="Agla"
                  depart="18/04/2012"
                  localisation="15226-528584"
                  date="Agla"
                />
                <hr />
                <LastMission
                  nomMission="Parakou"
                  depart="08/11/2019"
                  localisation="15226-528584"
                  date="Parakou"
                />
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
