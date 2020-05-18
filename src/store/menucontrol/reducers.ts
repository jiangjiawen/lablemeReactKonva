import { rightmenuactionTypes, SHOW_NODEMENU, nodemenu } from "./types";

const nodemenuinitialstate: nodemenu = {
    display: 'none',
    posx: '0px',
    posy: '0px',
    regionId:-1,
    nodeId:-1,
    truex:0,
    truey:0
}

export const nodemenuReducer = (state = nodemenuinitialstate, action: rightmenuactionTypes) => {
    switch (action.type) {
        case SHOW_NODEMENU: return action.payload
        default: return state
    }
}