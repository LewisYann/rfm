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

const Setting = () => {
  const [setting,setSetting]=useState({
    liste_wifi:[],
    manette_list:[]
    
  })

  const getSetting = () => {
    axios.get("http://localhost:5000/get/setting/1").then(
      (data) => {
        setSetting(data.data); 
        console.log(setting)
      }
    ) 
  }
 
  const liste_wifi=setting.liste_wifi.map(
    (data)=><li>{data.name}</li>
  )

  const liste_manette=setting.manette_list.map(
    (data)=><li>{data.name}</li>
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
              <h4>Wiffi</h4>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <ul>
                 {liste_wifi}
                </ul>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4>Manette</h4>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <ul>
                {liste_manette}
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
