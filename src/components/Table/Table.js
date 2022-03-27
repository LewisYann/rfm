import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import {useState, useEffect} from "react";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
    const classes = useStyles();
    const {tableHead, tableData, tableHeaderColor, setDetails, setOpen} = props;

    const tableContent = tableData?.map(
        (item) =>
            <TableRow key={item?.id_mission}>
                <TableCell className={classes.tableCell}> {item?.id_mission} </TableCell>
                <TableCell className={classes.tableCell}> {item?.title} </TableCell>
                <TableCell className={classes.tableCell}> {item?.description} </TableCell>
                <TableCell className={classes.tableCell}> {item?.heurs_vol} h </TableCell>
                <TableCell className={classes.tableCell}> {item?.created_at} </TableCell>
                <TableCell
                    className={classes.tableCell}> {item?.started_at === null ? "En attente" : item?.ended_at === null ? "En cours" : "Terminer"} </TableCell>
                <TableCell className={classes.tableCell}>
                    <button className="btn btn-warning"
                            onClick={(e) => {
                                e.preventDefault()
                                setDetails(item)
                                setOpen(true)
                            }}> Details
                    </button>
                </TableCell>

            </TableRow>
    )

    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow className={classes.tableHeadRow}>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell
                                        className={classes.tableCell + " " + classes.tableHeadCell}
                                        key={key}
                                    >
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableContent}
                </TableBody>
            </Table>
        </div>
    );
}

CustomTable.defaultProps = {
    tableHeaderColor: "gray",
};

