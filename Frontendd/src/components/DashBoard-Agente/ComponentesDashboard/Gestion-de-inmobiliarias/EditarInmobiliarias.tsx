// components/EditarInmobiliaria.tsx
import { useState } from "react";

type Inmobiliaria = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
};

const inmobiliariaEjemplo: Inmobiliaria = {
  id: 1,
  nombre: "Inmo Ejemplo",
  email: "contacto@inmoejemplo.com",
  telefono: "123456789",
};

export default function EditarInmobiliaria() {
  const [form, setForm] = useState(inmobiliariaEjemplo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    console.log("Datos actualizados:", form);
    // Aquí iría una llamada a tu backend para guardar los cambios
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md md:w-1/2 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Editar Inmobiliaria</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <button
          onClick={handleGuardar}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

