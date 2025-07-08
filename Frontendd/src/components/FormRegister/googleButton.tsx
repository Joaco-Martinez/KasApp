/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {jwtDecode} from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface GoogleUserData {
  sub: string;      // ID único de Google
  name?: string;     // Nombre completo
  given_name?: string; // Primer nombre
  family_name?: string; // Apellido
  email: string;     // Correo electrónico
  picture?: string;  // URL de la imagen de perfil
  token: string;     // Token JWT
}

interface GoogleButtonProps {
  fillUpForm: (data: GoogleUserData) => void;
}

export default function GoogleRegisterButton({ fillUpForm }: GoogleButtonProps) {
  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        // Decodificar el token JWT
        const decoded: GoogleUserData = jwtDecode(credentialResponse.credential);
        
        // Formatear los datos para el formulario
        const userData: GoogleUserData = {
          sub: decoded.sub,
          name: decoded.name || "",
          given_name: decoded.given_name || "",
          family_name: decoded.family_name || "",
          email: decoded.email,
          picture: decoded.picture,
          token: credentialResponse.credential // Agregar el token al objeto
        };
        
        console.log('Datos del usuario de Google:', userData);
        fillUpForm(userData);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId="745314741297-e7g0kviikp9dfs9semi71h1nplcaud5h.apps.googleusercontent.com">
      <GoogleLogin
        text="continue_with"
        onSuccess={handleSuccess}
        onError={() => console.log('Error en el login')}
        useOneTap
        auto_select
        theme="outline"
        shape="square"
        size="medium"
        locale="es"
      />
    </GoogleOAuthProvider>
  );
}