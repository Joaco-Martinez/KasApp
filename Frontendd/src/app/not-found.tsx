"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[rgb(240,241,244)] text-gray-800 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center max-w-md w-full">
        <AlertTriangle className="text-[#9b0624] mb-4" size={64} />
        <h1 className="text-4xl font-extrabold mb-2">404</h1>
        <p className="text-lg font-semibold mb-4">Página no encontrada</p>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>
        <Link
          href="/home"
          className="bg-[#9b0624] hover:bg-[#870505] text-white font-semibold py-2 px-6 rounded-full transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Page404;
