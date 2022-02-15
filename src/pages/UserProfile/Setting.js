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
import "../../translations/i18n";
const Setting = () => {
  const { t } = useTranslation();

  const [setting, setSetting] = useState({
    liste_wifi: [],
    manette_list: []

  })

  const getSetting = () => {
    axiosService.get("/get/setting").then(
      (data) => {
        if (data.data.status == 404) {
          console.debug(data.data[0])
        } else {
          console.debug("data",data.data)
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
    (data) => <tr><td>{data.ssid}</td> <td>{data.password}</td></tr>
  )

  const liste_manette = setting.manette_list.map(
    (data) => <tr><td>{data.sensibility}</td> <td>{data.speed}</td></tr>
  )

  useEffect(() => {
    getSetting()
  }, [])


  return (
    <Admin>
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
              </div>
            </CardBody>
          </Card>
        </GridItem>
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
              </div>
            </CardBody>
          </Card>
        </GridItem>
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
      </GridContainer>
    </Admin>
  );
};

export default Setting;
