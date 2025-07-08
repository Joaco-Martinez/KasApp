import Link from "next/link";
import { Upload, ArrowDownCircle, ClipboardList } from 'lucide-react';
import SidebarDashboard from "@/components/DashBoard-Agente/LayoutDashboard/SideBarDash";

// import NavbarLanding from "@/components/LandingComponent/NavbarLanding";


export default function LayoutSidebar({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
    <>

        <div className="flex bg-[rgb(240,241,244)]">
        {/* Sidebar */}
            <SidebarDashboard/> 

        {/* Main que se va reenderizando */}
      <main className="flex-1 flex flex-col  p-2 ml-11 md:p-5 bg-white border border-gray-300 rounded-lg mt-4  md:ml-6 shadow-[4px_5px_8px_4px_rgba(0,0,0,0.4)] w-full md:w-auto ">
      
      {/* Botones principales */}
      <div className="flex flex-col md:flex-row items-start  md:items-center justify-end border-b mr-11 border-gray-400 pb-4.5  gap-4 md:gap-5">
        
        
        <Link
          href="/DashboardAgente?view=subir-propiedad"
          className="flex items-center justify-center bg-gray-200 text-base md:text-lg px-4 py-2 rounded border border-gray-300 hover:bg-gray-400 w-full md:w-auto"
        >
          <Upload size={22} className="text-blue-800 mr-3" />
          Subir propiedad
        </Link>

        <Link
          href="/DashboardAgente?view=borrar-propiedad"
          className="flex items-center justify-center bg-gray-200 text-base md:text-lg px-4 py-2 rounded border border-gray-300 hover:bg-gray-400 w-full md:w-auto"
        >
          <ClipboardList size={22} className="text-blue-800 mr-3" />
          Administrar propiedades
        </Link>

        <Link
          href="/DashboardAgente?view=cambiar-colores"
          className="flex items-center justify-center bg-gray-200 text-base md:text-lg px-4 py-2 rounded border border-gray-300 hover:bg-gray-400 w-full md:w-auto"
        >
          <ArrowDownCircle size={22} className="text-blue-800 mr-3" />
          Editar mi sitio web
        </Link>
      </div>

      {/* Contenido dinámico renderizado */}
      {children}
    </main>
        </div>
    </>
)}