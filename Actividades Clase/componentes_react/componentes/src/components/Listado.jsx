import React from 'react';
import { Link } from 'react-router-dom';
import productos from './productos';

export default function Listado() {
  return (
    <div>
      <h2>Listado de productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id.toString()}>
            <Link to={`/producto/${producto.id}`}>{producto.descripcion}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
