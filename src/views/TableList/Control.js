import React, { useState, useEffect } from "react";
 import GridItem from "../../components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import avatar from "../../assets/img/new_logo.png";
import axios from "axios";

const manette = () => {
  const [manette, setManette] = useState([])

  const getAllManette = () => {
    axios.get("http://localhost:5000/get/setting/1").then(
      (data) => {
        setManette(data.data.manette_list);
        console.debug(data.data)
      }
    )

  }
  const listManette = manette.map((item) => <li key={item.id}>{item.manette}</li>)



  useEffect(() => {
    getAllManette()
  }, [])
  


  return (
    <div>
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
    </div>
  );
};

export default manette;
