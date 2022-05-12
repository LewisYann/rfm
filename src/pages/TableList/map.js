import { MapContainer, TileLayer, useMap, MapConsumer, Marker, Popup } from "react-leaflet"
import RoutingMachine from "../../components/RoutingCore"

//const position = [6.505, 2.4109]
const config = {
    TOKEN: "sk.eyJ1IjoibGV3aXNhbGQiLCJhIjoiY2t6NWgzODN2MGx0ejJ4cWZ2cnY1YnoxayJ9.rO4bEYggFGDoZT_ymPAM7A",
    ACCOUNT: "lewisald"

}

const url = `https://api.mapbox.com/styles/v1/${config.ACCOUNT}/ckz5gtvsh000m15lcoumls96r/tiles/256/{z}/{x}/{y}@2x?access_token=${config.TOKEN}`

export default function Maps({ position }) {
    console.log("postion", position)
    return (
        <MapContainer
            center={position}
            zoom={12}>
            <TileLayer
                attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

        </MapContainer>
    )
}
export function MapsSelect() {
    return (
        <MapContainer
            center={position}
            zoom={12}>
            <TileLayer
                attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
