"use client";
import React from "react";
import ContactoAgente from "../../../../components/AgenciaComponents/ContactoAgente";
import { useAgency } from "../../../../../context/agencyContext";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
export default function ContactoPage() {
  const { agencia, loading } = useAgency();
  
 if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!agencia) {
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
}


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-2xl p-8 max-w-md w-full">
        <ContactoAgente
          name={agencia.user.name}
          surname={agencia.user.surname ?? ""}
          email={agencia.user.email}
          phone={agencia.user.phone ?? ""}
          foto = {agencia.user.profilePictureUrl}
        />
      </div>
    </div>
  );
}
