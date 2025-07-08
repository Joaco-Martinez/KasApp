"use client";
import { useState } from "react";

type Inmobiliaria = {
  id: number;
  nombre: string;
  email: string;
};

const pendientesMock: Inmobiliaria[] = [
  { id: 1, nombre: "Inmo Sur", email: "contacto@inmosur.com" },
  { id: 2, nombre: "Propiedades Norte", email: "info@norteprop.com" },
];

export default function AprobarInmobiliarias() {
  const [pendientes, setPendientes] = useState<Inmobiliaria[]>(pendientesMock);

  const aprobar = (id: number) => {
    const nuevaLista = pendientes.filter((i) => i.id !== id);
    setPendientes(nuevaLista);
    console.log(`Inmobiliaria aprobada con ID ${id}`);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(66,20,36)] mb-6 text-center">
          Inmobiliarias pendientes de aprobación
        </h2>
        {pendientes.length === 0 ? (
          <p className="text-gray-500 text-center">No hay inmobiliarias pendientes.</p>
        ) : (
          <ul className="space-y-4">
            {pendientes.map((inmo) => (
              <li
                key={inmo.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border p-4 rounded-lg hover:bg-gray-50 transition-all"
              >
                <div className="mb-2 md:mb-0">
                  <p className="font-medium text-lg">{inmo.nombre}</p>
                  <p className="text-sm text-gray-600">{inmo.email}</p>
                </div>
                <button
                  onClick={() => aprobar(inmo.id)}
                  className="w-full md:w-auto mt-2 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Aprobar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
