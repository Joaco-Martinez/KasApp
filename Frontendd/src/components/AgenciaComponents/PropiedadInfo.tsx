// components/PropiedadInfo.tsx
import React from "react";

interface PropiedadInfoProps {
  name: string;
  rooms: number;
  bathroom: number;
  m2: number;
  address: string;
  city: string;
  price: number;
  type_of_property: string;
  type: "sell" | "rent";
  status: string;
}

export default function PropiedadInfo({
  name,
  rooms,
  bathroom,
  m2,
  address,
  city,
  price,
  type_of_property,
  type,
  status,
}: PropiedadInfoProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">{name}</h1>
      <p className="text-gray-700 mb-1">
        {rooms} ambientes • {bathroom} baños • {m2} m²
      </p>
      <p className="text-gray-500 mb-4">
        {address}, {city}
      </p>
      <p className="text-2xl font-bold text-green-600 mb-4">
        ${price.toLocaleString()}
      </p>
      <div className="text-sm text-gray-700 space-y-1 mb-4">
        <p>
          <strong>Tipo:</strong> {type_of_property}
        </p>
        <p>
          <strong>Operación:</strong> {type === "sell" ? "Venta" : "Alquiler"}
        </p>
        <p>
          <strong>Estado:</strong> {status}
        </p>
      </div>
    </div>
  );
}
