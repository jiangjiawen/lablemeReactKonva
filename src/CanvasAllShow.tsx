import React, { useRef, useState, useEffect } from 'react';
import { Stage } from 'react-konva';
import RightMenuPoint from './rightMenuPoint';
import "./show.css";

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store/index';
import { creatNewRegion, addNewNodeInCreate, closeThieRegion } from './store/regions/actions';

import { ReactReduxContext, Provider } from "react-redux";

import BaseImage from './BaseImage';
import InterestRegionDraw from './InterestRegionDraw';


interface regionType {
    id: number
    color: string
    points: any
    closed: boolean
}

function getRelativePointerPosition(node: any) {
    // the function will return pointer position relative to the passed node
    const transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // get pointer (say mouse or touch) position
    const pos = node.getStage().getPointerPosition();

    // now we find relative point
    return transform.point(pos);
}

function zoomStage(stage: any, scaleBy: number) {
    const oldScale = stage.scaleX();

    const pos = {
        x: stage.width() / 2,
        y: stage.height() / 2
    };
    const mousePointTo = {
        x: pos.x / oldScale - stage.x() / oldScale,
        y: pos.y / oldScale - stage.y() / oldScale
    };

    const newScale = Math.max(0.05, oldScale * scaleBy);

    const newPos = {
        x: -(mousePointTo.x - pos.x / newScale) * newScale,
        y: -(mousePointTo.y - pos.y / newScale) * newScale
    };

    const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });

    stage.to({
        x: newAttrs.x,
        y: newAttrs.y,
        scaleX: newAttrs.scale,
        scaleY: newAttrs.scale,
        duration: 0.1
    });
    stage.batchDraw();
}

function limitAttributes(stage: any, newAttrs: any) {
    const box = stage.findOne('Image').getClientRect();
    const minX = -box.width + stage.width() / 2;
    const maxX = stage.width() / 2;

    const x = Math.max(minX, Math.min(newAttrs.x, maxX));

    const minY = -box.height + stage.height() / 2;
    const maxY = stage.height() / 2;

    const y = Math.max(minY, Math.min(newAttrs.y, maxY));

    const scale = Math.max(0.05, newAttrs.scale);

    return { x, y, scale };
}

function pointsdistance(nodeA: any, nodeB: any) {
    var xd = nodeA.x - nodeB.x
    var yd = nodeA.y - nodeB.y
    return Math.sqrt(xd * xd + yd * yd)
}

export default function CanvasAllShow() {
    const stageRef = useRef(null);
    const [size, setSize] = useState({
        width: 700,
        height: 700
    });
    const [scale, setScale] = useState(1);
    const [isDrawing, setisDrawing] = useState(false)
    const [id, setId] = useState(0);
    const [regions, setRegions] = useState<regionType[] | []>([])

    const [tmppoint, setTmppoint] = useState({})

    const [close, setClose] = useState(false)
    const [newone, setNewone] = useState(true)

    const [draggable, setDraggable] = useState(false)

    const [localxy, setlocalxy] = useState({
        x: 350,
        y: 350,
    })

    const dispatch = useDispatch()
    const regionsTest = useSelector((state: AppState) => state.regions)

    useEffect(() => {
    })

    return (
        <div>
            <ReactReduxContext.Consumer>
                {({ store }) => (
                    <Stage ref={stageRef}
                        width={size.width}
                        height={size.height}
                        scaleX={scale}
                        scaleY={scale}
                        x={localxy.x}
                        y={localxy.y}

                        onClick={(e: any) => {
                            if (e.evt.button === 0) {
                                if (!close) {
                                    setisDrawing(true)
                                }
                                const point = getRelativePointerPosition(e.target.getStage());
                                if (newone) {
                                    setId(id + 1)
                                    const region = {
                                        id: id,
                                        color: 'red',
                                        points: [point],
                                        closed: false
                                    };
                                    setRegions((regions as any).concat([region]));

                                    dispatch(creatNewRegion(regionsTest, region))

                                    setNewone(false)
                                    setClose(false)
                                } else {
                                    const lastRegion = { ...regions[regions.length - 1] };
                                    if (pointsdistance(point, lastRegion.points[0]) < 3) {
                                        setClose(true)
                                        setNewone(true)
                                        lastRegion.closed = true
                                        regions.splice(regions.length - 1, 1);
                                        setRegions((regions as any).concat([lastRegion]));

                                        dispatch(closeThieRegion(regionsTest))
                                    } else {
                                        lastRegion.points = lastRegion.points.concat([point]);
                                        regions.splice(regions.length - 1, 1);
                                        setRegions((regions as any).concat([lastRegion]));

                                        dispatch(addNewNodeInCreate(regionsTest, point))
                                    }
                                }
                                setTmppoint({})
                            }
                        }}

                        onMouseMove={(e: any) => {
                            if (!isDrawing) {
                                return;
                            }
                            const point = getRelativePointerPosition(e.target.getStage());
                            setTmppoint({ x: point.x, y: point.y });
                        }}

                        onWheel={(e: any) => {
                            if (e.evt.deltaY < 0) {
                                zoomStage(stageRef.current, 1.2);
                            } else if (e.evt.deltaY > 0) {
                                zoomStage(stageRef.current, 0.8);
                            }
                        }}
                        draggable
                        onDragStart={(e: any) => {
                            setDraggable(true)
                        }}
                        onDragEnd={(e: any) => {
                            setDraggable(false)
                            setlocalxy({ x: e.clientX, y: e.clientY })
                        }}


                        className="border-block"
                    >
                        <Provider store={store}>
                            <BaseImage />
                            <InterestRegionDraw regions={regions} tmppoint={tmppoint} parentRef={stageRef.current} />
                        </Provider>
                    </Stage>
                )}
            </ReactReduxContext.Consumer>
            <RightMenuPoint />
        </div>
    )
}