import React, { Component } from "react";

class InputText extends Component {
  render() {
    return (
      <input
        type="text"
        className="form-control"
        placeholder="Escribir mensaje"
        onChange={this.props.onTextChange}
        value={this.props.value}
        aria-label="Escribir mensaje"
        aria-describedby="basic-addon2"
      />
    );
  }
}

export default InputText;
