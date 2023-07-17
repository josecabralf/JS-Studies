import React from "react";

export default function PersonajesListado({
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
            <th className="text-center">Habilidad</th>
            <th className="text-center">Veces Interpretado</th>
            <th className="text-center">Fecha Aparicion</th>
            
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdPersonaje}>
                <td>{Item.Nombre}</td>
                <td className="text-end">{Item.Habilidad}</td>
                <td className="text-end">{Item.VecesInterpretado}</td>
                <td className="text-end">
                  {new Date(Item.FechaAparicion * 1000).toLocaleDateString('es-AR')}
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
