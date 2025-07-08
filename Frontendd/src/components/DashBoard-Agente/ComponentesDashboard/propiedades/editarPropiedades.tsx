'use client';

import { useEffect, useState } from "react";
import { Formik } from "formik";
import toast from "react-hot-toast";
import apiService from "@/services/apiService";
import { PropertyForm, IStatus, IType } from "../../../../../interface/DashboardAgente/subirPropiedadDTO";
import { validationSchema } from "../../validacionesDashBoard/propiedades";
import EditarImagenesPropiedades from "./modificarImagenes";

interface ITypeOfProperty {
  id: string;
  type: string;
}

interface Props {
  id: string;
  onBack: () => void;
  setPropertyId: (id: string | null) => void;
}

interface UploadGalleryProps {
  propertyId: string;
  setPropertyId: (id: string | null) => void;
}

const EditarPropiedad: React.FC<Props> = ({ id, onBack }) => {
  // Estado para controlar si mostrar el editor de imágenes
  const [showImageEditor, setShowImageEditor] = useState(false);

  
  // Estado para guardar los valores iniciales del formulario
  const [initialValues, setInitialValues] = useState<PropertyForm | null>(null);

  // Tipos de propiedad (ej: casa, depto, etc)
  const [typeOptions, setTypeOptions] = useState<ITypeOfProperty[]>([]);

  // Cargar datos de la propiedad y tipos de propiedad
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertyRes, typesRes] = await Promise.all([
          apiService.get(`/property/${id}`, true),
          apiService.get('/typeofproperty', true),
        ]);

        const types = Array.isArray(typesRes) ? typesRes : [];
        setTypeOptions(types);

        setInitialValues({
          name: propertyRes.name || "",
          status: propertyRes.status || IStatus.DISPONIBLE,
          type: propertyRes.type || IType.ALQUILER,
          type_of_property_id: propertyRes.type_of_property_id || "",
          address: propertyRes.address || "",
          city: propertyRes.city || "",
          price: propertyRes.price || 0,
          m2: propertyRes.m2 || 0,
          bathrooms: propertyRes.bathrooms || 0,
          rooms: propertyRes.rooms || 0,
          description: propertyRes.description || "",
          images: propertyRes.images || [],
          agency: propertyRes.agency || "",
        });
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error al obtener datos de la propiedad");
      }
    };

    fetchData();
  }, [id]);

  // Enviar formulario y mostrar editor de imágenes
  const handleOnSubmit = async (values: PropertyForm) => {
    try {
      const cleanValues = {
        ...values,
        agency: typeof values.agency === "object" ? values.agency.id : values.agency,
      };
      const response = await apiService.patch(`/property/${id}`, cleanValues, true);
      toast.success("Propiedad actualizada correctamente");

      // Pasar al editor de imágenes
      setShowImageEditor(true);
    } catch (error) {
      console.error("Error al actualizar propiedad:", error);
      toast.error("No se pudo actualizar la propiedad");
    }
  };

  // Mostrar loading mientras carga
  if (!initialValues) return <p className="p-6">Cargando propiedad...</p>;

  return (
    <div className="p-6 border border-gray-200 rounded-md w-[60vw] m-auto shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
      {/* Si ya se hizo submit, mostrar el componente de editar imágenes */}
      {showImageEditor ? (
        <EditarImagenesPropiedades propertyId={id}  setShowImageEditor={setShowImageEditor} />
      ) : (
        <>
          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] mb-6">Editar la propiedad: {initialValues.name}</h2>

          {/* Formulario de edición */}
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            enableReinitialize
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Nombre */}
                <div className="flex flex-col w-full m-auto">
                  <label htmlFor="name" className="text-lg font-bold mb-1">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

             

                {/* Tipo */}
                <div className="flex flex-col w-full">
                  <label htmlFor="type" className="text-lg font-bold mb-1">Tipo</label>
                  <select
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.type && touched.type ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Alquiler">Alquiler</option>
                    <option value="Venta">Venta</option>
                  </select>
                  {errors.type && touched.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>

                {/* Tipo de propiedad */}
                <div className="flex flex-col w-full">
                  <label htmlFor="type_of_property_id" className="text-lg font-bold mb-1">Tipo de Propiedad</label>
                  <select
                    id="type_of_property_id"
                    name="type_of_property_id"
                    value={values.type_of_property_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.type_of_property_id && touched.type_of_property_id ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  >
                    <option value="">Seleccionar</option>
                    {typeOptions.map((type) => (
                      <option key={type.id} value={type.id}>{type.type}</option>
                    ))}
                  </select>
                  {errors.type_of_property_id && touched.type_of_property_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.type_of_property_id}</p>
                  )}
                </div>

                {/* Ciudad */}
                <div className="flex flex-col w-full">
                  <label htmlFor="city" className="text-lg font-bold mb-1">Ciudad</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.city && touched.city ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  />
                  {errors.city && touched.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                {/* Dirección */}
                <div className="flex flex-col w-full">
                  <label htmlFor="address" className="text-lg font-bold mb-1">Dirección</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  />
                  {errors.address && touched.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Precio */}
                <div className="flex flex-col w-full">
                  <label htmlFor="price" className="text-lg font-bold mb-1">Precio</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.price && touched.price ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                {/* m2 */}
                <div className="flex flex-col w-full">
                  <label htmlFor="m2" className="text-lg font-bold mb-1">m²</label>
                  <input
                    type="number"
                    id="m2"
                    name="m2"
                    value={values.m2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.m2 && touched.m2 ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  />
                  {errors.m2 && touched.m2 && (
                    <p className="text-red-500 text-sm mt-1">{errors.m2}</p>
                  )}
                </div>

                {/* Baños */}
                <div className="flex flex-col w-full">
                  <label htmlFor="bathrooms" className="text-lg font-bold mb-1">Baños</label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={values.bathrooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.bathrooms && touched.bathrooms ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  />
                  {errors.bathrooms && touched.bathrooms && (
                    <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>
                  )}
                </div>

                {/* Habitaciones */}
                <div className="flex flex-col w-full">
                  <label htmlFor="rooms" className="text-lg font-bold mb-1">Habitaciones</label>
                  <input
                    type="number"
                    id="rooms"
                    name="rooms"
                    value={values.rooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.rooms && touched.rooms ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  />
                  {errors.rooms && touched.rooms && (
                    <p className="text-red-500 text-sm mt-1">{errors.rooms}</p>
                  )}
                </div>

                {/* Descripción */}
                <div className="flex flex-col w-full md:col-span-2">
                  <label htmlFor="description" className="text-lg font-bold mb-1">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    onBlur={handleBlur}
                    placeholder="¡cambia la descripción de este inmueble!"
                    className={`border ${errors.description && touched.description ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow`}
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Botones */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full gap-3 md:col-span-2">
                  <button type="submit" className="text-white bg-blue-800 py-2 px-4 rounded-lg w-full md:w-full font-semibold hover:bg-blue-900 transition">
                    Guardar y ver las imagenes
                  </button>
                  <button type="button" onClick={onBack} className="text-white bg-[#A62F55] py-2 px-4 rounded-lg w-full md:w-full font-semibold hover:bg-[#831F40] transition">
                    Volver
                  </button>
                </div>

              </form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default EditarPropiedad;
