"use client";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginService } from '../../services/authService';
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { useAuthContext } from '../../../context/authContext';
import toast from 'react-hot-toast';

import Image from 'next/image';

import { Eye, EyeOff } from 'react-feather';


const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
});


type FormData = {
  email: string;
  password: string;
};
const GoogleSignIn = dynamic(
  () => import('./googleButton'),
  { ssr: false }
);

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { SaveUserData } = useAuthContext();

  const handleGoHome = () => {
  router.push("/home");
};

  const onSubmit = async (data: FormData) => {
    try {
      const token = await loginService(data, SaveUserData) ;
      if (token === null) {
        toast.error("Error al iniciar sesión, por favor verifica tu email y contraseña");
        return;
      }

      if (token) {
                toast.success('¡Usuario Logueado! Redirigiendo al Home...', { duration: 2000 });
                setTimeout(() => {
                    router.push('/home');
                }, 2000);
                return;
            } else {
                toast.error('Dato repetido. Ingresa un valor distinto en Email.', { duration: 2000 });
            }

      handleGoHome();
    } catch (error) {
      console.error('Error enviando datos:', error);
      toast.error('Hubo un problema al querer Loguearse, intente nuevamente.', { duration: 2000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/RegisterImg.png')] bg-cover bg-center px-2">
      <div className="bg-white border border-gray-600 p-4 md:p-8 rounded shadow-md w-full max-w-xs md:max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Image src="/iconoKasapp.png" alt="Logo" width={80} height={80} className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]" />
          <h2 className="text-lg md:text-2xl font-bold text-gray-900">Iniciar sesión</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-full">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-400 rounded text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative w-full">
  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
    Contraseña
  </label>

  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      {...register('password')}
      className="w-full px-3 py-2 pr-10 border border-gray-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#A62F55]"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-2 flex items-center text-gray-600"
      tabIndex={-1}
    >
      {showPassword ? <Eye size={20} className='cursor-pointer'/> : <EyeOff size={20}  className='cursor-pointer'/>}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
  )}
</div>

          <button
            type="submit"
            className="bg-[#a62f55] text-white py-2 rounded hover:bg-[#8f2848] transition-colors w-full cursor-pointer"
          >
            Inicia sesión
          </button>
          
        </form>

        <div className="flex flex-col items-center justify-center mt-4 space-y-2">
          
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}