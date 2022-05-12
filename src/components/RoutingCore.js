import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useEffect } from "react";
import { useMap } from "react-leaflet"

const createRoutineMachineLayer = ({ source, destination, map }) => {
    var instance = L.Routing.control({
        waypoints: [
            L.latLng(source),
            L.latLng(destination)
        ],
        routeLine: function (route) {
            var line = L.Routing.line(route, {
                addWaypoints: false,
                routeWhileDragging: false,
                autoRoute: true,
                useZoomParameter: false,
                draggableWaypoints: false,
            });

            return line;
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: function () { return null; },
    }).addTo(map);;
    return instance;
};

function RoutingUpdate({ position }) {
    const map = useMap()
    var routingControl = L.Routing.control({
        waypoints: [
            L.latLng(position[0], position[1]),
            L.latLng(position[0], position[1])
        ],
        routeLine: function (route) {
            var line = L.Routing.line(route, {
                addWaypoints: false,
                routeWhileDragging: false,
                autoRoute: true,
                useZoomParameter: false,
                draggableWaypoints: false,
            });

            return line;
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
        createMarker: function () { return null; },
    }).addTo(map);

  
    return routingControl;
};
const RoutingMachine = createControlComponent(RoutingUpdate);
export default RoutingMachine;


