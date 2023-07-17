import React, { useState } from "react";
import NominacionesBuscar from "./NominacionesBuscar";
import NominacionesListado from "./NominacionesListado";
import NominacionesRegistro from "./NominacionesRegistro";
import nominacionesService from "../../services/nominaciones.service"

function Nominaciones() {
    const TituloAccionABMC = {
        A: "(Agregar)",
        B: "(Eliminar)",
        M: "(Modificar)",
        C: "(Consultar)",
        L: "(Listado)",
    };
    const [AccionABMC, setAccionABMC] = useState("L");

    const [NombrePremio, setNombrePremio] = useState("");

    const [Items, setItems] = useState(null);
    const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

    async function Buscar() {
        const data = await nominacionesService.Buscar(NombrePremio);
        setItems(data);
    }

    async function BuscarPorId(item, accionABMC) {
        const data = await nominacionesService.BuscarPorId(item);
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
            IdNominacion: 0,
            NombrePremio: null,
            TipoPremio: null,
            Descripcion: null,
            FechaNominacion: null,
            Resultado: null,
        });
    }

    async function Grabar(item) {
        // agregar o modificar
        try {
            await nominacionesService.Grabar(item);
        }
        catch (error) {
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
        try {
            await nominacionesService.Bajar(item);
        }
        catch (error) {
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
                Nominaciones <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && <NominacionesBuscar
                NombrePremio={NombrePremio}
                setNombrePremio={setNombrePremio}
                Buscar={Buscar}
                Agregar={Agregar}
                onSubmit={Buscar}
            />}

            {/* Tabla de resutados de busqueda y Paginador */}
            {AccionABMC === "L" && Items?.length > 0 && <NominacionesListado
                {...{
                    Items,
                    Consultar,
                    Modificar,
                    Eliminar
                }}
            />}

            {AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
                <i className="fa fa-exclamation-sign"></i>
                No se encontraron registros...
            </div>}

            {/* Formulario de alta/modificacion/consulta */}
            {AccionABMC !== "L" && <NominacionesRegistro
                {...{ AccionABMC, Item, Grabar, Volver, Bajar }}
            />}
        </div>
    );
}
export default Nominaciones;
