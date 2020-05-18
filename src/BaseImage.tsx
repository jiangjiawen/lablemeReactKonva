import React, { useRef, useEffect, useState } from 'react';
import { Image, Layer } from "react-konva";
import useImage from "use-image";

const url = 'https://konvajs.github.io/assets/yoda.jpg';

export default () => {
    const [image] = useImage(url);

    useEffect(() => {
        if (!image) { return; }
    })

    const layerRef = React.useRef(null);

    const [brightness] = useState(0)

    React.useEffect(() => {
        console.log(layerRef)
        const canvas = (layerRef as any).current.getCanvas()._canvas;
        canvas.style.filter = `brightness(${(brightness + 1) * 100}%)`;
    }, [brightness])

    return (
        <Layer ref={layerRef}>
            <Image image={image} width={300} height={300} />
        </Layer>
    )
}