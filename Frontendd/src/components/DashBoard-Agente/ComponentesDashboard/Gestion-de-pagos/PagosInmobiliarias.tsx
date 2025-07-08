"use client";
import React from "react";

type Pago = {
  id: number;
  inmobiliaria: string;
  fecha: string;
  monto: number;
  estado: "Pagado" | "Pendiente" | "Rechazado";
};

const pagosMock: Pago[] = [
  { id: 1, inmobiliaria: "Inmo Sur", fecha: "2025-06-01", monto: 12000, estado: "Pagado" },
  { id: 2, inmobiliaria: "Propiedades Norte", fecha: "2025-06-05", monto: 15000, estado: "Pendiente" },
  { id: 3, inmobiliaria: "Delta Hogar", fecha: "2025-05-28", monto: 8000, estado: "Rechazado" },
];

const estadoEstilo = {
  Pagado: "bg-green-100 text-green-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
  Rechazado: "bg-red-100 text-red-700",
};

export default function PagosInmobiliarias() {
  return (
    <div className="w-full px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(66,20,36)] mb-6 text-center">
          Pagos de Inmobiliarias
        </h2>

        {pagosMock.length === 0 ? (
          <p className="text-center text-gray-500">No hay pagos registrados.</p>
        ) : (
          <div className="space-y-4">
            {pagosMock.map((pago) => (
              <div
                key={pago.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">{pago.inmobiliaria}</p>
                  <p className="text-sm text-gray-600">Fecha: {pago.fecha}</p>
                  <p className="text-sm text-gray-600">Monto: ${pago.monto.toLocaleString()}</p>
                </div>
                <div className={`mt-2 md:mt-0 md:ml-4 px-4 py-2 rounded-full text-sm font-medium w-fit ${estadoEstilo[pago.estado]}`}>
                  {pago.estado}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
