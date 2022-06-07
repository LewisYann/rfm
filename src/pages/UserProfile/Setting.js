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
import Button from "../../components/CustomButtons/Button";

const Setting = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false)
  const [ssid, setSsid] = useState("")
  const [password, setPassword] = useState("")
  const [sensibility, setSensibility] = useState("")
  const [speed, setSpeed] = useState("")
  const [postSetting, { isLoading, isError, error, }] = useUpdateSettingMutation()

  const [setting, setSetting] = useState({
    liste_wifi: [],
    manette_list: []
  })

  function updateSetting() {
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
        authorization: setting.authorization
      }
    ).then((data) => {
      getSetting()
      toast.success("Configuration reussi")
    })
      .catch((err) => {
        toast.error("Erreur lors de la configuration")
      });
    
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
          setSsid(data.data.liste_wifi[0].ssid)
          setPassword(data.data.liste_wifi[0].password)
          setSensibility(data.data.manette_list[0].sensibility)
          setSpeed(data.data.manette_list[0].speed)
        }
      })
  }


  const liste_wifi = setting.liste_wifi.map(
    (data) => {
      return <tr><td><input type="text" value={ssid} onChange={(e) => setSsid(e.target.value)} className="form-control col-md-8" /></td> <td><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control col-md-8" /></td></tr>
    }
  )

  const liste_manette = setting.manette_list.map(

    (data) => {

      return <tr><td><input type="number" value={sensibility} onChange={(e) => setSensibility(e.target.value)} className="form-control col-md-8" /></td> <td><input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} className="form-control col-md-8" /></td></tr>
    }
  )

  useEffect(() => {
    getSetting()
  }, [])


  return (
    <Admin>
      <ToastContainer />
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
                    {liste_wifi}
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
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
                onClick={() => updateSetting()}
              >
                Save
              </Button>
            </CardHeader>

          </Card>
        </GridItem>
      </GridContainer >
    </Admin >
  );
};

export default Setting;
