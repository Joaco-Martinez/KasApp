"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

const PagoCancelado = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8E2E1] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-white rounded-2xl shadow-lg shadow-black w-full max-w-md p-8 text-center animate-fade-in z-10">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#833444] mb-2">Pago cancelado</h2>
        <p className="text-gray-800 font-medium">
          Parece que cancelaste el proceso de pago.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Te redirigiremos en 3 segundos...
        </p>
        <div className="w-8 h-8 border-4 border-[#833444] border-t-transparent rounded-full animate-spin mx-auto mt-6" />
      </div>
    </div>
  );
};

export default PagoCancelado;
