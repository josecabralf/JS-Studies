import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/personajes">
                Personajes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/canciones">
                Canciones
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/peliculas">
                Peliculas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nominaciones">
                Nominaciones
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export {Menu};
