import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody";
// import CardFooter from "components/Card/CardFooter.js";
import Admin from '../../layouts/Admin'
import axiosService from '../../utils/axios'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import avatar from "../../assets/img/faces/marc.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Navigate } from "react-router";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import { useCreateMissionMutation } from '../../services/api';

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
  const { t } = useTranslation();

  const classes = useStyles();
  const [name, setName] = useState("")
  const [model, setModel] = useState("")
  const [description, setDescription] = useState("")
  const [parcour, setParcours] = useState("")
  const [surface, setSurface] = useState("")
  const [isReady, setReady] = useState(false)
  const [hours_vol, setHoursVol] = useState("")
  const [postMission, { isLoading, isError, error }] = useCreateMissionMutation()

  const navigate = useNavigate()
  function createMission() {
    setReady(true)
    postMission(
      {
        name: name,
        model: model,
        description: description,
        parcour: parcour,
        surface: surface,
        heurs_vol: 0
      }
    ).then((data) => {
        toast.success("Creaction de la mission reussi")
        setReady(false)
      console.log(data)
        return navigate("/control", { replace: true })
      })
      .catch((err) => {
        toast.error("Erreur lors de la creaction de la mission")
        setReady(false)
        console.log(err)
        return <Navigate to="/control" replace />;
      });

  }

  return (
    <Admin>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <ToastContainer />
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{t("newMissionCreate")}</h4>
            </CardHeader>
            <CardBody>
              <div className="container-fluid">
                <GridContainer xs={8} sm={8} md={12}>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Nom"
                      id="username"
                      value={name}
                      onchange={(e) => setName(e.target.value)}
                      formControlProps={{
                        fullWidth: true,

                      }}

                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Description"
                      id="email-address"
                      value={description}
                      onchange={(data) => setDescription(data.target.value)}

                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,

                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <label>Model</label>
                    <select className="form-control"
                      onChange={(data) => setModel(data.target.value)}

                    >
                      <option value="opt1 " key="">
                        opt1
                      </option>
                    </select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <label>Parcours</label>

                    <RadioGroup
                      row
                      aria-labelledby="demo-form-control-label-placement"
                      name="position"
                      onChange={(data) => setParcours(data.target.value)}
                    >
                      <FormControlLabel
                        value="auto"
                        control={<Radio />}
                        label="auto"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="manuel"
                        control={<Radio />}
                        label="manuel"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="circlar"
                        control={<Radio />}
                        label="circlar"
                        labelPlacement="bottom"
                      />


                    </RadioGroup>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <label>Surface</label>
                    <select className="form-control"
                      onChange={(data) => setSurface(data.target.value)}

                    >
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

                <GridItem xs={4} sm={4} md={12} className="m-0 p-0 text-center">
                  <br />
                  <Button color="primary" md={12}
                    className="col-md-12"
                    loading={isReady}
                    onClick={() => createMission()}
                  >{t("newMissionbtnStart")}</Button>
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
    </Admin>
  );
}
