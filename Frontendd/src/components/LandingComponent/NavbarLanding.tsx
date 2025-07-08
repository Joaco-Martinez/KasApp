import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NavbarLanding: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav id="landing" className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white shadow-md h-16 mx-auto">
      <Link href="/home" className="flex items-center space-x-2 h-full">
        <div className="flex items-center space-x-2 h-full">
          <Image
            src="/image.png"
            alt="Logo"
            width={48}
            height={48}
            className="object-contain h-full w-auto"
          />
          <span className="text-xl font-bold text-[#4A0E1B]">KasApp</span>
        </div>
      </Link>

      {/* Escritorio */}
      <div  className="hidden md:flex items-center space-x-4">
        <Link href="/#sección0">
          <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 cursor-pointer rounded">
            Sobre Nosotros
          </button>
        </Link>
        <Link href="/#sección1">
          <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded cursor-pointer">
            Cómo Funciona
          </button>
        </Link>
        <Link href="/#sección2">
          <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 cursor-pointer rounded">
            Qué Ofrecemos
          </button>
        </Link>
        <Link href="/#sección3">
          <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded cursor-pointer">
            Preguntas Frecuentes
          </button>
        </Link>
      </div>

      {/* Móvil */}
      <button
        className="md:hidden flex items-center space-x-2"
        onClick={() => setShowMenu(!showMenu)}
      >
        <span className="text-[#A62F55]">☰</span>
        <span>Menú</span>
      </button>

      {/* Menú móvil */}
      {showMenu && (
        <div className="absolute right-6 top-full mt-2 md:hidden flex flex-col space-y-2 bg-white shadow-lg p-4 rounded z-50">
          
          <div className="flex flex-col items-center space-y-2">
            <Link href="/#sección0">
              <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded">
                Sobre Nosotros
              </button>
            </Link>
            <Link href="/#sección1">
              <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded">
                Cómo Funciona
              </button>
            </Link>
            <Link href="/#sección2">
              <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded">
                Qué Ofrecemos
              </button>
            </Link>
            <Link href="/#sección3">
              <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded">
                Preguntas Frecuentes
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarLanding;
