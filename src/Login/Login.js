import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUser } from "../Common/actions";
import InputUser from "./InputUser";

const Header = () => (
  <h1 className="col-12 col-md-8 col-lg-6 mx-auto pb-5">Bienvenido usuario</h1>
);

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};

const mapStateToProps = state => {
  return { user: state.user };
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fireRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  handleSubmit(e) {
    const { user } = this.props;

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
    this.props.setUser({ user: e.target.value });
  }

  render() {
    const { fireRedirect } = this.state;
    const { user } = this.props;

    return (
      <React.Fragment>
        {fireRedirect && <Redirect push to={"/chatapp/" + user} />}
        <Header />
        <InputUser
          handleSubmit={this.handleSubmit}
          updateUser={this.updateUser}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
