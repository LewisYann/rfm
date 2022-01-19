import React, { useState, useEffect } from "react";
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
 import { Helmet } from "react-helmet";


const manette = () => {
  const [manette, setManette] = useState([])

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
  const listManette = manette.map((item) => <li key={item.id}>{item.manette}</li>)



  useEffect(() => {
    getAllManette()
  }, [])



  return (
    <Admin>
      <Helmet>
        <script src="joy.js" type="text/javascript" />
        
      </Helmet>
      <div className="row">
        <div className="col-md-8 col-sm-8 col-xs-8">
        </div>
        <div className="col-md-4 col-sm-4 col-xs-4">
          <div>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4>Manette</h4>
                </CardHeader>
                <CardBody>
                  <div className="row container-fluid">
                    <ul>
                      {listManette}
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
                  <h4>Cam</h4>
                </CardHeader>
                <CardBody>
                  <div className="row container-fluid">
                    <ul>
                      <li>lorem</li>

                    </ul>
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
              <h4>Cam</h4>
            </CardHeader>
            <CardBody>
              <div className="col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-8 offset-xs-2">
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <center>
                      <img src={avatar} alt="" />
                    </center>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <center>
                      <img src={avatar} alt="" />
                    </center>
                  </div>
                </div>
                <div id="joyDiv" className="row">
                 </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="col-md-2 col-sm-2 col-xs-2">
                <center>
                  <button className="btn btn-primary">Arret</button>
                </center>
              </div>
              <div className="offset-md-8 col-md-2 offset-sm-8 col-sm-2 offset-xs-8 col-xs-2">
                <center>
                  <button className="btn btn-danger">Retour</button>
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
