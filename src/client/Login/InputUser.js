import React, { Component } from "react";

class InputUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form
        className="col-12 col-md-8 col-lg-6 mx-auto pb-5 mb-5 align-middle input-group"
        action=""
        method="get"
        onSubmit={this.props.handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Introducir usuario"
          aria-label="Introducir usuario"
          aria-describedby="basic-addon2"
          onChange={this.props.updateUser}
        />
        <section className="input-group-append">
          <button className="btn btn-outline-primary" type="submit">
            Enviar
          </button>
        </section>
      </form>
    );
  }
}

export default InputUser;
