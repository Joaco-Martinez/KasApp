"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { postMaillerAll } from "@/services/adminService";
export default function NotificacionesGlobales() {
  const [mensaje, setMensaje] = useState("");
  const [subject, setSubject] = useState("");


  const handleEnviar = () => {
    if (mensaje.trim() === "") return;


    postMaillerAll(subject, mensaje);

    toast.success("Notificación enviada con éxito", {
      duration: 1000,
    })
    setMensaje("");
    setSubject("");
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md w-full max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(66,20,36)] mb-6 text-center">
          Enviar notificación global
        </h2>

        

          <input type="text" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Titulo"
          className="w-full p-4 border border-gray-300 rounded-xl resize-none mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[rgb(166,47,85)] transition-all">
          </input>

        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribí el mensaje que recibirán todas las inmobiliarias..."
          className="w-full p-4 border border-gray-300 rounded-xl resize-none mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[rgb(166,47,85)] transition-all"
          rows={5}
        />

        <button
          onClick={handleEnviar}
          disabled={mensaje.trim() === "" || subject.trim() === ""}
          className="w-full md:w-auto bg-[rgb(166,47,85)] hover:bg-[rgb(144,38,72)] text-white font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50
          cursor-pointer disabled:cursor-not-allowed"
        >
          Enviar notificación
        </button>
      </div>
    </div>
  );
}
