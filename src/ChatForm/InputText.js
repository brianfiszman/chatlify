import React, { Component } from "react";

class InputText extends Component {
  render() {
    return (
      <input
        type="text"
        className="col s11 input-field "
        placeholder="Escribir mensaje"
        onChange={this.props.onTextChange}
        value={this.props.value}
      />
    );
  }
}

export default InputText;
