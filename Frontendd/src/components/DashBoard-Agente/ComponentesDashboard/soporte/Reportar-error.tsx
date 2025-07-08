"use client";
import React from "react";
import { useForm, ValidationError } from '@formspree/react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthContext } from "../../../../../context/authContext";

const ReportarError: React.FC = () => {
  const { user } = useAuthContext();
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
    <div className="flex flex-col justify-center items-center w-full px-4 sm:px-6 md:px-8 lg:px-0 py-8">
  <div className="w-full max-w-lg bg-white rounded-xl shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] p-6 sm:p-8">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#230c89] text-center mb-4">
      Reportar un error
    </h2>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Dirección de correo electrónico
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={user?.email}
          readOnly
          className="mt-1 p-3 block w-full rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A62F55] cursor-not-allowed"
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
        className="w-full mt-2 bg-[#A62F55] hover:bg-[#921D46] text-white font-semibold py-3 px-4 rounded-xl transition duration-200"
      >
        {state.submitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  </div>
</div>

  );
};

export default ReportarError;

