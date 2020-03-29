import React from "react";

const InputText = ({ onTextChange, value }) => (
  <input
    type="text"
    className="form-control"
    placeholder="Escribir mensaje"
    onChange={onTextChange}
    value={value}
    aria-label="Escribir mensaje"
    aria-describedby="basic-addon2"
  />
);

export default InputText;
