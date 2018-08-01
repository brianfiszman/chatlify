import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import InputUser from "./InputUser";

const Header = () => (
  <h1 className="col-12 col-md-8 col-lg-6 mx-auto pb-5">Bienvenido usuario</h1>
);

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
    const { user } = this.state;

    e.preventDefault();
    if (user) {
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
    const { fireRedirect, user } = this.state;

    return (
      <article className="row align-content-center h-100">
        <section className="col h-50">
          <section className="row align-items-center align-content-center justify-content-center h-100">
            <section className="col">
              {fireRedirect && <Redirect push to={"/chatapp/" + user} />}
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
