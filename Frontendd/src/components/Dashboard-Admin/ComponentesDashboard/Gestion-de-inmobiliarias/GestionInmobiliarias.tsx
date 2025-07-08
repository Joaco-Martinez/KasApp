"use client";
import { useState, useEffect } from "react";
import { getAllAgencies } from "../../../../services/agenciaService";
import {
  deleteAgency,
  softDeleteAgency,
  getAgencySoftDeleted,
} from "../../../../services/adminService";
import { IAgency } from "../../../../../interface/Agency";

export default function GestionInmobiliarias() {
  const [inmobiliarias, setInmobiliarias] = useState<IAgency[]>([]);
  const [softDeleteAgencies, setSoftDeleteAgencies] = useState<IAgency[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"eliminar" | "suspender" | "habilitar" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAgencies = async () => {
      const [active, suspended] = await Promise.all([
        getAllAgencies(),
        getAgencySoftDeleted(),
      ]);
      setInmobiliarias(active);
      setSoftDeleteAgencies(suspended);
    };

    fetchAgencies().catch(() => {
      setInmobiliarias([]);
      setSoftDeleteAgencies([]);
    });
  }, []);

  const abrirModal = (action: "eliminar" | "suspender" | "habilitar", id: number) => {
    setModalAction(action);
    setSelectedId(id);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setModalAction(null);
    setSelectedId(null);
  };

  const confirmarEliminar = async () => {
    if (selectedId === null) return;
    try {
      await deleteAgency(selectedId);
      setInmobiliarias((prev) => prev.filter((inmo) => inmo.id !== selectedId));
    } catch (error) {
      console.error("❌ Error al eliminar inmobiliaria:", error);
    } finally {
      cerrarModal();
    }
  };

  const confirmarSuspender = async () => {
    if (selectedId === null) return;
    try {
      await softDeleteAgency(selectedId);
      setInmobiliarias((prev) => prev.filter((inmo) => inmo.id !== selectedId));
      const nuevasSuspendidas = await getAgencySoftDeleted();
      setSoftDeleteAgencies(nuevasSuspendidas);
    } catch (error) {
      console.error("❌ Error al suspender inmobiliaria:", error);
    } finally {
      cerrarModal();
    }
  };

  const confirmarHabilitar = async () => {
    if (selectedId === null) return;
    try {
      await softDeleteAgency(selectedId); // Usa el mismo endpoint para restaurar
      const restaurada = softDeleteAgencies.find((inmo) => inmo.id === selectedId);
      if (restaurada) {
        setInmobiliarias((prev) => [...prev, restaurada]);
        setSoftDeleteAgencies((prev) => prev.filter((inmo) => inmo.id !== selectedId));
      }
    } catch (error) {
      console.error("❌ Error al habilitar inmobiliaria:", error);
    } finally {
      cerrarModal();
    }
  };
  console.log(softDeleteAgencies)
  return (
    <div className="flex flex-col items-center space-y-12">
      {/* Activas */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto relative">
        <h2 className="text-2xl font-semibold mb-6 text-[rgb(66,20,36)]">
          Gestionar Inmobiliarias
        </h2>
        {inmobiliarias.length === 0 ? (
          <p className="text-gray-500">No hay inmobiliarias para gestionar.</p>
        ) : (
          <ul className="space-y-4">
            {
            inmobiliarias.map((inmo) => (
              <li
                key={inmo.id}
                className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="mb-4 md:mb-0 md:w-2/3">
                  <p className="font-semibold text-lg">{inmo.name}</p>
                  <p className="text-sm text-gray-600">
                    {inmo.user.name} {inmo.user.surname}
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                  <button
                    onClick={() => abrirModal("suspender", inmo.id)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
                  >
                    Suspender
                  </button>
                  <button
                    onClick={() => abrirModal("eliminar", inmo.id)}
                    className="bg-[#A62F55] hover:bg-[#922749] text-white px-4 py-2 rounded text-sm cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Suspendidas */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto relative">
        <h2 className="text-2xl font-semibold mb-6 text-[rgb(66,20,36)]">
          Inmobiliarias suspendidas
        </h2>
        {softDeleteAgencies.length === 0 ? (
          <p className="text-gray-500">No hay inmobiliarias suspendidas para gestionar.</p>
        ) : (
          <ul className="space-y-4">
            {softDeleteAgencies.map((inmo) => (
              <li
                key={inmo.id}
                className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="mb-4 md:mb-0 md:w-2/3">
                  <p className="font-semibold text-lg">{inmo.name}</p>
                  <p className="text-sm text-gray-600">
                    {inmo.user.name} {inmo.user.surname}
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                  <button
                    onClick={() => abrirModal("habilitar", inmo.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
                  >
                    Habilitar
                  </button>
                  <button
                    onClick={() => abrirModal("eliminar", inmo.id)}
                    className="bg-[#A62F55] hover:bg-[#922749] text-white px-4 py-2 rounded text-sm cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal único */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {modalAction === "eliminar"
                ? "¿Estás seguro que querés eliminar esta inmobiliaria?"
                : modalAction === "suspender"
                ? "¿Estás seguro que querés suspender esta inmobiliaria?"
                : "¿Estás seguro que querés habilitar esta inmobiliaria?"}
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Volver
              </button>

              {modalAction === "eliminar" && (
                <button
                  onClick={confirmarEliminar}
                  className="px-4 py-2 rounded bg-[#A62F55] hover:bg-[#922749] text-white  cursor-pointer"
                >
                  Eliminar
                </button>
              )}
              {modalAction === "suspender" && (
                <button
                  onClick={confirmarSuspender}
                  className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer" 
                >
                  Suspender
                </button>
              )}
              {modalAction === "habilitar" && (
                <button
                  onClick={confirmarHabilitar}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                >
                  Habilitar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
