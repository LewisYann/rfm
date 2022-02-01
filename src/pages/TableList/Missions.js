import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios"
import Admin from '../../layouts/Admin'
import axiosService from '../../utils/axios'
import { useRadioGroup } from '@mui/material/RadioGroup';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [mission, setMission] = useState([])

  const getAllMission = () => {
    axiosService.get("/get/all/mission").then(
      (data) => {
        setMission(data.data);
       }
    )
  }
  const listMission = mission.map((item) => <li key={item.id_mission}>{item.manette}</li>)



  useEffect(() => {
    getAllMission()
  }, [])





  return (
<Admin>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className="row">
              <div className="offset-1 col-md-9">
                <h4 className={classes.cardTitleWhite}>Mission list</h4>
                
              </div>
              <Link to="/create/mission" className="btn btn-primary col-md-2">
                New mission
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["#", "Nom", "Description", "Duree (h)", "Date"]}
              tableData={mission}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </Admin>
  );
}
