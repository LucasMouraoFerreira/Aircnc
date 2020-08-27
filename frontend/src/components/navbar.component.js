import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          <img
            src={require("../images/logo-aircnc.png")}
            width="100"
            height="30"
            alt="Logo"
          />
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item mr-2">
              <Link to="/user" className="nav-link">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
