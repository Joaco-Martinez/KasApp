// pages/pago.tsx
"use client";
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAuthContext } from '../../../../context/authContext';
import apiService from '@/services/apiService';

const stripePromise = loadStripe('pk_test_51RZHBb06zLwwPPizrSRHgPIWGJOSnyVX6OkpJscb9FC0vyQ8CYsZNBeBiqH60vD1Cq29Zig57QWJhyBj1XC2kRSJ00cC1bwyVx');

export default function Pago() {
  const { user } = useAuthContext();
  const [agencia, setAgencia] = useState({ id: "1" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    apiService.get(`agency/getByUser/${user.id}`).then((res) => {
      setAgencia(res);
    });
  }, [user?.id]);

  const handleCheckout = async () => {
    toast.success("Se te redireccionara a la pagina de pago...");
    setLoading(true);
    try {
      const res = await apiService.post(`stripe/checkout/${agencia?.id}`, { email: user?.email }, true);
      const stripe = await stripePromise;
      if (stripe && res.id) {
        await stripe.redirectToCheckout({ sessionId: res.id });
      } else {
        alert("Error al redirigir al checkout.");
      }
    } catch {
      alert("Hubo un error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8E2E1] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg shadow-black w-full max-w-md p-8 text-center animate-fade-in">
        <div className="mb-4">
          <CheckCircle className="w-16 h-16 text-[#833444] mx-auto" />
        </div>

        <h2 className="text-2xl font-bold text-[#833444] mb-2">Suscripción</h2>

        <p className="text-gray-800 mb-4 font-medium">
          Accedé a contenido exclusivo, soporte prioritario y funciones avanzadas para tu inmobiliaria.
        </p>

        <p className="text-lg font-bold text-[#833444] mb-6">$1.000 / mes</p>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 ${
            loading
              ? 'bg-[#d49c9c] cursor-not-allowed'
              : 'bg-[#833444] hover:bg-[#522d37]'
          } cursor-pointer`}
        >
          {loading ? 'Redirigiendo...' : 'Suscribirme ahora'}
        </button>

        <p className="mt-4 text-xs text-gray-500 font-medium">
          Cancelá cuando quieras. Sin compromiso.
        </p>
      </div>
    </div>
  );
}
