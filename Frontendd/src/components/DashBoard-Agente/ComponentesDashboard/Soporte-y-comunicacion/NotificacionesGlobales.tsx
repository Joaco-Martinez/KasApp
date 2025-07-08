"use client";
import { useState } from "react";

export default function NotificacionesGlobales() {
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    if (mensaje.trim() === "") return;

    // Simulación de envío
    console.log("Notificación enviada a todas las inmobiliarias:", mensaje);

    setEnviado(true);
    setMensaje("");
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(66,20,36)] mb-6 text-center">
          Enviar notificación global
        </h2>

        {enviado && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-medium shadow-sm transition-all">
            ✅ Notificación enviada con éxito
          </div>
        )}

        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribí el mensaje que recibirán todas las inmobiliarias..."
          className="w-full p-4 border border-gray-300 rounded-xl resize-none mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[rgb(166,47,85)] transition-all"
          rows={5}
        />

        <button
          onClick={handleEnviar}
          disabled={mensaje.trim() === ""}
          className="w-full md:w-auto bg-[rgb(166,47,85)] hover:bg-[rgb(144,38,72)] text-white font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50"
        >
          Enviar notificación
        </button>
      </div>
    </div>
  );
}
