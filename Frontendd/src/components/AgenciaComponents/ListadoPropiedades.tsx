/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Image {
  id: number;
  file: string;
  description: string;
}

interface Propiedad {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "sell" | "rent";
  type_of_property: string;
  status: string;
  address: string;
  city: string;
  m2: number;
  bathrooms: number;
  rooms: number;
  date: string;
  images: Image[];
}

interface ListadoPropiedadesProps {
  propiedades: Propiedad[];
  slug: string;
  MainColor: string;
  SecondaryColor: string;
}

export default function ListadoPropiedades({
  propiedades,
  slug,
  MainColor,
  SecondaryColor,
}: ListadoPropiedadesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [mostrarFiltrosMobile, setMostrarFiltrosMobile] = useState(false);

  const [filtroCiudad, setFiltroCiudad] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroTipoPropiedad, setFiltroTipoPropiedad] = useState("");
  const [filtroBanos, setFiltroBanos] = useState("");
  const [filtroPrecioMin, setFiltroPrecioMin] = useState("");
  const [filtroPrecioMax, setFiltroPrecioMax] = useState("");
  const [filtroM2Min, setFiltroM2Min] = useState("");
  const [filtroM2Max, setFiltroM2Max] = useState("");
  const [filtroPiezas, setFiltroPiezas] = useState("");
  const [ordenRecientes, setOrdenRecientes] = useState(false);

  const ciudades = Array.from(new Set(propiedades.map((p) => p.city)));
  const tipos = Array.from(new Set(propiedades.map((p) => p.type)));
  const tiposPropiedad = Array.from(
    new Set(propiedades.map((p) => p.type_of_property))
  );
  const banos = Array.from(new Set(propiedades.map((p) => p.bathrooms))).sort((a, b) => a - b);
  const piezas = Array.from(new Set(propiedades.map((p) => p.rooms))).sort((a, b) => a - b);


  //FILTROOS ANASHEEEEEEEEEEEEEEE
  let propiedadesFiltradas = propiedades.filter((p) => {
    return (
      (filtroCiudad === "" || p.city === filtroCiudad) &&
      (filtroTipo === "" || p.type === filtroTipo) &&
      (filtroTipoPropiedad === "" || p.type_of_property === filtroTipoPropiedad) &&
      (filtroBanos === "" || p.bathrooms === Number(filtroBanos)) &&
      (filtroPiezas === "" || p.rooms === Number(filtroPiezas)) &&
      (filtroPrecioMin === "" || p.price >= Number(filtroPrecioMin)) &&
      (filtroPrecioMax === "" || p.price <= Number(filtroPrecioMax)) &&
      (filtroM2Min === "" || p.m2 >= Number(filtroM2Min)) &&
      (filtroM2Max === "" || p.m2 <= Number(filtroM2Max))
    );
  });

  if (ordenRecientes) {
    propiedadesFiltradas = propiedadesFiltradas.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  const totalPages = Math.ceil(propiedadesFiltradas.length / itemsPerPage);
  const currentItems = propiedadesFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFiltros = () => {
    setFiltroCiudad("");
    setFiltroTipo("");
    setFiltroTipoPropiedad("");
    setFiltroBanos("");
    setFiltroPrecioMin("");
    setFiltroPrecioMax("");
    setFiltroM2Min("");
    setFiltroM2Max("");
    setFiltroPiezas("");
    setOrdenRecientes(false);
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleRecargar = () => {
    window.location.href = `/agencia/${slug}/home#propiedades`;
  };



  useEffect(() => {
    setCurrentPage(1);
  }, [
    filtroCiudad,
    filtroTipo,
    filtroTipoPropiedad,
    filtroBanos,
    filtroPrecioMin,
    filtroPrecioMax,
    filtroM2Min,
    filtroM2Max,
    filtroPiezas,
    ordenRecientes,
  ]);

  const FiltrosUI = () => (
    <>
      <select className="border rounded px-3 py-2 text-sm w-full md:w-auto" value={filtroCiudad} onChange={(e) => setFiltroCiudad(e.target.value)}>
        <option value="">Todas las ciudades</option>
        {ciudades.map((ciudad) => (
          <option key={ciudad} value={ciudad}>{ciudad}</option>
        ))}
      </select>
      <select className="border rounded px-3 py-2 text-sm w-full md:w-auto" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
        <option value="">Venta o Alquiler</option>
        {tipos.map((tipo) => (
          <option key={tipo} value={tipo}>{tipo === "sell" ? "Venta" : "Alquiler"}</option>
        ))}
      </select>
      <select className="border rounded px-3 py-2 text-sm w-full md:w-auto" value={filtroTipoPropiedad} onChange={(e) => setFiltroTipoPropiedad(e.target.value)}>
        <option value="">Todos los tipos</option>
        {tiposPropiedad.map((tipo) => (
          <option key={tipo} value={tipo}>{tipo}</option>
        ))}
      </select>
      <select className="border rounded px-3 py-2 text-sm w-full md:w-auto" value={filtroBanos} onChange={(e) => setFiltroBanos(e.target.value)}>
        <option value="">Baños</option>
        {banos.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <select className="border rounded px-3 py-2 text-sm w-full md:w-auto" value={filtroPiezas} onChange={(e) => setFiltroPiezas(e.target.value)}>
        <option value="">Habitaciones</option>
        {piezas.map((pz) => (
          <option key={pz} value={pz}>{pz}</option>
        ))}
      </select>
      <input type="number" className="border rounded px-3 py-2 text-sm w-full md:w-auto" placeholder="Precio mínimo" value={filtroPrecioMin} onChange={(e) => setFiltroPrecioMin(e.target.value)} />
      <input type="number" className="border rounded px-3 py-2 text-sm w-full md:w-auto" placeholder="Precio máximo" value={filtroPrecioMax} onChange={(e) => setFiltroPrecioMax(e.target.value)} />
      <input type="number" className="border rounded px-3 py-2 text-sm w-full md:w-auto" placeholder="M² mínimo" value={filtroM2Min} onChange={(e) => setFiltroM2Min(e.target.value)} />
      <input type="number" className="border rounded px-3 py-2 text-sm w-full md:w-auto" placeholder="M² máximo" value={filtroM2Max} onChange={(e) => setFiltroM2Max(e.target.value)} />
    </>
  );

  return (
    <section className="p-4">

      <div className="md:hidden mb-4 text-center">
        <button
          onClick={() => setMostrarFiltrosMobile((prev) => !prev)}
          className="px-4 py-2 bg-gray-200 rounded text-sm font-medium"
        >
          {mostrarFiltrosMobile ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

      {/* Filtros Mobile */}
      <div className={`flex flex-col gap-4 mb-4 transition-all duration-300 ease-in-out ${mostrarFiltrosMobile ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"} md:hidden`}>
        {FiltrosUI()}
        <div className="flex flex-col gap-2 mt-2">
          <label className="flex items-center text-sm gap-2">
            <input
              type="checkbox"
              checked={ordenRecientes}
              onChange={() => setOrdenRecientes((v) => !v)}
            />
            Más recientes
          </label>
          <button
            onClick={handleResetFiltros}
            className="text-red-500 bg-red-100 py-2 rounded text-sm font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      
      <div className="hidden md:flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={handleResetFiltros}
          className="text-red-500 bg-red-100 px-2 py-1 rounded text-xs font-medium cursor-pointer"
        >
          Limpiar
        </button>
        {FiltrosUI()}
        <label className="flex items-center text-xs gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={ordenRecientes}
            onChange={() => setOrdenRecientes((v) => !v)}
          />
          Recientes
        </label>
      </div>

      
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        Propiedades disponibles
      </h2>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="propiedades">
        {currentItems.map((prop) => (
          <Link key={prop.id} href={`/agencia/${slug}/propiedad/${prop.id}`}>
          <div key={prop.id} className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer">
        

            <img src={prop.images[0]?.file} alt={prop.name} className="w-full h-48 md:h-56 object-cover" />
            <div className="p-4">
              <h3 className="text-base md:text-lg font-bold">{prop.name}</h3>
              <p className="text-sm mb-1">
                <strong style={{ color: MainColor }}>Ubicación:</strong>{" "}
                <span style={{ color: SecondaryColor }}>{prop.address}, {prop.city}</span>
              </p>
              <p className="text-sm mb-1">
                <strong style={{ color: MainColor }}>Precio:</strong>{" "}
                <span style={{ color: SecondaryColor }}>${prop.price.toLocaleString()} ({prop.type === "sell" ? "Venta" : "Alquiler"})</span>
              </p>
              <div className="flex text-xs text-gray-500 gap-3 mt-2">
                <span>🛏 {prop.rooms} hab</span>
                <span>🛁 {prop.bathrooms} baños</span>
                <span>📐 {prop.m2} m²</span>
              </div>
            </div>
          </div>
        </Link>
        ))}
      </div>


{totalPages > 1 && (
  <div className="flex justify-center items-center mt-8 gap-4">
          <button onClick={() => { handlePrev(); handleRecargar(); }} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50">
            ← Anterior
          </button>
          <span className="text-sm text-gray-700">Página {currentPage} de {totalPages}</span>
          <button onClick={() => { handleNext(); handleRecargar(); }} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 text-sm rounded disabled:opacity-50">
            Siguiente →
          </button>
        </div>
      )}
    </section>
  );
}
