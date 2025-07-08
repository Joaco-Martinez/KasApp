'use client';

// Este hook te permite leer los parámetros que están en la URL, justo después del signo ?.
import { useSearchParams } from 'next/navigation';

// import Dashboard from '@/components/DashBoard-Agente/DashboardInicio';
import EditarTitulo from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Editar-titulo';
import CambiarColores from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Cambiar-colores';
import SubirPropiedad from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Subir';
import Borrar from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Borrar';
import Facturacion from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Facturacion';
import Contrasena from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Cambiar-contraseña';
import FotoPerfil from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Cambiar-fotoPerfil';
import ReportarError from '@/components/DashBoard-Agente/ComponentesDashboard/soporte/Reportar-error';
import Seguridad from '@/components/DashBoard-Agente/ComponentesDashboard/seguridad/Seguridad';
import { useAuthContext } from '../../../context/authContext';
import SuscripcionNewsletter from './ComponentesDashboard/soporte/SuscripciónNewsletter';



export default function DashboardPage() {
  const { user } = useAuthContext(); 

 
  
  const searchParams = useSearchParams(); 
  const view = searchParams.get('view');

  const renderContent = () => {
    switch (view) {
      case 'editar-titulo':
        return <EditarTitulo />;
      case 'cambiar-colores':
        return <CambiarColores />;
      case 'subir-propiedad':
        return <SubirPropiedad />;
      case 'SuscripciónNewsletter':
        return <SuscripcionNewsletter	 />;
      case 'borrar-propiedad':
        return <Borrar />;
      case 'facturacion':
        return <Facturacion />;
      case 'cambiar-contrasena':
        return <Contrasena />;
      case 'cambiar-foto-perfil':
        return <FotoPerfil />;
      case 'reportar-error':
        return <ReportarError />;
      case 'seguridad':
        return <Seguridad />;
      default:
        return(
          <div className="bg-gray-200 border-l-8 border-[#4A0E1B] shadow-lg rounded-lg p-6">
            {/* AQUI TAMBIEN IMPLEMENTAR EL USER DE LAS COOCKIES */}
            <h1 className="text-2xl font-bold text-[#4A0E1B] mb-2">¡Bienvenido/a {user?.name} !</h1>
            <p className="text-gray-700">Aquí podrás gestionar todo lo relacionado con tu sitio, propiedades, clientes y mucho más. 🚀
            </p>
          </div>
          )
    }
  };

  return (
    <>
      <div className="flex m-auto mt-10 w-[70vw] item-center justify-betwenn ">
          {renderContent()} 
      </div>
    </>
  );
}