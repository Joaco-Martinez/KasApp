"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { refreshSession } from "@/services/authService";
import { useAuthContext } from "../../../../context/authContext";
import { useState } from "react";
const PagoExitoso = () => {
  const [usuario, setUsuario] = useState({});   
  
  const router = useRouter();
    const hasExploded = useRef(false);
    const { SaveUserData }  = useAuthContext()
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout;

    const fetchData = async () => {
      const result = await refreshSession(SaveUserData);

      console.log(result)
      const tienePago = result;

      if (tienePago) {
        setUsuario(result);

        if (!hasExploded.current) {
          hasExploded.current = true;
          confetti({
            particleCount: 150,
            spread: 106,
            origin: { y: 0.6 },
            colors: [
              "#FF6F61", "#FFB400", "#00C49A", "#00A6FF", "#FF61A6",
              "#FF0000", "#00FF00", "#FFFF00", "#0000FF", "#FFD700"
            ],
            zIndex: 9999,
          });

          // Esperá 5 segundos y redirigí
          setTimeout(() => {
            router.push("/DashboardAgente");
          }, 5000);
        }

        // Detenemos el polling
        clearInterval(pollingInterval);
      }
    };

    // Iniciar polling cada 3 segundos
    pollingInterval = setInterval(fetchData, 3000);

    // Llamada inicial rápida
    fetchData();

    // Limpiar al desmontar
    return () => clearInterval(pollingInterval);
  }, [router, SaveUserData]);

  return (
    <div className="min-h-screen bg-[#F8E2E1] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-white rounded-2xl shadow-lg shadow-black w-full max-w-md p-8 text-center animate-fade-in z-10">
        <CheckCircle className="w-16 h-16 text-[#833444] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#833444] mb-2">¡Pago realizado con éxito!</h2>
        <p className="text-gray-800 font-medium">
          ¡Gracias por suscribirte a KasApp!
        </p>
        <p className="text-sm text-gray-500 mt-4">Te estamos redirigiendo en 3 segundos...</p>
        <div className="w-8 h-8 border-4 border-[#833444] border-t-transparent rounded-full animate-spin mx-auto mt-6" />
      </div>
    </div>
  );
};

export default PagoExitoso;

