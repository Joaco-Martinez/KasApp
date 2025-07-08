// components/InmobiliariasPanel.tsx
import React from "react";

type Inmobiliaria = {
  id: number;
  nombre: string;
  email: string;
  estado: "Activa" | "Pendiente" | "Suspendida";
};

const inmobiliarias: Inmobiliaria[] = [
  { id: 1, nombre: "Inmobiliaria del Sur", email: "contacto@sureste.com", estado: "Activa" },
  { id: 2, nombre: "Norte Propiedades", email: "info@norteprop.com", estado: "Pendiente" },
  { id: 3, nombre: "Costa y Mar", email: "hola@costaymar.com", estado: "Suspendida" },
];

const statusColor = {
  Activa: "text-green-600",
  Pendiente: "text-yellow-600",
  Suspendida: "text-red-600",
};

export default function InmobiliariasPanel() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto md:p-8 md:max-w-4xl md:w-3/4">
      <h2 className="text-2xl font-semibold mb-4">Inmobiliarias registradas</h2>
      <table className="w-full text-left border-collapse md:w-3/4">
        <thead>
          <tr className="border-b">
            <th className="py-2 md:py-4">Nombre</th>
            <th className="py-2 md:py-4">Email</th>
            <th className="py-2 md:py-4">Estado</th>
          </tr>
        </thead>
        <tbody>
          {inmobiliarias.map((inmo) => (
            <tr key={inmo.id} className="border-b hover:bg-gray-50">
              <td className="py-2 md:py-4">{inmo.nombre}</td>
              <td className="py-2 md:py-4">{inmo.email}</td>
              <td className={`py-2 md:py-4 font-medium ${statusColor[inmo.estado]}`}>
                {inmo.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

