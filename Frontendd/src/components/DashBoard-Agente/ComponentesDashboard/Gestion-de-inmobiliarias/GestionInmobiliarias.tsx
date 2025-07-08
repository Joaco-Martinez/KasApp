// components/GestionInmobiliarias.tsx
"use client";
import { useState } from "react";

type Inmobiliaria = {
  id: number;
  nombre: string;
  email: string;
};

const mockInmobiliarias: Inmobiliaria[] = [
  { id: 1, nombre: "Urbanos SRL", email: "info@urbanos.com" },
  { id: 2, nombre: "Propiedades Delta", email: "delta@propiedades.com" },
];

export default function GestionInmobiliarias() {
  const [inmobiliarias, setInmobiliarias] = useState(mockInmobiliarias);

  const suspender = (id: number) => {
    console.log("Suspendida inmobiliaria ID:", id);
  };

  const eliminar = (id: number) => {
    setInmobiliarias((prev) => prev.filter((i) => i.id !== id));
    console.log("Eliminada inmobiliaria ID:", id);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[rgb(66,20,36)]">
        Gestionar Inmobiliarias
      </h2>
      {inmobiliarias.length === 0 ? (
        <p className="text-gray-500">No hay inmobiliarias para gestionar.</p>
      ) : (
        <ul className="space-y-4">
          {inmobiliarias.map((inmo) => (
            <li
              key={inmo.id}
              className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="mb-4 md:mb-0 md:w-2/3">
                <p className="font-semibold text-lg">{inmo.nombre}</p>
                <p className="text-sm text-gray-600">{inmo.email}</p>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                <button
                  onClick={() => suspender(inmo.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
                >
                  Suspender
                </button>
                <button
                  onClick={() => eliminar(inmo.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}