// components/CamposObligatorios.tsx
import { useState } from "react";

const camposDisponibles = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "email", label: "Email" },
  { key: "telefono", label: "Teléfono" },
  { key: "direccion", label: "Dirección" },
];

export default function CamposObligatorios() {
  const [camposObligatorios, setCamposObligatorios] = useState<string[]>([]);

  const toggleCampo = (key: string) => {
    setCamposObligatorios((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const guardarConfiguracion = () => {
    console.log("Campos obligatorios configurados:", camposObligatorios);
    // Aquí podés enviar esta configuración al backend o guardarla donde quieras
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto md:w-1/2 lg:w-1/3">
      <h2 className="text-xl font-semibold mb-4 text-center">Configurar campos obligatorios</h2>
      <ul className="space-y-3 md:flex md:flex-wrap md:justify-center">
        {camposDisponibles.map(({ key, label }) => (
          <li key={key} className="flex items-center gap-3 w-full md:w-1/2 lg:w-1/3">
            <input
              type="checkbox"
              id={key}
              checked={camposObligatorios.includes(key)}
              onChange={() => toggleCampo(key)}
              className="w-5 h-5"
            />
            <label htmlFor={key} className="select-none cursor-pointer text-gray-700">
              {label}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={guardarConfiguracion}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md md:w-auto"
      >
        Guardar configuraci n
      </button>
    </div>
  );
}
