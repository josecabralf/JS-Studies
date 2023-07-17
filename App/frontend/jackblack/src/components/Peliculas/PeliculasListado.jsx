import React from "react";

export default function PeliculasListado({
  Items,
  Consultar,
  Modificar,
  Eliminar
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Titulo</th>
            <th className="text-center">Genero</th>
            <th className="text-center">Recaudacion</th>
            <th className="text-center">Fecha Estreno(ARG)</th>
            
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdPelicula}>
                <td>{Item.Titulo}</td>
                <td className="text-end">{Item.Genero}</td>
                <td className="text-end">{Item.Recaudacion}</td>
                <td className="text-end">
                  {new Date(Item.FechaEstrenoArgentina * 1000).toLocaleDateString('es-AR')}
                </td>
                
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => Eliminar(Item)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
