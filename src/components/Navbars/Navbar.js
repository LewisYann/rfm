import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import Button from "../CustomButtons/Button.js";
import store from "../../store"
import Drawer from '@mui/material/Drawer';
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { useDispatch,useSelector } from "react-redux";
import { persistState } from "../../store";
import languageSlice from "../../store/slices/language"
//hooks

import styles from "../../assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const { t, i18n } = useTranslation();
  const [lng,setLng]=React.useState("en")
  const dispatch=useDispatch()
  const language=useSelector((state:persistState)=>state.language.language)
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  console.log(store.getState())
  const account = store.getState().auth.account.account
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };
  const [open, setOpen] = useState(false)
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex} style={{ fontSize: 16 }}>
          {account.people[0]?.name + " " + account.people[0]?.surname}
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <select
          onChange={(e) => {
            dispatch(languageSlice.actions.setLanguage({language:e.target.value}))              
            i18n.changeLanguage(language)
          }}
          value={language}
          className="form-control col-md-1"
          style={{
            width:"10%"
          }}
        >
          <option value="en">English</option>
          <option value="fr">Francais</option>
        </select>
        
        <Button
          onClick={() => setOpen(true)}
        >Toggle drawer </Button>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Drawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawer(false)}
      >
        Test

      </Drawer>

    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
