import { useAuthContext } from '../../../context/authContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import apiService from '@/services/apiService'; 

const Logout = () => {
  const { ResetUserData } = useAuthContext();
  const router = useRouter();

  useEffect(() => {

    apiService.post("/auth/logout", {}, true);
    toast.success("Cerrando sesión, redirigiendo a home...");
    ResetUserData();
    setTimeout(() => {
      router.push("/home");
    }, 1000);

  }, [ResetUserData, router]);

  return null;
};

export default Logout;
