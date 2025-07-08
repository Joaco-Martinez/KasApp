/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAgency } from "../../../context/agencyContext";

export default function NavbarAgente() {
  const [isOpen, setIsOpen] = useState(false);
  const { agencia, loading } = useAgency();

  if (loading || !agencia) return null;

  const { name, customization } = agencia;
  const slug = agencia.slug;

  return (
    <nav
      className="relative flex justify-between items-center px-6 py-4"
      style={{ backgroundColor: customization.navbarColor }}
    >
      {/* Logo + nombre */}
      <Link href={`/agencia/${slug}`} className="flex items-center space-x-3 h-full">
        <img
          src={customization.logoImage}
          alt={`${slug} logo`}
          className="object-contain h-12 w-auto"
        />
        <span className="text-xl font-bold text-white">{name}</span>
      </Link>

      {/* Menú escritorio */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href={`/agencia/${slug}`} className="text-white hover:underline">
          Home
        </Link>
        <Link href={`/agencia/${slug}/propiedades`} className="text-white hover:underline">
          Propiedades
        </Link>
        <Link
          href={`/agencia/${slug}/contacto`}
          className="text-white px-4 py-2 rounded"
          style={{ backgroundColor: customization.buttonColor }}
        >
          Contacto
        </Link>
      </div>

      {/* Botón menú móvil */}
      <button
        className="md:hidden flex items-center space-x-2 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
        <span>Menú</span>
      </button>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="absolute right-6 top-full mt-2 md:hidden flex flex-col space-y-2 bg-white rounded shadow-lg p-4 z-50" style={{ minWidth: 160 }}>
          <Link href={`/agencia/${slug}`} className="text-[#4A0E1B] font-semibold hover:underline">
            Home
          </Link>
          <Link
            href={`/agencia/${slug}/contacto`}
            className="text-white px-4 py-2 rounded text-center"
            style={{ backgroundColor: customization.buttonColor }}
          >
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
}
