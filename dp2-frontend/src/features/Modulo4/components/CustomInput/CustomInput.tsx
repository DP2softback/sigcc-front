import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({ placeholder, onChange }) => {
    return (
        <Form.Control
            as="textarea"
            rows={3} // Ajusta el número de filas según tus necesidades
            placeholder={placeholder}
            onChange={onChange}
            style={{ width: "400px", height: "160px" }} // Ajusta el tamaño según tus necesidades
        />
    );
};

export default CustomInput;
