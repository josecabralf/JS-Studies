import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CancionesRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
  Bajar,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    const datosActualizados = { ...data, FechaLanzamiento: fechaLanzamientoEpoch };
    Grabar(datosActualizados);
  };
  
  const [fechaLanzamientoEpoch, setFechaLanzamientoEpoch] = React.useState(
    Item?.FechaLanzamiento || 0
  );

  if (!Item) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C" || AccionABMC === "B" }>

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 5,
                    message: "Nombre debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Nombre debe tener como máximo 30 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Genero */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Genero">
                Genero<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Genero", {
                  required: { value: true, message: "Genero es requerido" },
                  minLength: {
                    value: 3,
                    message: "Genero debe tener al menos 3   caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Genero debe tener como máximo 30 caracteres",
                  },
                })}
                className={
                  "form-control " + (errors?.Genero ? "is-invalid" : "")
                }
              />
              {errors?.Genero && touchedFields.Genero && (
                <div className="invalid-feedback">
                  {errors?.Genero?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo Duracion(seg) */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="DuracionSeg">
              Duracion(seg)<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("DuracionSeg", {
                  required: { value: true, message: "Duracion es requerido" },
                  min: {
                    value: 0,
                    message: "Duracion debe ser mayor a 0",
                  },
                  max: {
                    value: 99999,
                    message: "Duracion debe ser menor o igual a 999999",
                  },
                })}
                className={
                  "form-control " + (errors?.DuracionSeg ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.DuracionSeg?.message}</div>
            </div>
          </div>

          {/* campo FechaLanzamiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaLanzamiento">
                Fecha Lanzamiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <DatePicker
              selected={
                fechaLanzamientoEpoch
                  ? new Date(fechaLanzamientoEpoch * 1000)
                  : null
              }
              onChange={(date) => {
                const epochDate = date ? Math.floor(date.getTime() / 1000) : 0;
                setFechaLanzamientoEpoch(epochDate);
              }}
              dateFormat="dd/MM/yyyy"
              className={
                "form-control " + (errors?.FechaLanzamiento ? "is-invalid" : "")
              }
              showYearDropdown
              yearDropdownItemNumber={5}
              required
            />

              {errors?.FechaLanzamiento && (
                <div className="invalid-feedback">
                  {errors?.FechaLanzamiento?.message}
                </div>
              )}
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && AccionABMC !== "B" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}

            {AccionABMC === "B" && (
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={() => Bajar(Item)}
                >
                <i className="fa fa fa-trash-o"></i> Bajar
              </button>
            )}
            
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}
