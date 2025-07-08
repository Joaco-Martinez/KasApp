'use client';

import apiService from "@/services/apiService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../context/authContext";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import EditarPropiedad from "./editarPropiedades";

interface Propiedad {
  id: string;
  name: string;
  price: string;
  address: string;
  status: "Vendido" | "Disponible";
  type_of_property: {
    type: string;
  };
  images: { file: string }[];
}

const EliminarPropiedades = () => {
  const { user } = useAuthContext();
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [idSeleccionado, setIdSeleccionado] = useState<string | null>(null); // 👈 Estado clave

  useEffect(() => {
    const fetchPropiedades = async () => {
      if (!user?.agencyId) return;

      try {
        const propiedadesData = await apiService.get(
          `/property/agency/${user.agencyId}`,
          true
        );

        // 🔥 Ordenamos de más vieja a más nueva usando createdAt
      const propiedadesOrdenadas = [...propiedadesData].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

   
        setPropiedades(propiedadesOrdenadas);
      } catch (error) {
        console.error("Error al obtener propiedades:", error);
      }
    };

    fetchPropiedades();
  }, [user?.agencyId]);

  const handleEliminar = async (id: string) => {
    try {
      await apiService.del(`/property/soft/${id}`, true);
      toast.success("Propiedad eliminada con éxito");
      setPropiedades((prev) => prev.filter((prop) => prop.id !== id));
    } catch (error) {
      console.error("Error al eliminar propiedad:", error);
    }
  };

  const toggleEstado = async (id: string) => {
    const prop = propiedades.find((p) => p.id === id);
    if (!prop) return;

    const nuevoEstado = prop.status === "Vendido" ? "Disponible" : "Vendido";

    try {
      await apiService.patch(`/property/${id}`, { status: nuevoEstado }, true);
      setPropiedades((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: nuevoEstado } : p
        )
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  // ✅ Si hay una propiedad seleccionada, mostramos el componente de edición
  if (idSeleccionado) {
    return <EditarPropiedad id={idSeleccionado} onBack={() => setIdSeleccionado(null)} />;
  }

  return (
    <div className="flex flex-col items-start justify-start mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-8 rounded-lg shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
      <h2 className="text-2xl md:text-3xl font-bold text-[#230c89]  ml-2 md:ml-4 border-b mb-6  border-gray-300 w-full pb-4">
        Mis propiedades
      </h2>

      <div className="flex flex-col w-full space-y-5">
        {propiedades.map((prop, i) => (
          <div key={prop.id}>
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-2 ml-1 mr-1">
              <p className="font-semibold text-[#230c89] text-xl">Propiedad N°{i+1}</p>
              <button
                onClick={() => setIdSeleccionado(prop.id)}
                className="text-white  text-sm font-semibold  flex bg-[#06a867] px-3 py-1.5 rounded-xl  hover:bg-[#047c4b] transition"
              >
                <Pencil size={20} className="w-4 h-4 mr-1" />
                Editar propiedad
              </button>
            </div>

            {/* Contenido propiedad */}
            <div className="relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-200 border border-b mb-6   border-gray-300 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
              {prop.status === "Vendido" && (
                <span className="absolute ml-2 top-5 -left-10 rotate-[-45deg] shadow-sm shadow-black bg-red-600 text-white text-xs font-bold px-10 py-1 ">
                  VENDIDA
                </span>
              )}
              {prop.status === "Disponible" && (
                <span className="absolute top-5 mt-1 -left-9 rotate-[-45deg] shadow-sm shadow-black bg-green-700 text-white text-xs font-bold px-8 py-1 ">
                  DISPONIBLE
                </span>
              )}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                <div className="w-full sm:w-[200px] h-[120px] overflow-hidden rounded-md mr-3">
                  <Image
                    src={prop.images[0]?.file || "/imagen-placeholder.jpg"}
                    alt={prop.name}
                    width={200}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-xl text-[#af355c] mb-1">
                    <span className="font-bold mr-2 text-[#85173b]">Nombre:</span>{prop.name}
                  </p>
                  <p className="text-lg text-[#992b50] mb-1 ml-1">
                    <span className="font-semibold mr-2 text-[#8e2446]">dirección:</span>{prop.address}
                  </p>
                  <p className="text-lg italic text-[#bd486d] mb-2 ml-1">
                    <span className="font-semibold mr-2 text-[#91274b]">tipo:</span>{prop.type_of_property?.type}
                  </p>
                  <p className="text-green-600 font-bold text-lg ml-1">
                    <span className="font-semibold mr-2 text-green-700">precio:</span>${prop.price}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row w-[400px] gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => toggleEstado(prop.id)}
                  className="text-white bg-[#A62F55] py-2 px-4 rounded-lg font-semibold hover:bg-[#922749] transition w-full sm:w-auto"
                >
                  {prop.status === "Vendido" ? "Marcar disponible" : "Marcar vendida"}
                </button>
                <button
                  onClick={() => handleEliminar(prop.id)}
                  className="text-white bg-[#A62F55] py-2 px-4 rounded-lg font-semibold hover:bg-[#922749] transition w-full sm:w-auto"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EliminarPropiedades;
