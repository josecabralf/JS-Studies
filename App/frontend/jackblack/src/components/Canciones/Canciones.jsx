import React, { useState } from "react";
import CancionesBuscar from "./CancionesBuscar";
import CancionesListado from "./CancionesListado";
import CancionesRegistro from "./CancionesRegistro";
import cancionesService from "../../services/canciones.service"

function Canciones() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  async function Buscar() {
    const data = await cancionesService.Buscar(Nombre);
    setItems(data);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await cancionesService.BuscarPorId(item);
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
      IdCancion: 0,
      Nombre: null,
      Genero: null,
      DuracionSeg: null,
      FechaLanzamiento: null,
    });
  }

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await cancionesService.Grabar(item);
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
      await cancionesService.Bajar(item);
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
        Canciones <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      { AccionABMC === "L" && <CancionesBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Buscar={Buscar}
        Agregar={Agregar}
        onSubmit={Buscar}
      />}

      {/* Tabla de resutados de busqueda y Paginador */}
      { AccionABMC === "L" && Items?.length > 0 && <CancionesListado
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
      { AccionABMC !== "L" && <CancionesRegistro
        {...{ AccionABMC, Item, Grabar, Volver, Bajar}}
      />}
    </div>
  );
}
export default Canciones;
