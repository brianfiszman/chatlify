import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class InputUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      fireRedirect: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.user) {
      this.setState({
        fireRedirect: true
      });
    } else {
      alert("Por favor introducir usuario");
    }
  }

  updateUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  render() {
    return (
      <article className="row h-100 align-items-center">
        {this.state.fireRedirect ? (
          <Redirect push to={"/chatapp/" + this.state.user} />
        ) : (
          ""
        )}
        <form
          className="col-12 input-group align-middle"
          action=""
          method="get"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Introducir usuario"
            aria-label="Introducir usuario"
            aria-describedby="basic-addon2"
            onChange={this.updateUser.bind(this)}
          />
          <section className="input-group-append">
            <button className="btn btn-outline-primary" type="submit">
              Enviar
            </button>
          </section>
        </form>
      </article>
    );
  }
}

export default InputUser;
