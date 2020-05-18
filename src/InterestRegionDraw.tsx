import React, { useRef, useEffect, useState } from "react";
import { Layer, Line, Circle, Group } from "react-konva";

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store/index';
import { changeNodeLocation } from './store/regions/actions';
import { showNodeMenu } from './store/menucontrol/actions';

function getRelativePointerPosition(node: any, pos: any) {
    // the function will return pointer position relative to the passed node
    const transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // now we find relative point
    return transform.point(pos);
}

function getMoveRelativePointerPosition(node: any) {
    // the function will return pointer position relative to the passed node
    const transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // get pointer (say mouse or touch) position
    const pos = node.getStage().getPointerPosition();

    // now we find relative point
    return transform.point(pos);
}

export default function InterestRegionDraw({ ...props }) {
    const layerRef = useRef(null);

    const [moveTmppoint, setMoveTmppoint] = useState({})
    const [isDraggle, setIsDraggle] = useState(false)

    const dispatch = useDispatch()
    const regionsTest = useSelector((state: AppState) => state.regions)

    useEffect(() => {
        // console.log(regionsTest)
        // console.log(isDraggle, moveTmppoint)
    })

    return (
        <Layer ref={layerRef}>
            {regionsTest.map((region: any) => {
                return (
                    <React.Fragment key={region.id}>
                        {/* first we need to erase previous drawings */}
                        {/* we can do it with  destination-out blend mode */}
                        <Line
                            globalCompositeOperation="destination-out"
                            points={region.points.flatMap((p: any) => [p.x, p.y])}
                            fill="black"
                            listening={false}
                            closed
                        />
                        {/* then we just draw new region */}
                        {region.points.flatMap((p: any, i: number = 0) => {
                            i = i + 1
                            return (
                                <Circle x={p.x} y={p.y} fill={'red'} radius={4}
                                    draggable={true}
                                    onDragStart={() => {
                                        setIsDraggle(true)
                                    }
                                    }
                                    onDragEnd={() => {
                                        setIsDraggle(false)
                                    }}
                                    dragBoundFunc={(pos: any) => {
                                        const point = getRelativePointerPosition(props.parentRef, pos);
                                        dispatch(changeNodeLocation(regionsTest, region.id, i - 1, point))
                                        return {
                                            x: pos.x,
                                            y: pos.y
                                        }
                                    }}
                                    onDragMove={(e: any) => {
                                        if (isDraggle) {
                                            const point = getMoveRelativePointerPosition(props.parentRef);
                                            var connectone = i - 2
                                            var connecttwo = i
                                            if (i === region.points.length) {
                                                connecttwo = 0
                                            }
                                            if (i - 1 === 0) {
                                                connectone = region.points.length - 1
                                            }
                                            setMoveTmppoint({ x: point.x, y: point.y, connectone: connectone, connecttwo: connecttwo });
                                        } else { setMoveTmppoint({}) }
                                    }}
                                    onContextMenu={(e: any) => {
                                        e.evt.preventDefault();
                                        // console.log("context")
                                        // console.log(region.id)
                                        var containerRect = props.parentRef.container().getBoundingClientRect();
                                        // console.log(containerRect.top, containerRect.left)
                                        // console.log(props.parentRef.getPointerPosition().y, props.parentRef.getPointerPosition().x)
                                        var toplocation = containerRect.top + props.parentRef.getPointerPosition().y + 10 + 'px'
                                        var leftlocation = containerRect.left + props.parentRef.getPointerPosition().x + 10 + 'px'
                                        const point = getMoveRelativePointerPosition(props.parentRef);
                                        dispatch(showNodeMenu('initial', toplocation, leftlocation,region.id, i-1,point.x,point.y-10))
                                    }}
                                />)
                        }
                        )}
                        {/* <Circle x={region.points[0].x} y={region.points[0].y} fill={'red'} radius={5}/> */}
                        <Line
                            name="region"
                            points={region.points.flatMap((p: any) => [p.x, p.y])}
                            // points={[region.points[0].x, region.points[0].y, region.points[region.points.length - 1].x, region.points[region.points.length - 1].y]}
                            stroke={region.color}
                            strokeWidth={2}
                            closed={region.closed}

                            onContextMenu={(e: any) => {
                                e.evt.preventDefault();
                                console.log(region.id)
                            }}
                        />

                        {region.closed === true ? null :
                            <Line
                                name="tmpline"
                                points={[region.points[region.points.length - 1].x, region.points[region.points.length - 1].y, props.tmppoint.x, props.tmppoint.y]}
                                stroke={'blue'}
                                strokeWidth={2}
                            />
                        }

                        {
                            (!isDraggle || moveTmppoint !== {}) ? null :
                                <div>
                                    <Line
                                        name="movetmplineone"
                                        points={[(moveTmppoint as any).x, (moveTmppoint as any).y, region[(moveTmppoint as any).connectone].x, region[(moveTmppoint as any).connectone].y]}
                                        stroke={'yellow'}
                                        strokeWidth={2}
                                    />
                                    <Line
                                        name="movetmplinetwo"
                                        points={[(moveTmppoint as any).x, (moveTmppoint as any).y, region[(moveTmppoint as any).connecttwo].x, region[(moveTmppoint as any).connecttwo].y]}
                                        stroke={'yellow'}
                                        strokeWidth={2}
                                    />
                                </div>
                        }

                    </React.Fragment>
                );
            })}

        </Layer>
    )
}


