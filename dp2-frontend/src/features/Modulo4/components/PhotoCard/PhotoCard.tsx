import React from "react";
import { Card } from "react-bootstrap";
import logo from "./cardImage.svg"; // relative path to image

const svgImageReferencial = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
    >
        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
    </svg>
);

const rutaImageReferencial =
    "./src/features/Modulo4/components/PhotoCard/cardImage.svg";

const ImageCard = ({ imageSrc = logo, width, height }) => {
    return (
        <Card style={{ width: `${width}px`, height: `${height}px` }}>
            <Card.Img
                variant="top"
                src={imageSrc}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
        </Card>
    );
};

export default ImageCard;
