"use client";

import { useAuthContext } from "../../../../../context/authContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {postNewsletter} from "../../../../services/agenteGet";
const SuscripcionNewsletter = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
    console.log(user)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email || !user.email.includes("@")) {
      toast.error("Ingresá un email válido");
      return;
    }

    setLoading(true);
    console.log("Email del usuario:", user.email);
    const response = await postNewsletter(user.email);
    if (response) {
      toast.success(response);
    } else {
      toast.error("Hubo un error al suscribirte al newsletter.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 items-center">
            Suscribite al newsletter
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Recibí actualizaciones, consejos para agentes, novedades del sistema y mucho más.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            placeholder="Tu correo electrónico"
            className="p-3 md:p-4 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#A62F55] cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#A62F55] hover:bg-[#8c2747] transition px-4 py-3 md:py-4 rounded-xl text-white font-medium text-sm md:text-base disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Enviando..." : "Suscribirme"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuscripcionNewsletter;
