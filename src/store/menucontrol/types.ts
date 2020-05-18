export interface nodemenu{
    display: string
    posx:string
    posy:string
    regionId:number
    nodeId:number
    truex:number
    truey:number
}

export const SHOW_NODEMENU = "SHOW_NODEMENU"

interface  ShowNodeMenuAction{
    type: typeof SHOW_NODEMENU
    payload: nodemenu
}

export type rightmenuactionTypes = ShowNodeMenuAction