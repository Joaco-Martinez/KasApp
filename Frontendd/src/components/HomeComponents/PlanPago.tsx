"use client";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
const features = [
  "Diseño Semi-Personalizado",
  "Sitio responsive (PC, tablet y móvil)",
  "Integración con WhatsApp",
  "Panel de administración",
  "Hosting y dominio incluido",
  "Soporte técnico incluido",
];


export default function PlanPago() {
  const router = useRouter();
  
  const handleToRegister = () => {
    router.push("/register");
};

  return (
    <section id="pagos" className="py-16 px-6 md:px-16 rounded-xl flex flex-row items-center justify-center ">
        <div className="hidden md:flex flex-col">

        <h2 className="text-[30px]  font-bold mb-4 text-center  md:text-[40px] md:ml-[-10rem]">
          Nuestro plan profesional para inmobiliarias
        </h2>
      <div className="flex flex-row items-center justify-center">
      <div className="flex flex-col h-full justify-center">
        <div className="max-w-lg">
          <ul className="space-y-3 mb-6 mt-2 text-center">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm md:text-base">
                <FaCheck className="text-[#A62F55] mt-1 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button 
          onClick={handleToRegister}
          className="bg-[#A62F55] hover:bg-[#8d2748] text-white font-semibold  px-6 py-3 rounded-md transition mx-auto block cursor-pointer">
            Comenzar ahora
          </button>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-1 gap-8 items-center">
        <Image src="/fotoRealInmopcyMb.png" alt="Logo" width={600} height={300} className="mx-auto mt-0" />
        <p className="text-2xl font-semibold text-[#4A0E1B] mt-4 text-[40px] text-center">$1.000/mes</p>
      </div>
            </div>
            </div>
            <div className="flex flex-col md:hidden">
        <h2 className="text-[30px]  font-bold mb-4 text-center">
          Nuestro plan profesional para inmobiliarias
        </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-lg">
          <ul className="space-y-3 mb-6 mt-2 text-center">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                <FaCheck className="text-[#A62F55] mt-1 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button
          onClick={handleToRegister}
          className="bg-[#A62F55] hover:bg-[#8d2748] text-white font-semibold  px-6 py-3 rounded-md transition mx-auto block cursor-pointer">
            Comenzar ahora
          </button>
        </div>
        <Image src="/fotoRealInmopcyMb.png" alt="Logo" width={300} height={150} className="mx-auto mt-4" />
        <p className="text-xl font-semibold text-[#4A0E1B] mt-4 text-center">$1.000/mes</p>
      </div>
            </div>
    </section>
    
  );
}