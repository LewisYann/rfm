import React from "react"
import socket from "../store/socketState"
import axiosService from "../utils/axios"
import {useDispatch, useSelector} from "react-redux";
import missionSlice from "../store/slices/mission";

export default function Logger() {
    const [log, setLog] = React.useState([])
    const currentMission = useSelector((state) => state.mission)
    const dipatch = useDispatch()
    console.log(currentMission.logger)

    socket.on("log/" + currentMission?.mission?.id_mission, (data) => {
        console.log(data)
        dipatch(missionSlice.actions.fillLogger({data: data}))
    })

    return (
        <div style={{
            backgroundColor: "#efefef",
            padding: 20,
            height: 400,
            overflow: "auto"
        }}
        >
            {
                currentMission.logger.map(
                    (row) => <div className="row">{row.date}: {row.info} <br/></div>
                )
            }
        </div>
    )
}

export function LoggerReplay(props) {
    const [log, setLog] = React.useState([])
    const currentMission = useSelector((state) => state.mission)
    const dipatch = useDispatch()
    let details = ""
    console.log(currentMission?.loggerReplay)
    socket.on("log/replay/" + props.details?.id_mission, (data) => {
        dipatch(missionSlice.actions.fillLoggerReplay({data: data}))
        console.log(data)
    })

    return (
        <div style={{
            backgroundColor: "#efefef",
            padding: 20,
            height: 400,
            overflow: "auto"
        }}
        >
            {
                currentMission.loggerReplay?.map(
                    (row) => <div className="row">{row?.date}: {row?.info} <br/></div>
                )
            }
        </div>
    )
}

