import { Dispatch } from "react";
import { rightmenuactionTypes, SHOW_NODEMENU, nodemenu } from "./types";

export const showNodeMenu = (display: string, posx: string, posy: string,regionId:number,nodeId:number,truex:number,truey:number) => (dispatch: Dispatch<rightmenuactionTypes>) => {
    const nodemenuSession: nodemenu = {
        display: display,
        posx: posx,
        posy: posy,
        regionId: regionId,
        nodeId: nodeId,
        truex: truex,
        truey: truey,
    }
    dispatch({ type: SHOW_NODEMENU, payload: nodemenuSession })
}