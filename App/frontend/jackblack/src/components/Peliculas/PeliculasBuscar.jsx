import React from "react";

export default function PeliculasBuscar ({Titulo, setTitulo, Buscar, Agregar, onSubmit}) {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit(); // Llamar a la función de búsqueda
    }
  };
  
  return (
    <form name="FormBusqueda">
      <div className="container-fluid">
        <div className="row">

          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Titulo:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTitulo(e.target.value)}
              onKeyPress={handleKeyPress} // Agregar el evento onKeyPress
              value={Titulo}
              maxLength="55"
              autoFocus
            />
          </div>
        </div>
  
        <hr />
  
        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Buscar()}
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar() }
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
          </div>
        </div>
      </div>
    </form>
    )
  };
