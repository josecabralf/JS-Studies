import React from "react";

function ListadoNominaciones({
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
                        <th className="text-center">Nombre Premio</th>
                        <th className="text-center">Tipo Premio</th>
                        <th className="text-center">Descripcion</th>
                        <th className="text-center">Fecha Nominacion</th>
                        <th className="text-center">Resultado</th>

                        <th className="text-center text-nowrap">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Items &&
                        Items.map((Item) => (
                            <tr key={Item.IdNominacion}>
                                <td>{Item.NombrePremio}</td>
                                <td className="text-end">{Item.TipoPremio}</td>
                                <td className="text-end">{Item.Descripcion}</td>
                                <td className="text-end">
                                    {new Date(Item.FechaNominacion * 1000).toLocaleDateString('es-AR')}
                                </td>
                                <td className="text-end">{Item.Resultado ? "GANO" : "NO GANO"}</td>

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
export default ListadoNominaciones