"use client";

import React from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { tituloValidations } from "../../validacionesDashBoard/miSitio";
import { editarAgencia } from "@/services/editarNombreYdescripcion";
import { IEditarNombreYdescAgency } from "../../../../../interface/DashboardAgente/EditarNombreYDescp";
import { useAuthContext } from "../../../../../context/authContext";

const EditarTitulo: React.FC = () => {
  const { user } = useAuthContext();

  const handleOnSubmit = async (values: IEditarNombreYdescAgency) => {
    if (!user?.agencyId) {
      toast.error("No se pudo identificar la agencia del usuario.");
      return;
    }

    try {
      const payload = {
        ...values,
        agentUser: String(user.agencyId),
      };

      const response = await editarAgencia(payload, String(user.agencyId));

      if (response) {
        toast.success("Nombre y Descripción modificados.", { duration: 2500 });
      } else {
        console.warn("⚠️ Hubo un Error al editar el Nombre y Descripción:", response);
        toast.error("Hubo un Error al editar el Nombre y Descripción.", { duration: 2000 });
      }
    } catch (error) {
      console.error("❌ Error en los datos:", error);
      toast.error("Error al guardar los cambios.", { duration: 2000 });
    }
  };

  return (
    <Formik
      initialValues={{ name: "", description: "" }}
      validationSchema={tituloValidations}
      onSubmit={handleOnSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        resetForm, // ✅ Se destructura resetForm de Formik
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start m-auto w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-6">
            Editar nombre y descripción
          </h2>

          <div className="flex flex-col w-full space-y-4">
            {/* Título */}
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-lg md:text-xl font-bold mb-1">
                Nombre de la agencia
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nuevo nombre para la Agencia"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-lg p-2 shadow w-full text-gray-600 ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                disabled={isSubmitting}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="flex flex-col w-full">
              <label htmlFor="description" className="text-lg md:text-xl font-bold mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Nueva Descripción para la Agencia"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-lg p-2 shadow w-full min-h-[120px] text-gray-600 ${
                  touched.description && errors.description
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                disabled={isSubmitting}
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-6 gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-800 py-2 px-4 rounded-lg w-full md:w-full font-semibold hover:bg-blue-900 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "⏳ Guardando..." : "Guardar cambios"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm(); // ✅ Resetea valores
                toast.error("Cambios cancelados"); // ✅ Toast
              }}
              className="text-white bg-[#A62F55] py-2 px-4 rounded-lg w-full md:w-full font-semibold hover:bg-[#831F40] transition"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditarTitulo;
