"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Building,
  Users,
  User,
  Wallet,
  Settings,
  LogOut,
  Home,
} from "lucide-react";

interface CeluSidebarDashboardProps {
  name: string;
  surname: string;
}

const CeluSidebar: React.FC<CeluSidebarDashboardProps> = ({ name, surname }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden">
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-white shadow-md px-4 py-3">
        <h2 className="font-bold text-xl text-gray-900">{name} {surname}</h2>
        <div className="flex items-center gap-3">
          <button onClick={toggleMenu} className="text-gray-800">
            <Menu size={30} />
          </button>
        </div>
      </div>

      {/* Sidebar Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleMenu}
          />

          {/* Sidebar */}
          <div className="relative z-50 w-72 bg-white h-full overflow-y-auto shadow-lg p-4">
            <button onClick={toggleMenu} className="absolute top-4 left-4">
              <X size={26} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mt-8 mb-4 border-b border-gray-300 pb-4">
              <div className="bg-gray-900 rounded-full p-2">
                <User className="text-white" size={40} />
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">{name} {surname}</h2>
                <p className="text-sm">Administrador</p>
              </div>
            </div>

            {/* Menú Items */}
            <nav className="space-y-4">
              <Link
                href="/DashboardAdmin"
                className="flex items-center gap-2 text-lg hover:bg-gray-200 rounded p-2"
                onClick={toggleMenu}
              >
                <Home size={24} /> Inicio
              </Link>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-200 rounded p-2">
                  <Building size={24} />
                  Inmobiliarias
                  <span className="ml-auto transition-transform duration-200 group-open:rotate-90">
                    ▶
                  </span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/DashboardAdmin?view=gestion-inmobiliarias"
                      className="block text-sm hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      Gestión de inmobiliarias
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/DashboardAdmin?view=aprobar-inmobiliarias"
                      className="block text-sm hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      Aprobación de inmobiliarias
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/DashboardAdmin?view=editar-inmobiliaria"
                      className="block text-sm hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      Editar inmobiliarias
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/DashboardAdmin?view=gestion-inmobiliarias"
                      className="block text-sm hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      Todas las inmobiliarias
                    </Link>
                  </li>
                </ul>
              </details>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-200 rounded p-2">
                  <Wallet size={24} />
                  Gestión de pagos
                  <span className="ml-auto transition-transform duration-200 group-open:rotate-90">
                    ▶
                  </span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/DashboardAdmin?view=gestion-pagos"
                      className="block text-sm hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      Administrar pagos
                    </Link>
                  </li>
                </ul>
              </details>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-200 rounded p-2">
                  <Settings size={24} />
                  Gestión de formulario
                  <span className="ml-auto transition-transform duration-200 group-open:rotate-90">
                    ▶
                  </span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/DashboardAdmin?view=gestion-formularios"
                      className="block text-sm hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      Administrar formularios
                    </Link>
                  </li>
                </ul>
              </details>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-200 rounded p-2">
                  <Users size={24} />
                  Notificaciones
                  <span className="ml-auto transition-transform duration-200 group-open:rotate-90">
                    ▶
                  </span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/DashboardAdmin?view=notificaciones"
                      className="block text-sm hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      Enviar Notificación
                    </Link>
                  </li>
                </ul>
              </details>

              {/* Logout */}
              <div className="flex items-center justify-start mt-6 bg-[#9b0624] hover:bg-[#870505] text-white rounded-lg p-2">
                <LogOut size={24} className="mr-2" />
                <Link
                  href="/"
                  className="text-lg font-semibold"
                  onClick={toggleMenu}
                >
                  Salir
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default CeluSidebar;
