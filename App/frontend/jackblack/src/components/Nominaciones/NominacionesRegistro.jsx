import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NominacionesRegistro({
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
        const datosActualizados = { ...data, FechaNominacion: fechaNominacionEpoch };
        Grabar(datosActualizados);
    };

    const [fechaNominacionEpoch, setFechaNominacionEpoch] = React.useState(
        Item?.FechaNominacion || 0
    );

    if (!Item) return null;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">

                <fieldset disabled={AccionABMC === "C" || AccionABMC === "B"}>

                    {/* campo nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="NombrePremio">
                                Nombre Premio<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("NombrePremio", {
                                    required: { value: true, message: "Nombre es requerido" },
                                    minLength: {
                                        value: 5,
                                        message: "Nombre debe tener al menos 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Nombre debe tener como m�ximo 30 caracteres",
                                    },
                                })}
                                autoFocus
                                className={
                                    "form-control " + (errors?.NombrePremio ? "is-invalid" : "")
                                }
                            />
                            {errors?.NombrePremio && touchedFields.NombrePremio && (
                                <div className="invalid-feedback">
                                    {errors?.NombrePremio?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo Tipo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="TipoPremio">
                                Tipo Premio<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("TipoPremio", {
                                    required: { value: true, message: "Tipo es requerido" },
                                    minLength: {
                                        value: 3,
                                        message: "Tipo debe tener al menos 3   caracteres",
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Tipo debe tener como m�ximo 30 caracteres",
                                    },
                                })}
                                className={
                                    "form-control " + (errors?.TipoPremio ? "is-invalid" : "")
                                }
                            />
                            {errors?.TipoPremio && touchedFields.TipoPremio && (
                                <div className="invalid-feedback">
                                    {errors?.TipoPremio?.message}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* campo Descripcion */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Descripcion">
                                Descripcion<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("Descripcion", {
                                    required: { value: true, message: "Descripcion es requerida" },
                                    minLength: {
                                        value: 3,
                                        message: "Descripcion debe tener al menos 3   caracteres",
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Descripcion debe tener como m�ximo 30 caracteres",
                                    },
                                })}
                                className={
                                    "form-control " + (errors?.Descripcion ? "is-invalid" : "")
                                }
                            />
                            {errors?.Descripcion && touchedFields.Descripcion && (
                                <div className="invalid-feedback">
                                    {errors?.Descripcion?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo FechaNominacion */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="FechaNominacion">
                                Fecha Nominacion<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <DatePicker
                                selected={
                                    fechaNominacionEpoch
                                        ? new Date(fechaNominacionEpoch * 1000)
                                        : null
                                }
                                onChange={(date) => {
                                    const epochDate = date ? Math.floor(date.getTime() / 1000) : 0;
                                    setFechaNominacionEpoch(epochDate);
                                }}
                                dateFormat="dd/MM/yyyy"
                                className={
                                    "form-control " + (errors?.FechaNominacion ? "is-invalid" : "")
                                }
                                showYearDropdown
                                yearDropdownItemNumber={5}
                                required
                            />

                            {errors?.FechaNominacion && (
                                <div className="invalid-feedback">
                                    {errors?.FechaNominacion?.message}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* campo Resultado(1/0 bool) */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Resultado">
                                Resultado(0/1)<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("Resultado", {
                                    required: { value: true, message: "Resultado es requerido" },
                                })}
                                className={
                                    "form-control " + (errors?.Descripcion ? "is-invalid" : "")
                                }
                            >
                                <option value={null}></option>
                                <option value={0}>NO GANO</option>
                                <option value={1}>GANO</option>
                            </select>

                            <div className="invalid-feedback">{errors?.Resultado?.message}</div>
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

export default NominacionesRegistro