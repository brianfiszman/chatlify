import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import InputUser from "./InputUser";
import Header from "./Header";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      fireRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);
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
      <article className="row align-content-center h-100">
        <section className="col h-50">
          <section className="row align-items-center align-content-center justify-content-center h-100">
            <section className="col">
              {this.state.fireRedirect ? (
                <Redirect push to={"/chatapp/" + this.state.user} />
              ) : (
                ""
              )}
              <Header />
              <InputUser
                handleSubmit={this.handleSubmit}
                updateUser={this.updateUser}
              />
            </section>
          </section>
        </section>
      </article>
    );
  }
}

export default Login;
