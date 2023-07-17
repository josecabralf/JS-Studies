import React from 'react';

const ListadoDeudores = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Monto Adeudado</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.IdDeudor}>
              <td>{item.IdDeudor}</td>
              <td>{item.DeudorDescripcion}</td>
              <td>{item.MontoAdeudado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoDeudores;
