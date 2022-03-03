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
import { useState, useEffect } from "react";
import Admin from '../../layouts/Admin'
import axiosService from '../../utils/axios'
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import Drawer from '@mui/material/Drawer';
import { useGetMissionsQuery } from "../../services/api";
import { Modal } from "react-bootstrap";

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
  const [details, setDetails] = useState({})
  const [open, setOpen] = useState(false)
  const { t } = useTranslation();
  const { data: dataAssign, isFetching3, isError3, isSuccess3 } = useGetMissionsQuery()

  const getAllMission = () => {
    axiosService.get("/get/all/mission").then(
      (data) => {
        setMission(data.data);
      }
    )
  }
  const listMission = dataAssign?.map((item) => <li key={item.id_mission}>{item.manette}</li>)
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  useEffect(() => {
    getAllMission()
  }, [])





  return (
    <Admin>

    
      <Modal show={open} fullscreen={true} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mission  {details.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {details.id_mission}<br />
          {details.title} <br />
          {details.description} <br />
          {details.heurs_vol} h<br />
          {details.created_at} <br />
        </Modal.Body>
      </Modal>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div className="row">
                <div className="offset-1 col-md-9">
                  <h4 className={classes.cardTitleWhite}>{t("missionsList")}</h4>

                </div>
                <Link to="/create/mission" className="btn btn-primary col-md-2">
                  {t("missionsbtnNew")}
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["#", "Nom", "Description", "Duree (h)", "Date"]}
                tableData={dataAssign}
                setDetails={setDetails}
                open={open}
                setOpen={setOpen}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Admin>
  );
}
