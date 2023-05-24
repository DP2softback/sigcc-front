import React from "react";
import { Card } from "react-bootstrap";

const ImageCard = ({ imageSrc, width, height }) => {
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
