import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { AppState } from './store/index';
import { showNodeMenu } from './store/menucontrol/actions';
import {addNodeInAregion} from './store/regions/actions';
import "./show.css";

export default function RightMenuPoint() {
    const nodemenuRef = useRef(null)
    const menucontrol = useSelector((state: AppState) => state.nodemenuControl)
    const regionsTest = useSelector((state: AppState) => state.regions)
    const [hideClick, setHiddenClick] = useState(false)
    const [addClick,setAddClick] = useState(false)
    const dispatch=useDispatch()
    const handleHideMenu = () => {
        setHiddenClick(true)
    }
    const handleAddAnode = () =>{
        setAddClick(true)
    }
    useEffect(() => {
        if (menucontrol.display === 'initial') {
            (nodemenuRef.current as any).style.display = 'initial';
            (nodemenuRef.current as any).style.top = menucontrol.posx;
            (nodemenuRef.current as any).style.left = menucontrol.posy;
            if(addClick){
                dispatch(addNodeInAregion(regionsTest,menucontrol.regionId,menucontrol.nodeId,{x:menucontrol.truex,y:menucontrol.truey}))
                setAddClick(false)
                setHiddenClick(true)
            }
        }
        if (hideClick) {
            (nodemenuRef.current as any).style.display = 'none';
            dispatch(showNodeMenu('none','0px','0px',-1,-1,0,0))
            setHiddenClick(false)
        }
    })
    return (
        <div className="menu" id="menu" ref={nodemenuRef}>
            <div>
                <button id="Add-button" onClick={handleAddAnode}>Add</button>
                <button id="delete-button">Delete Null</button>
                <button id="hide-menu" onClick={handleHideMenu}>Hide</button>
            </div>
        </div>
    )
}