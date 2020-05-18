import { Dispatch } from "react";
import { REGIONActionTypes, RegionType, pointType, CREATE_NEW_REGION, ADD_NEW_NODE, CLOSE_REGION, CHANGE_NODE_LOCATION, ADD_A_NODE_REGION } from "./types"

export const creatNewRegion = (regions: RegionType[], region: RegionType) => (dispatch: Dispatch<REGIONActionTypes>) => {
    regions = regions.concat([region])
    dispatch({ type: CREATE_NEW_REGION, payload: regions })
}

export const addNewNodeInCreate = (regions: RegionType[], point: pointType) => (dispatch: Dispatch<REGIONActionTypes>) => {
    const lastRegion = { ...regions[regions.length - 1] };
    lastRegion.points = lastRegion.points.concat([point]);
    regions.splice(regions.length - 1, 1);
    regions = regions.concat([lastRegion]);
    dispatch({ type: ADD_NEW_NODE, payload: regions });
}

export const closeThieRegion = (regions: RegionType[]) => (dispatch: Dispatch<REGIONActionTypes>) => {
    const lastRegion = { ...regions[regions.length - 1] };
    lastRegion.closed = true
    regions.splice(regions.length - 1, 1);
    regions = regions.concat([lastRegion]);
    dispatch({ type: CLOSE_REGION, payload: regions })
}

export const changeNodeLocation = (regions: RegionType[], regionId: number, nodeId: number, point: pointType) => (dispatch: Dispatch<REGIONActionTypes>) => {
    regions[regionId].points[nodeId] = point
    dispatch({ type: CHANGE_NODE_LOCATION, payload: regions })
}

export const addNodeInAregion = (regions: RegionType[], regionId:number,nodeId:number,point:pointType) => (dispatch: Dispatch<REGIONActionTypes>)=>{
    regions[regionId].points.splice(nodeId,0,point);
    dispatch({ type:ADD_A_NODE_REGION, payload: regions})
}