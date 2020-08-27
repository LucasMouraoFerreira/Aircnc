import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5000/user", user)
      .then((res) => {
        localStorage.setItem("tokenAircnc", res.data.token);
        console.log(res.data);
      })
      .catch((error) => {
        alert(error);
      });

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner"></div>
          </div>
        </div>
        <div className="container">
          <div className="row wrapper-form">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="text-center mb-2">
                <img src={require("../images/logo-aircnc.png")} alt="Logo" />
              </div>
              <div className="card card-signin">
                <div className="card-body">
                  <form className="form-signin" onSubmit={this.onSubmit}>
                    <div className="form-label-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="E-mail"
                        required
                        autoFocus
                        onChange={this.onChangeEmail}
                        value={this.email}
                      />
                    </div>
                    <div className="form-label-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Senha"
                        required
                        onChange={this.onChangePassword}
                        value={this.password}
                      />
                    </div>
                    <button
                      className="btn btn-lg btn-dark btn-block text-uppercase"
                      type="submit"
                    >
                      Registrar
                    </button>
                  </form>
                  <p className="mt-3">
                    Já possui conta?
                    <span>
                      <Link to="/login"> Acessar</Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
