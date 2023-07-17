import React from "react";

export default function CancionesListado({
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
            <th className="text-center">Nombre</th>
            <th className="text-center">Genero</th>
            <th className="text-center">Duracion seg</th>
            <th className="text-center">Fecha Lanzamiento</th>
            
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdCancion}>
                <td>{Item.Nombre}</td>
                <td className="text-end">{Item.Genero}</td>
                <td className="text-end">{Item.DuracionSeg}</td>
                <td className="text-end">
                  {new Date(Item.FechaLanzamiento * 1000).toLocaleDateString('es-AR')}
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
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
