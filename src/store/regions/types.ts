export interface pointType {
    x: number
    y: number
}

export interface RegionType {
    id: number
    color: string
    points: pointType[]
    closed: boolean
}

export const CREATE_NEW_REGION = "CREATE_NEW_REGION"
export const ADD_NEW_NODE = "ADD_NEW_NODE"
export const CLOSE_REGION = "CLOSE_REGION"
export const CHANGE_NODE_LOCATION = "CHANGE_NODE_LOCATION"
export const ADD_A_NODE_REGION = "ADD_A_NODE_REGION"

interface CeateNewRegionAction {
    type: typeof CREATE_NEW_REGION
    payload: RegionType[]
}

interface RegionAddnodeAction {
    type: typeof ADD_NEW_NODE
    payload: RegionType[]
}

interface CLOSE_REGIONAction {
    type: typeof CLOSE_REGION
    payload:RegionType[]
}

interface ChanngeNodeLocationAction{
    type:typeof CHANGE_NODE_LOCATION
    payload:RegionType[]
}

interface AddANodeRegionAction{
    type:typeof ADD_A_NODE_REGION
    payload: RegionType[]
}



export type REGIONActionTypes = CeateNewRegionAction | RegionAddnodeAction | CLOSE_REGIONAction | ChanngeNodeLocationAction | AddANodeRegionAction


