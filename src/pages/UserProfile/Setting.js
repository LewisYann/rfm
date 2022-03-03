import React from "react";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
// import CardIcon from "components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody";
// import CardFooter from "components/Card/CardFooter.js";
import { useEffect, useState } from "react";
import axios from 'axios'
import Admin from '../../layouts/Admin'
import axiosService from '../../utils/axios'
import { useTranslation } from "react-i18next";
import { useGetSettingQuery, useCreateSettingMutation, useUpdateSettingMutation } from "../../services/api";
import { Modal } from "react-bootstrap";
import "../../translations/i18n";
import { ToastContainer, toast } from 'react-toastify';

const Setting = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false)
  const [ssid, setSsid] = useState("")
  const [password, setPassword] = useState("")
  const [sensibility, setSensibility] = useState("")
  const [speed, setSpeed] = useState("")
  const [postSetting, { isLoading, isError, error, }] = useCreateSettingMutation()

  const [setting, setSetting] = useState({
    liste_wifi: [],
    manette_list: []

  })

  function createSetting() {
    postSetting(
      {
        liste_wifi: [{
          ssid: ssid,
          password: password
        }],
        manette_list: [
          {
            sensibility: sensibility,
            speed: speed
          }],
        authorization: 1
      }
    ).then((data) => {
      toast.success("Configuration reussi")
      console.log(data)
    })
      .catch((err) => {
        toast.error("Erreur lors de la configuration")
        console.log(err)
      });
    getSetting()
  }

  const getSetting = () => {
    axiosService.get("/get/setting").then(
      (data) => {
        if (data.data.status == 404) {
          console.debug(data.data[0])
        } else {
          console.debug("data", data.data)
          setSetting(
            {
              liste_wifi: data.data.liste_wifi,
              manette_list: data.data.manette_list,
              authorization: data.data.authorization,
            }
          );
        }
      })
  }


  const liste_wifi = setting.liste_wifi.map(
    (data) => <tr><td><input type="text" value={data.ssid} className="form-control col-md-8" /></td> <td><input type="text" value={data.password} className="form-control col-md-8" /></td><td><button className="btn form-control btn-primary">Configurer</button></td></tr>
  )

  const liste_manette = setting.manette_list.map(
    (data) => <tr><td><input type="number" value={data.sensibility} className="form-control col-md-8" /></td> <td><input type="number" value={data.speed} className="form-control col-md-8" /></td></tr>
  )

  useEffect(() => {
    getSetting()
  }, [])


  return (
    <Admin>
      <ToastContainer />
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Wifi</h2>
          <label> Ssid</label>
          <input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} className="form-control col-md-8" /><br />
          <label> Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control col-md-8" /> <br />
          <h2>Control</h2>
          <label> Sensibily</label>
          <input type="text" value={sensibility} onChange={(e) => setSensibility(e.target.value)} className="form-control col-md-8" /> <br />
          <label>Speed</label>
          <input type="text" value={speed} onChange={(e) => setSpeed(e.target.value)} className="form-control col-md-8" /> <br />
          <button className="btn btn-primary" onClick={() => createSetting()}>Configure</button>
        </Modal.Body>
      </Modal>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>{t("settingWifi")}</h4>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <table>

                  <thead>
                    <tr>
                      <td>SSID</td>
                      <td>Password</td>
                    </tr>
                  </thead>
                  <tbody>
                    {liste_wifi.length == 0 ? <button className="btn btn-success form-control" onClick={() => setOpen(true)}>Ajout un wifi</button> : liste_wifi}
                  </tbody>
                </table>
              </div >
            </CardBody >
          </Card >
        </GridItem >
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4>{t("settingController")}</h4>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <table>
                  <thead>
                    <tr>
                      <td>SENSIBILITY</td>
                      <td>SPEED</td>
                    </tr>
                  </thead>
                  <tbody>
                    {liste_manette}
                  </tbody>
                </table>

              </div >
            </CardBody >
          </Card >
        </GridItem >
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4>{t("settingAutho")}</h4>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <ul>
                  <li>Level {setting.authorization}</li>

                </ul>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer >
    </Admin >
  );
};

export default Setting;
