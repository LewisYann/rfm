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

const Setting = () => {
  const [setting, setSetting] = useState({
    liste_wifi: [],
    manette_list: []

  })

  const getSetting = () => {
    axiosService.get("/get/setting").then(
      (data) => {
        if (data.data.status == 404) {
          console.debug(data.data)
        } else {
          setSetting(data.data);
        }
      })
  }

  const liste_wifi = setting.liste_wifi.map(
    (data) => <li>{data.name}</li>
  )

  const liste_manette = setting.manette_list.map(
    (data) => <li>{data.name}</li>
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
              <h4>Point d'acces</h4>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <ul>
                  {liste_wifi}
                  #TODO: Ajouter deux inputs (SSID et mot de passe)
                </ul>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4>Controls</h4>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <ul>
                  #TODO: Ajouter deux inputs number (vitesse et sensibilité)
                </ul>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4>Autorisation</h4>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <ul>
                  <li>{setting.authorization}</li>

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
