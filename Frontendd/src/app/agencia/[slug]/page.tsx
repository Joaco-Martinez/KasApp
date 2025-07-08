"use client";

import {useAgency} from "../../../../context/agencyContext";
import BannerAgencia from "@/components/AgenciaComponents/BannerAgencia";

import Loader from "@/components/Loader/Loader";
import { notFound } from "next/navigation";



export default function AgenciaLanding() {
  const { agencia, loading } = useAgency();
   if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
   );
  if (!agencia) return notFound();
  return (
    <div className="min-h-screen flex flex-col">
      
      <BannerAgencia
        bannerImageUrl={agencia.customization.banner}
        logoImage={agencia.customization.logoImage}
        agencyName={agencia.name}
        info={agencia.customization.information}
      />

      <main
        className="flex-grow flex justify-center px-4 py-8"
        style={{
          color: agencia.customization.mainColors,
        }}
      >
        <div
          className="w-full max-w-3xl bg-gray-200 rounded-lg p-6 shadow-md"
          style={{
            color: agencia.customization.secondaryColor,
          }}
        >
          <h2
            className="text-center font-bold mb-6 text-2xl sm:text-3xl"
            style={{
              color: agencia.customization.mainColors,
            }}
          >
            Sobre Nosotros
          </h2>
          <p className="text-base sm:text-lg">{agencia.description}</p>
        </div>
      </main>

    </div>
  );
}
