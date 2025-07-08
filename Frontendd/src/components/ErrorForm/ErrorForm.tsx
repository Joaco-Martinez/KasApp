"use client";
import React  from "react";
import { useForm, ValidationError } from '@formspree/react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
function ErrorForm() {
  const [state, handleSubmit] = useForm("mqabbrkz");
  useEffect(() => {
    if (state.succeeded) {
      toast.success('Mensaje enviado con éxito, gracias por contactarnos.', { duration: 4000 });
      setTimeout(() => {
        document.querySelectorAll('input, textarea').forEach(el => {
          if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
            el.value = '';
          }
        });
      }, 500);
    }
  }, [state.succeeded]);
  return (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col space-y-4 bg-white p-6 rounded-2xl shadow-md max-w-md w-full"
  >
    <h2 className="text-2xl font-semibold text-[#421424]">Contáctanos</h2>
    
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Dirección de correo electrónico
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        className="mt-1 p-3 block w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A62F55]"
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className="text-red-500 text-sm mt-1"
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Mensaje
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        required
        className="mt-1 p-3 block w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A62F55]"
      />
      <ValidationError
        prefix="Mensaje"
        field="message"
        errors={state.errors}
        className="text-red-500 text-sm mt-1"
      />
    </div>

    <button
      type="submit"
      disabled={state.submitting}
      className="bg-[#A62F55] hover:bg-[#921D46] text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
    >
      {state.submitting ? 'Enviando...' : 'Enviar'}
    </button>
  </form>
);
}

export default ErrorForm;