import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({ placeholder, onChange, widthConfig, heightConfig }) => {
    return (
        <Form.Control
            as="textarea"
            rows={3} // Ajusta el número de filas según tus necesidades
            placeholder={placeholder}
            onChange={onChange}
            style={{ width: widthConfig, height: heightConfig }} // Ajusta el tamaño según tus necesidades
        />
    );
};

export default CustomInput;
