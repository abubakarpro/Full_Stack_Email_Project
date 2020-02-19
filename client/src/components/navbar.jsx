import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Popup from "../common/popup";

const activeStyle = {
  color: "#dc3e34",
  fontSize: "14px"
};

class NavBar extends Component {
  state = {
    showPopUp: false
  };

  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };

  render() {
    return (
      <div>
        <div className="container">
          <ul className="navbar-nav">
            <button
              type="button"
              className="btn btn-light"
              onClick={this.togglePopup}
              style={{
                padding: "15px",
                backgroundColor: "whitesmoke",
                text: "blod",
                fontWeight: "bold"
              }}
            >
              Composed
            </button>
            {/* {this.state.showPopUp ? <Popup /> : ""} */}
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
