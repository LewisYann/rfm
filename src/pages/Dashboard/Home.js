import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Store from "@material-ui/icons/Store";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import LastMission from "../../components/Perso/LastMission";
import Admin from "../../layouts/Admin";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import { Spinner } from "react-bootstrap";
import {
    useGetMissionQuery,
    useGetMissionsQuery,
    useGetMissionsHoursQuery,
    useGetMissionsNombreQuery
} from '../../services/api';
import Table from "../../components/Table/Table";
import { Modal } from "react-bootstrap";


const useStyles = makeStyles(styles);
export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({});
    const [lastMission, setlastMission] = useState(0);
    const [listMission, setlistMission] = useState([]);
    let lastMissionTime=0
    const { t } = useTranslation();
    //const { data: dataHours, isLoading, isFetching, isError, isSuccess } = useGetMissionsHoursQuery()
    const { data: dataAssign, isLoading, isFetching, isError, isSuccess, refetch } = useGetMissionsQuery()
    // if (isLoading || isFetching) return <Spinner />;

    const nbreHeure = (dataAssign || []).reduce((p, c) => p + parseFloat(c.heurs_vol), 0).toFixed(3)
    const nbreMission = (dataAssign || []).length;
    if (dataAssign) {
        lastMissionTime = parseFloat((dataAssign[nbreMission - 1] || {}).heurs_vol).toFixed(3);
    }
    else{
        lastMissionTime = 0;
    }
    const classes = useStyles();
    useEffect(() => {
        refetch()
    }, [])

    return (
        <Admin>
            {
                isFetching ? <Spinner /> :
                    <>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={4}>
                                <Card>
                                    <CardHeader color="success" stats icon>
                                        <CardIcon color="success">
                                            <Store />
                                        </CardIcon>
                                        <p className={classes.cardCategory}>{t("dashbordMissions")}</p>
                                        <h3 className={classes.cardTitle}> {nbreMission} </h3>
                                    </CardHeader>

                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={6} md={4}>
                                <Card>
                                    <CardHeader color="warning" stats icon>
                                        <CardIcon color="warning">
                                            <Store />
                                        </CardIcon>
                                        <p className={classes.cardCategory}>{t("dashbordTotalHours")}</p>
                                        <h3 className={classes.cardTitle}>
                                            {nbreHeure}
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
                                        <p className={classes.cardCategory}> {t("dashbordTimeLastMission")}</p>
                                        <h3 className={classes.cardTitle}>
                                            {lastMissionTime}
                                        </h3>
                                    </CardHeader>

                                </Card>
                            </GridItem>
                        </GridContainer>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary">
                                        <h4 className={classes.cardTitleWhite}>{t("dashbordLastMission")}</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="mt-5">
                                            <Table
                                                tableHeaderColor="primary"
                                                tableHead={["#", "Nom", "Description", "Duree (h)", "Date"]}
                                                tableData={dataAssign?.slice(2)}
                                                setDetails={setDetails}
                                                open={open}
                                                setOpen={setOpen}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <Modal show={open} fullscreen={true} onHide={() => setOpen(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Mission {details?.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {details?.id_mission}<br />
                                    {details?.title} <br />
                                    {details?.description} <br />
                                    {details?.heurs_vol} h<br />
                                    {details?.created_at} <br />
                                </Modal.Body>
                            </Modal>

                        </GridContainer>


                    </>

            }

        </Admin>
    );
}
