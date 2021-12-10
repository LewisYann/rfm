import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Link } from "react-router-dom";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className="row">
              <div className="offset-1 col-md-9">
                <h4 className={classes.cardTitleWhite}>Liste des missions</h4>
                <p className={classes.cardCategoryWhite}>
                  Here is a subtitle for this table
                </p>
              </div>
              <Link to="/admin/newMission" className="btn btn-primary">
                Nouvelle mission
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["#", "Nom", "Date-Heure", "Duree (h)", "Actions"]}
              tableData={[
                ["1", "Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["2", "Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["3", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["4", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["5", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["5", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["5", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["5", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["5", "Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["6", "Mason Porter", "Chile", "Gloucester", "$78,615"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
