import React from "react";

// eslint-disable-next-line react/prop-types
const LastMission = ({ nomMission, depart, localisation, date }) => {
  return (
    <div className="offset-3 col-sm-10 col-xs-10 col-md-10 col-lg-10">
      <div className="row">
        <div className="col-sm-5 col-xs-5 col-md-5 col-lg-5">
          <span>Nom de la mission : {nomMission}</span>
        </div>
        <div className="col-sm-5 col-xs-5 col-md-5 col-lg-5">
          <span> Date : {date} </span>
        </div>

        <div className="col-sm-5 col-xs-5 col-md-5 col-lg-5">
          <span>Départ : {depart} </span>
        </div>
        <div className="col-sm-5 col-xs-5 col-md-5 col-lg-5">
          {/* <span> xxx </span> */}
        </div>

        <div className="col-sm-5 col-xs-5 col-md-5 col-lg-5">
          <span>Localisation : {localisation} </span>
        </div>
      </div>
    </div>
  );
};

export default LastMission;
