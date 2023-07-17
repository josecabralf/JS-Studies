import React from 'react';

const SocioListado = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Apellido y Nombre</th>
            <th>Nro de Socio</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.IdSocio}>
              <td>{item.IdSocio}</td>
              <td>{item.ApeNomSocio}</td>
              <td>{item.NroSocio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SocioListado;
