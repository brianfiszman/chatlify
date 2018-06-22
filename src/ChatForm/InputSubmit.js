import React, { Component } from "react";

class InputSubmit extends Component {
  render() {
    return (
      <section className="input-group-append">
        <button
          className="btn btn-outline-primary"
          type="submit"
        >
          Enviar
        </button>
      </section>
    );
  }
}
export default InputSubmit;
