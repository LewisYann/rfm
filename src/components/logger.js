import React from "react"
import socket from "../store/socketState"
import axiosService from "../utils/axios"

export default function Logger() {


    const [log, setLog] = React.useState([])
    const [current, setCurrent] = React.useState({})

    axiosService.get("/mission/current").then(
        (data) => setCurrent(data)
    )

    socket.on("log/" + current.idMission, (data) => setLog(...log, data))
    return (
        <div style={{
            backgroundColor: "grey",
            padding: 20,
            minHeight: 350
        }}
        >
            {
                log.map(
                    (row) => <div className="row">{row.message}</div>
                )
            }
        </div>
    )
}