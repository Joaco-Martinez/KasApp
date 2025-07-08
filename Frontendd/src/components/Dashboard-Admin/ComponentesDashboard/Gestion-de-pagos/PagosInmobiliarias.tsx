"use client";

import React, { useEffect, useState } from "react";
import { getPagos } from "@/services/adminService";

type Invoice = {
  amount: number;
  currency: string;
  createdAt?: string;
};

type Pago = {
  id: number;
  agency: {
    name: string;
  };
  createdAt: string;
  invoice: {
    [key: string]: Invoice; // clave numérica en string
  };
  status: string;
};

export default function PagosInmobiliarias() {
  const [pagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    const fetchPagos = async () => {
      const pagos = await getPagos();
      setPagos(pagos);
    };
    fetchPagos();
  }, []);

  return (
    <div className="w-full px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(66,20,36)] mb-6 text-center">
          Pagos de Inmobiliarias
        </h2>

        {pagos.length === 0 ? (
          <p className="text-center text-gray-500">No hay pagos registrados.</p>
        ) : (
          <div className="space-y-4">
            {pagos.map((pago) => {
              const invoiceList = Object.values(pago.invoice || {});
              const invoice = invoiceList[invoiceList.length - 1];

              return (
                <div
                  key={pago.id}
                  className="flex flex-col md:flex-row md:justify-between md:items-center border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800">
                      {pago.agency?.name || "Sin nombre"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Fecha:{" "}
                      {pago.createdAt
                        ? new Date(pago.createdAt).toLocaleDateString()
                        : "-"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Monto: 
                      {invoice ? (invoice.amount / 100).toLocaleString("es-AR", {
                        style: "currency",
                        currency: invoice.currency ?? " ARS",
                      }): "-"}
                      {invoice?.currency?.toUpperCase() ?? ""}
                    </p>
                  </div>

                  <div
                    className={`mt-2 md:mt-0 md:ml-4 px-4 py-2 rounded-full text-sm font-medium w-fit ${
                      pago.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pago.status}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
