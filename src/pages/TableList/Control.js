import React, {useState, useEffect} from "react";
import GridItem from "../../components/Grid/GridItem";
// import GridContainer from "components/Grid/GridContainer.js";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import avatar from "../../assets/img/new_logo.png";
import axios from "axios";
import Admin from '../../layouts/Admin'
import axiosService from '../../utils/axios'
import Joystick from 'react-joystick'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {useTranslation} from "react-i18next";
import "../../translations/i18n";
import Maps from "./map"
import Logger from "../../components/logger";
import socket from "../../store/socketState";
import {useDispatch, useSelector} from "react-redux";
import missionSlice from "../../store/slices/mission";

const containerStyle = {
    position: 'relative',
    height: '200px',
    width: '90%',
    background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)',
    alignSelf: "center",
    borderStyle: "solid",
    borderRadius: 8

}


const manette = () => {
    const {t} = useTranslation();
    const currentMission = useSelector((state) => state.mission)
    const statusMission = useSelector((state) => state.mission)
    const [manette, setManette] = useState([])
    const [mission, setMission] = useState([])
    const dispatch=useDispatch()
    console.log(currentMission.mission)

    const getAllManette = () => {
        axiosService.get("/get/setting").then(
            (data) => {
                if (data.data.status == 404) {
                    console.debug(data.data)
                } else {
                    setManette(data.data.manette_list);

                }
            }
        )

    }

    function handleStart() {
        dispatch(missionSlice.actions.fillMission(currentMission.mission))
        dispatch(missionSlice.actions.startMission())
        console.log("emission")
        socket.emit('logger/start_mission', currentMission.mission);
    }

    function handleStop() {
        dispatch(missionSlice.actions.stopMission())
        console.log("emission")
        socket.emit('logger/stop_mission', currentMission.mission);
    }

    const listManette = manette.map((item) => <li key={item.id}>{item.manette}</li>)
    useEffect(() => {
        getAllManette()
    }, [])


    return (
        <Admin>
            <div className="row">
                <div className="col-md-8 col-sm-8 col-xs-8">
                    <Maps/>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                    <div>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4>{t("controlController")}</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="row container-fluid">
                                        <ul>
                                            {listManette}
                                            <li>GPS: value</li>
                                            <li>Hauteur: value</li>
                                            <li>Batterie: value</li>
                                            <li>Vitesse: value</li>
                                        </ul>
                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </div>
                    <div>
                        <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="success">
                                    <h4>{t("controlCam")}</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="row container-fluid">
                                        <img src={'http://localhost:5002/stream'} className="streaming" alt="stream"/>
                                    </div>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </div>
                </div>
            </div>
            <div>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="info">
                            <h4>{t("controlCam")}: {currentMission?.mission?.title} </h4>
                        </CardHeader>
                        <CardBody>
                            <div className="col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2">
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <center>
                                            <img src={avatar} alt=""/>
                                        </center>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                        <center>
                                            <img src={avatar} alt=""/>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Logger/>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="col-md-2 col-sm-2 col-xs-2">
                                <center>
                                    <button className="btn btn-primary"
                                            disabled={statusMission.status==="pending"?false:true}
                                            onClick={() => handleStart()}>{t("controlStop")}</button>
                                </center>
                            </div>
                            <div className="offset-md-8 col-md-2 offset-sm-8 col-sm-2 offset-xs-8 col-xs-2">
                                <center>
                                    <button className="btn btn-danger"
                                            disabled={statusMission.status==="start"?false:true}
                                            onClick={() => handleStop()}>{t("controlBack")}</button>
                                </center>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </div>
        </Admin>
    );
};

export default manette;
