import React from 'react';

const ListadoProveedores = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Razón Social</th>
            <th>CUIT</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.IdProveedor}>
              <td>{item.IdProveedor}</td>
              <td>{item.RazonSocial}</td>
              <td>{item.CUIT}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoProveedores;
