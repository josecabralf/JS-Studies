import React, { useState } from "react";
import PeliculasBuscar from "./PeliculasBuscar";
import PeliculasListado from "./PeliculasListado";
import PeliculasRegistro from "./PeliculasRegistro";
import peliculasService from "../../services/peliculas.service"

function Peliculas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Titulo, setTitulo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  async function Buscar() {
    const data = await peliculasService.Buscar(Titulo);
    setItems(data);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await peliculasService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  
  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Eliminar(item) {
    BuscarPorId(item, "B"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdPelicula: 0,
      Titulo: null,
      Genero: null,
      Recaudacion: null,
      FechaEstrenoArgentina: null,
    });
  }

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await peliculasService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
    Volver();
  }

  async function Bajar(item) {
    // agregar o modificar
    try
    {
      await peliculasService.Bajar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro borrado correctamente."
      );
    }, 0);
    Volver();
  }
  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Peliculas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      { AccionABMC === "L" && <PeliculasBuscar
        Titulo={Titulo}
        setTitulo={setTitulo}
        Buscar={Buscar}
        Agregar={Agregar}
        onSubmit={Buscar}
      />}

      {/* Tabla de resutados de busqueda y Paginador */}
      { AccionABMC === "L" && Items?.length > 0 && <PeliculasListado
        {...{
          Items,
          Consultar,
          Modificar,
          Eliminar
        }}
      />}

      { AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
      </div>}

      {/* Formulario de alta/modificacion/consulta */}
      { AccionABMC !== "L" && <PeliculasRegistro
        {...{ AccionABMC, Item, Grabar, Volver, Bajar}}
      />}
    </div>
  );
}
export default Peliculas;
