"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useAuthContext } from "../../../context/authContext";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";
import apiService from "@/services/apiService";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { isAuth, user, ResetUserData } = useAuthContext();
  const handleLogout = () => {
    apiService.post("/auth/logout", {}, true);
    toast.success("Cerrando sesión, redirigiendo a home...");
    ResetUserData();
    setTimeout(() => {
      window.location.href = '/home';
    }, 1000);
  };


  const AuthButtons = () => (
    <>

      {user?.isAdmin ? (
        <Link href="/DashboardAdmin">
          <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded cursor-pointer">
            Panel de control
          </button>
        </Link>
      ) : (
        <Link href="/DashboardAgente">
          <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded cursor-pointer">
            Panel de control
          </button>
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded cursor-pointer"
      >
        Cerrar sesión
      </button>
    </>
  );

  const GuestButtons = () => (
    <>
      <Link href="/login">
        <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded cursor-pointer">
          Iniciar sesión
        </button>
      </Link>
      <Link href="/register">
        <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded cursor-pointer">
          Crear página
        </button>
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white shadow-md h-16">
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
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/home">Home</Link>
        <Link href="/nosotros">Nosotros</Link>
        <Link href="/contacto">Contacto</Link>

        {isAuth === null ? (
          <Loader />
        ) : isAuth ? (
          <AuthButtons />
        ) : (
          <GuestButtons />
        )}
      </div>

      {/* Móvil */}
      <button
        className="md:hidden flex items-center space-x-2"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Toggle menu"
      >
        <span className="text-[#A62F55]">☰</span>
        <span>Menú</span>
      </button>

      {/* Menú móvil */}
      {showMenu && (
        <div className="absolute right-6 top-full mt-2 md:hidden flex flex-col space-y-2 bg-white shadow-lg p-4 rounded z-50">
          <Link href="/home">Home</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/contacto">Contacto</Link>

          {isAuth ? <AuthButtons /> : <GuestButtons />}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
