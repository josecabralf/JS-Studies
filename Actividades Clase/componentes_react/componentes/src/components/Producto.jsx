import React from 'react';
import { useParams } from 'react-router-dom';
import productos from './productos';

export default function Producto() {
  const { id } = useParams();
  const producto = productos.find(p => p.id === parseInt(id));

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div>
      <h2>{producto.descripcion}</h2>
      <p>Categoría: {producto.categoria}</p>
      <p>Precio: ${producto.precio.toFixed(2).toString()}</p>
    </div>
  );
}