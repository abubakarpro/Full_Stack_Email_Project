import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navrbar = () => {
  return (
    <div>
      <button type="button" class="btn btn-light">
        Composed
      </button>
      <nav className=" navbar-light bg-light">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/inbox">
                inbox
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/sent">
                sent
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navrbar;
