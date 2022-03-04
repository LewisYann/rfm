import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import avatar from "../../assets/img/faces/marc.jpg";
import Admin from '../../layouts/Admin'
import axiosService from '../../utils/axios'
import store from "../../store/index";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authSlice from "../../store/slices/auth";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import { useUpdateUserMutation } from '../../services/api';

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
  const dispatch = useDispatch()
  const account = store.getState().auth
  console.log(account)
  const [username, setUsername] = React.useState(account.account.account.people[0]?.username)
  const [name, setName] = React.useState(account.account.account.people[0]?.name)
  const [surname, setSurname] = React.useState(account.account.account.people[0]?.surname)
  const [email, setEmail] = React.useState(account.account.account.people[0]?.email)
  const [isReady, setReady] = React.useState(false)
  const [postUser, { isLoading, isError, error }] = useUpdateUserMutation()

  const { t } = useTranslation();

  function updateUser() {
    setReady(true)
    postUser([{
      name: name,
      username: username,
      surname: surname,
      email: email
    }])
      .then((data) => {
        dispatch(authSlice.actions.setAccount({ account: data.data.data }));
        localStorage.removeItem("user")
        localStorage.setItem('user', JSON.stringify(data.data))
        setReady(false)
        toast.success("Modification reussi")
      })
      .catch((err) => {
        setReady(false)
        toast.error("Erreur lors de la modification des informations")
      })
  }

  const classes = useStyles();
  return (
    <Admin>
      <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{t("profilEdit")}</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={username}
                    onchange={(e) => setUsername(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="E-mail"
                    id="mail"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={email}
                    onchange={(e) => setEmail(e.target.value)}
                  />
                </GridItem>

              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={name}
                    onchange={(e) => setName(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={surname}
                    onchange={(e) => setSurname(e.target.value)}

                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => updateUser()}
                loading={isReady}
                color="primary">{t("profilbtnUpdate")}</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>

          </Card>
        </GridItem>
      </GridContainer>
    </Admin>
  );
}
