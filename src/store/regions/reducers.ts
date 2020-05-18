import { REGIONActionTypes, CREATE_NEW_REGION, ADD_NEW_NODE, CLOSE_REGION, CHANGE_NODE_LOCATION,ADD_A_NODE_REGION } from "./types"
import {RegionType} from "./types"

export const regionsReducer = (state:RegionType[] | [] = [], action: REGIONActionTypes) => {
    switch (action.type) {
        case CREATE_NEW_REGION: return action.payload
        case ADD_NEW_NODE: return action.payload
        case CLOSE_REGION: return action.payload
        case CHANGE_NODE_LOCATION: return action.payload
        case ADD_A_NODE_REGION: return action.payload
        default: return state;
    }
}