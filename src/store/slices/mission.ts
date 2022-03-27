import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = {
    mission: object | null;
    status: string;
    statusReplay: string;
    listMission: any;
    logger: any;
    loggerReplay: any;
};

const initialState: State = {mission: {}, listMission: [], logger: [], status: "pending",statusReplay:"pending", loggerReplay:[]};

const missionSlice = createSlice({
    name: "mission",
    initialState,
    reducers: {
        setMission(
            state: State,
            action: PayloadAction<{ mission: any }>
        ) {
            console.log(action.payload.mission)
            state.status="pending"
            state.mission = action.payload.mission;
        },
        startMission(state: State) {
            state.status = "start";
            state.logger=[]
        },
        startMissionReplay(state: State) {
            state.loggerReplay=[]
            state.status = "progress";
        },
        stopMission(state: State) {
            state.status = "stop";
            state.logger=[]
            state.mission={}
        }
        , fillMission(
            state: State,
            action: PayloadAction<{ mission: any }>
        ) {
            state.listMission?.push(action.payload.mission);
        },
        fillLogger(
            state: State,
            action: PayloadAction<{ data: any }>
        ) {
            state.logger.push(action.payload.data);
        },
        fillLoggerReplay(
            state: State,
            action: PayloadAction<{ data: any }>
        ) {
            state.loggerReplay.push(action.payload.data);
        },
        setReset(state: State) {
            state.mission = {};
        },
    },
});

export default missionSlice;

