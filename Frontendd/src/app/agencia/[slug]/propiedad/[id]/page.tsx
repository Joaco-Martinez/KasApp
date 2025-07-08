/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Share, ChevronUp, ChevronDown } from "react-feather";
import { getPropertyById } from "../../../../../services/agenciaService";
import Loader from "@/components/Loader/Loader";
import { useAgency } from "../../../../../../context/agencyContext";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface Props {
  params: { slug: string; id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page({ params }: Props) {
  const { id } = params;
  const [propiedad, setPropiedad] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [actualImage, setActualImage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const { agencia } = useAgency();

  useEffect(() => {
    setLoading(true);
    const fetchPropiedad = async () => {
      const response = await getPropertyById(id);
      if (response) setPropiedad(response);
      setLoading(false);
    };

    fetchPropiedad();
  }, [id]);

  if (loading || !agencia) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!propiedad || !propiedad.agency) {
    return (
      <div className="flex flex-col items-center justify-center max-w-md mx-auto min-h-screen px-4 text-center">
        <img
          src={agencia.customization.logoImage}
          alt="Logo Agencia"
          className="h-20 w-20 mb-6 rounded-full shadow-md object-contain"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Propiedad no encontrada</h1>
        <p className="text-gray-600 text-base mb-6">
          No pudimos encontrar la propiedad que estás buscando. Puede que haya sido eliminada o que el enlace esté roto.
        </p>
        <a
          href={`/agencia/${agencia.slug}/home`}
          className="inline-block px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
          style={{ backgroundColor: agencia.customization.buttonColor }}
        >
          Volver al inicio de {agencia.name}
        </a>
      </div>
    );
  }

  const { agency } = propiedad;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  console.log(agency?.agentUser?.phone)
  console.log(agencia.user.phone)
  console.log(agency?.agenUser)
  const handleWhatsapp = () => {
  const Phone = agencia.user.phone;

  if (!Phone) {
    alert("El agente no tiene un número de teléfono configurado.");
    return;
  }

  const text = `Hola! Me interesa agendar una visita para la propiedad "${propiedad.name}" (ID: ${propiedad.id}) que cuesta $${propiedad.price.toLocaleString()} el día ${selectedDate}`;
  const url = `https://api.whatsapp.com/send?phone=${Phone}&text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
  setShowModal(false);
  setSelectedDate("");
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-6 flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Miniaturas */}
          <div
            className="flex flex-row md:flex-col gap-2 md:gap-4 order-2 md:order-none mt-4 md:mt-0 overflow-x-auto md:overflow-y-auto max-w-full md:max-h-[400px] scroll-smooth relative"
            id="thumbs"
          >
            {propiedad.images.length > 3 && (
              <>
                <button
                  className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow"
                  onClick={() => {
                    const container = document.getElementById("thumbs");
                    if (container) container.scrollLeft -= 100;
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="md:hidden absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow"
                  onClick={() => {
                    const container = document.getElementById("thumbs");
                    if (container) container.scrollLeft += 100;
                  }}
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white rounded-full p-1 shadow"
                  onClick={() => {
                    const container = document.getElementById("thumbs");
                    if (container) container.scrollTop -= 100;
                  }}
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-white rounded-full p-1 shadow"
                  onClick={() => {
                    const container = document.getElementById("thumbs");
                    if (container) container.scrollTop += 100;
                  }}
                >
                  <ChevronDown size={16} />
                </button>
              </>
            )}
            {propiedad.images.map((img: any, index: number) => (
              <img
                key={img.id}
                src={img.file}
                alt={img.description}
                onClick={() => setActualImage(index)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                  index === actualImage ? "border-blue-600" : "border-gray-200"
                } md:w-32 md:h-32`}
              />
            ))}
          </div>

          {/* Imagen Principal */}
          <div className="relative">
            <img
              src={propiedad.images[actualImage].file}
              alt={propiedad.images[actualImage].description}
              className="w-[450px] h-[350px] object-cover rounded-xl md:w-[600px] md:h-[450px]"
            />
            {propiedad.images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-1.5 rounded-full shadow md:left-4 md:p-2"
                  onClick={() =>
                    setActualImage((actualImage - 1 + propiedad.images.length) % propiedad.images.length)
                  }
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-1.5 rounded-full shadow md:right-4 md:p-2"
                  onClick={() => setActualImage((actualImage + 1) % propiedad.images.length)}
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info Propiedad */}
        <div className="flex flex-col justify-between flex-1 md:gap-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{propiedad.name}</h1>
            <p className="text-gray-700 mb-1">
              {propiedad.rooms} ambientes • {propiedad.bathrooms} baños • {propiedad.m2} m²
            </p>
            <p className="text-gray-500 mb-4">{propiedad.address}, {propiedad.city}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">${propiedad.price.toLocaleString()}</p>

            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p><strong>Tipo:</strong> {
                typeof propiedad.type_of_property === 'string'
                  ? propiedad.type_of_property
                  : propiedad.type_of_property?.type || "Sin especificar"
              }</p>
              <p><strong>Operación:</strong> {
                typeof propiedad.type === 'string'
                  ? propiedad.type === 'sell' ? 'Venta' : 'Alquiler'
                  : propiedad.type?.type || 'Sin especificar'
              }</p>
              <p><strong>Estado:</strong> {propiedad.status}</p>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer"
            >
              <Share size={16} />
              {copied ? "¡Copiado!" : "Compartir"}
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 cursor-pointer"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="max-w-6xl w-full mt-6 bg-white rounded-2xl shadow-2xl p-6">
        <h2 className="text-xl font-semibold mb-2">Descripción</h2>
        <p className="text-gray-800">{propiedad.description}</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h2 className="text-lg font-bold mb-4">Agendar visita</h2>
            <label className="block mb-2 text-sm font-medium">Seleccioná una fecha:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                const selected = new Date(e.target.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (selected < today) {
                  setDateError("La fecha no puede ser anterior a hoy.");
                  setSelectedDate("");
                } else {
                  setDateError("");
                  setSelectedDate(e.target.value);
                }
              }}
              className={`w-full mb-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                dateError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500 cursor-pointer"
              }`}
            />
            {dateError && (
              <p className="text-red-600 text-sm mt-[-10px] mb-2 pt-3">{dateError}</p>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm font-medium cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleWhatsapp}
                disabled={!selectedDate || !!dateError}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 text-sm font-medium cursor-pointer"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
