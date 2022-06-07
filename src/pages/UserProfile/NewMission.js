import React, { useState, useRef, useEffect } from "react";
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
import { useDipatch, useDispatch } from "react-redux"
import missionSlice from "../../store/slices/mission";
import { MapsSelect } from "../TableList/map";
import { SignalCellularNoSimOutlined } from "@material-ui/icons";

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
    const markerRef = useRef(null)
    const markerRefTwo = useRef(null)
    const classes = useStyles();
    const [name, setName] = useState("")
    const [model, setModel] = useState("")
    const [type, setType] = useState("Circle")
    const [description, setDescription] = useState("")
    const [parcour, setParcours] = useState("")
    const [surface, setSurface] = useState("")
    const [isReady, setReady] = useState(false)
    const [hours_vol, setHoursVol] = useState("")
    const [postMission, { isLoading, isError, error }] = useCreateMissionMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()



    function createMission() {
        setReady(true)
        postMission(
            {
                title: name,
                mode: model,
                description: description,
                parcour: parcour,
                surface: [[markerRef.current?.getLatLng().lat, markerRef.current?.getLatLng().lng],[markerRefTwo.current?.getLatLng().lat, markerRefTwo.current?.getLatLng().lng]],
                heurs_vol: 0
            }
        ).then((data) => {
            toast.success("Creaction de la mission reussi")
            setReady(false)
            dispatch(missionSlice.actions.setMission({ mission: data.data }))
            dispatch(missionSlice.actions.fillMission({ mission: data.data }))
            return navigate("/control", { replace: true })
        })
            .catch((err) => {
                toast.error("Erreur lors de la creaction de la mission")
                setReady(false)

                return <Navigate to="/control" replace />;
            });

    }

    useEffect(
        () => {
             setHoursVol([[markerRef.current?.getLatLng().lat, markerRef.current?.getLatLng().lng], [markerRefTwo.current?.getLatLng().lat, markerRefTwo.current?.getLatLng().lng]])
        }, [markerRef, markerRefTwo]	
    )
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
                            <form method="post" onSubmit={(e) => {
                                e.preventDefault()
                                createMission()
                            }} className="container-fluid">
                                <GridContainer xs={12} sm={12} md={12}>
                                    <GridContainer xs={12} sm={12} md={6}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Nom"
                                                id="nom"
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
                                                id="description"
                                                value={description}
                                                onchange={(data) => setDescription(data.target.value)}

                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                required
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
                                                required
                                            >
                                                <option value="Auto" key="Automatique">
                                                    Automatique
                                                </option>
                                                <option value="Manuel " key="Manuel">
                                                    Manuel
                                                </option>
                                            </select>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer xs={12} sm={12} md={6}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <label>Parcours</label>

                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-form-control-label-placement"
                                                name="position"
                                                onChange={(data) => {
                                                    setType(data.target.value)
                                                    setParcours(data.target.value)
                                                }
                                                }
                                                required
                                            >
                                                <FormControlLabel
                                                    value="Circle"
                                                    control={<Radio />}
                                                    label="Circle"
                                                    labelPlacement="bottom"
                                                />
                                                <FormControlLabel
                                                    value="Polygon"
                                                    control={<Radio />}
                                                    label="Parcours"
                                                    labelPlacement="bottom"
                                                />
                                                <FormControlLabel
                                                    value="Line"
                                                    control={<Radio />}
                                                    label="Line"
                                                    labelPlacement="bottom"
                                                />
                                            </RadioGroup>
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={12}>
                                            <MapsSelect markerRef={markerRef} markerRefTwo={markerRefTwo} position={[6.505, 2.4109]} type={type} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <br />

                                        </GridItem>
                                    </GridContainer>
                                </GridContainer>

                                <GridItem xs={6} sm={6} md={12} className="m-0 p-0 text-center">
                                    <br />
                                    <Button color="primary" md={12}
                                        className="col-md-12"
                                        loading={isReady}
                                        type="submit"
                                    //   onClick={() => createMission()}
                                    >{t("newMissionbtnStart")}</Button>
                                </GridItem>
                            </form>
                        </CardBody>
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
