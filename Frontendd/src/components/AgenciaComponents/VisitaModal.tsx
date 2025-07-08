import React, { useState } from "react";

interface VisitaModalProps {
  onClose: () => void;
  onSend: (date: string) => void;
}

export default function VisitaModal({ onClose, onSend }: VisitaModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      setDateError("La fecha no puede ser anterior a hoy.");
      setSelectedDate("");
    } else {
      setDateError("");
      setSelectedDate(e.target.value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-lg font-bold mb-4">Agendar visita</h2>
        <label className="block mb-2 text-sm font-medium">
          Seleccioná una fecha:
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className={`w-full mb-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            dateError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-green-500"
          }`}
        />
        {dateError && (
          <p className="text-red-600 text-sm mt-[-10px] mb-2 pt-3">{dateError}</p>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSend(selectedDate)}
            disabled={!selectedDate || !!dateError}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 text-sm font-medium"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}