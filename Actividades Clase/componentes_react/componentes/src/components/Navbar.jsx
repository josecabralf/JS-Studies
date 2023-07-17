import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link> | <Link to="/listado">Listado</Link>
    </nav>
  );
}
