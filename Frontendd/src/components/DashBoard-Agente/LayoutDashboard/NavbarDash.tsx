import Image from "next/image";
import React from "react";
import Link from "next/link";

const NavbarDashboard: React.FC = () => {
    return(
        <>
     <nav className="relative flex justify-between items-center px-4 md:px-6 py-3 bg-white shadow-md h-16 w-full z-40">
  {/* Logo + Nombre */}
  <Link href="/home" className="flex items-center h-full mx-auto md:mx-0">
    <div className="flex items-center gap-2 h-full">
      <Image
        src="/image.png"
        alt="Logo"
        width={48}
        height={48}
        className="object-contain h-full w-auto"
      />
      <span className="text-lg md:text-xl font-bold text-[#4A0E1B]">KasApp</span>
    </div>
  </Link>

  {/* Botón escritorio */}
  <div className="hidden md:flex items-center">
    <Link href="/home">
      <button className="bg-[#A62F55] hover:bg-[#922749] transition-colors text-white px-3 py-1 rounded cursor-pointer">
        Volver al inicio
      </button>
    </Link>
  </div>
</nav>
    </>

)}

export default NavbarDashboard