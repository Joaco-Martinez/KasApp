'use client';

import { tokenSigninService } from "@/services/authService";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { useAuthContext } from "../../../context/authContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function GoogleSignIn() {
    const router = useRouter();
  const { SaveUserData } = useAuthContext();
  return (
    <GoogleOAuthProvider clientId="745314741297-e7g0kviikp9dfs9semi71h1nplcaud5h.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={credentialResponse => {
          // Decodificar el token JWT
          const credential = credentialResponse.credential;
          if (credential) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decodedToken: any = jwtDecode(credential);
            console.log('Token decodificado:', decodedToken);
            console.log('Email:', decodedToken.email);
            console.log('Nombre:', decodedToken.name);

            tokenSigninService(credential || '', SaveUserData).then((res) => {
                        if (res) {
                          console.log('Login exitoso con Google');
                          toast.success('¡Usuario Logueado! Redirigiendo al Home...', { duration: 2000 });
                setTimeout(() => {
                    router.push('/home');
                }, 2000);
                        } else {
                          console.error('Error al iniciar sesión con Google');
                        }

                      });
            
          }
          

        }}
        onError={() => {
          console.log('Error en el login');
        }}
        useOneTap
        auto_select
        theme="filled_blue"
        shape="pill"
        size="large"
      />
    </GoogleOAuthProvider>
  );

}