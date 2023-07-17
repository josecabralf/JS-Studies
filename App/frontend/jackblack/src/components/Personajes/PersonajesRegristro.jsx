import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PersonajesRegistro({
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
    const datosActualizados = { ...data, FechaAparicion: fechaAparicionEpoch };
    Grabar(datosActualizados);
  };
  
  const [fechaAparicionEpoch, setfechaAparicionEpoch] = React.useState(
    Item?.FechaAparicion || 0
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

          {/* campo Habilidad */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Habilidad">
                Habilidad<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Habilidad", {
                  required: { value: true, message: "Habilidad es requerido" },
                  minLength: {
                    value: 3,
                    message: "Habilidad debe tener al menos 3   caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Habilidad debe tener como máximo 30 caracteres",
                  },
                })}
                className={
                  "form-control " + (errors?.Habilidad ? "is-invalid" : "")
                }
              />
              {errors?.Habilidad && touchedFields.Habilidad && (
                <div className="invalid-feedback">
                  {errors?.Habilidad?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo VecesInterpretado(seg) */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="VecesInterpretado">
              Veces Interpretado<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("VecesInterpretado", {
                  required: { value: true, message: "VecesInterpretado es requerido" },
                  min: {
                    value: 0,
                    message: "VecesInterpretado debe ser mayor a 0",
                  },
                  max: {
                    value: 99999,
                    message: "VecesInterpretado debe ser menor o igual a 999999",
                  },
                })}
                className={
                  "form-control " + (errors?.VecesInterpretado ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.VecesInterpretado?.message}</div>
            </div>
          </div>

          {/* campo FechaAparicion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaAparicion">
                Fecha de Aparicion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <DatePicker
              selected={
                fechaAparicionEpoch
                  ? new Date(fechaAparicionEpoch * 1000)
                  : null
              }
              onChange={(date) => {
                const epochDate = date ? Math.floor(date.getTime() / 1000) : 0;
                setfechaAparicionEpoch(epochDate);
              }}
              dateFormat="dd/MM/yyyy"
              className={
                "form-control " + (errors?.FechaAparicion ? "is-invalid" : "")
              }
              showYearDropdown
              yearDropdownItemNumber={5}
              required
            />

              {errors?.FechaAparicion && (
                <div className="invalid-feedback">
                  {errors?.FechaAparicion?.message}
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