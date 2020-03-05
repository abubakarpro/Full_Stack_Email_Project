import React, { Component } from "react";
import ComposedEmail from "./ComposedEmail";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "#dc3e34",
  fontSize: "14px"
};

class NavBar extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="container">
          <ul className="navbar-nav">
            <ComposedEmail />
            <li className="nav-item">
              <NavLink
                className="navbar-brand"
                activeStyle={activeStyle}
                to="/inbox"
              >
                inbox
              </NavLink>
            </li>
            <li className="nav-item">
              {/* <i className="far fa-paper-plane"></i> */}
              <NavLink
                className="navbar-brand"
                activeStyle={activeStyle}
                to="/sent"
              >
                sent
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
