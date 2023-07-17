import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PeliculasRegistro({
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
    const datosActualizados = { ...data, FechaEstrenoArgentina: fechaEstrenoArgentinaEpoch };
    Grabar(datosActualizados);
  };
  
  const [fechaEstrenoArgentinaEpoch, setFechaEstrenoArgentinaEpoch] = React.useState(
    Item?.FechaEstrenoArgentina || 0
  );

  if (!Item) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C" || AccionABMC === "B" }>

          {/* campo titulo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Titulo">
              Titulo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Titulo", {
                  required: { value: true, message: "Titulo es requerido" },
                  minLength: {
                    value: 5,
                    message: "Titulo debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Titulo debe tener como máximo 30 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Titulo ? "is-invalid" : "")
                }
              />
              {errors?.Titulo && touchedFields.Titulo && (
                <div className="invalid-feedback">
                  {errors?.Titulo?.message}
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

          {/* campo Recaudacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Recaudacion">
              Recaudacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Recaudacion", {
                  required: { value: true, message: "Recaudacion es requerido" },
                  min: {
                    value: 0,
                    message: "Recaudacion debe ser mayor a 0",
                  },
                  max: {
                    value: 99999,
                    message: "Recaudacion debe ser menor o igual a 9999999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Recaudacion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Recaudacion?.message}</div>
            </div>
          </div>

          {/* campo FechaEstrenoArgentina */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaEstrenoArgentina">
                Fecha de estreno en Argentina<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <DatePicker
              selected={
                fechaEstrenoArgentinaEpoch
                  ? new Date(fechaEstrenoArgentinaEpoch * 1000)
                  : null
              }
              onChange={(date) => {
                const epochDate = date ? Math.floor(date.getTime() / 1000) : 0;
                setFechaEstrenoArgentinaEpoch(epochDate);
              }}
              dateFormat="dd/MM/yyyy"
              className={
                "form-control " + (errors?.FechaEstrenoArgentina ? "is-invalid" : "")
              }
              showYearDropdown
              yearDropdownItemNumber={5}
              required
            />

              {errors?.FechaEstrenoArgentina && (
                <div className="invalid-feedback">
                  {errors?.FechaEstrenoArgentina?.message}
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
