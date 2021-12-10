import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Nouvelle Mission</h4>
              <p className={classes.cardCategoryWhite}>Nouvelle Mission</p>
            </CardHeader>
            <CardBody>
              <div className="row container-fluid">
                <GridContainer xs={8} sm={8} md={8}>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Nom"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Description"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <label>Model</label>
                    <select className="form-control">
                      <option value="" key="">
                        opt1
                      </option>
                    </select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <label>Parcours</label>
                    <select className="form-control">
                      <option value="" key="">
                        zigzag
                      </option>
                      <option value="" key="">
                        diagonal
                      </option>
                      <option value="" key="">
                        circlar
                      </option>
                    </select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <label>Surface</label>
                    <select className="form-control">
                      <option value="" key="">
                        <img src={avatar} height="100" /> zigzag
                      </option>
                      <option value="" key="">
                        <img src={avatar} height="100" /> diagonal
                      </option>
                      <option value="" key="">
                        <img src={avatar} height="100" /> circlar
                      </option>
                    </select>
                  </GridItem>
                </GridContainer>

                <GridItem xs={4} sm={4} md={4} className="m-0 p-0">
                  <Button color="primary">Start</Button>
                </GridItem>
              </div>
            </CardBody>
            {/* <CardFooter>
                <Button color="primary">Update Profile</Button>
              </CardFooter> */}
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
