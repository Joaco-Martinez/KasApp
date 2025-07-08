/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../../../context/authContext";
import apiService from "@/services/apiService";
import { postFotoDePerfil } from "@/services/adminService";
import toast from "react-hot-toast";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Building,
  Users,
  User,
  Wallet,
  LogOut,
  Home,
  Camera,
  Upload
} from "lucide-react";

interface SidebarDashboardProps {
  name: string;
  surname: string;
}

const SidebarDashboard: React.FC<SidebarDashboardProps> = ({
  name = "",
  surname = "",
}) => {
  const { ResetUserData, user, SaveUserData } = useAuthContext();
  const [ fotoUser, setFotoUser] = useState<string | null>(null);
  const router = useRouter();
  

  useEffect (() => {
    if (user) {
      setFotoUser(user.profilePictureUrl);
    }
  }, [user]);

  const handleLogout = () => {
    apiService.post("/auth/logout", {}, true);
    toast.success("Cerrando sesión, redirigiendo a home...");
    ResetUserData();
    setTimeout(() => {
      window.location.href = '/home';
    }, 1000);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

const handleUpload = async () => {
  if (!selectedFile || !user?.id) {
    toast.error("No hay imagen seleccionada o el usuario no está identificado.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", selectedFile);

    toast.loading("Subiendo imagen...", { id: "upload" });

    const response = await postFotoDePerfil(user.id, formData);
    
    if (response) {
      toast.success("Foto de perfil actualizada con éxito", { id: "upload" });
      SaveUserData({ user: { ...user, profilePictureUrl: response.url } });
      closeModal();
    } else {
      toast.error("No se pudo actualizar la foto de perfil", { id: "upload" });
    }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    toast.error("Error al subir la imagen", { id: "upload" });
  }
};
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[rgb(240,241,244)] pt-0 mt-0">
      <div className="flex flex-col border border-gray-300 bg-white w-full md:w-[330px] pl-5 pt-4 rounded-lg rounded-tl-none mt-4 shadow-[1.5px_0_5px_-1px_rgba(0,0,0,0.5)] h-[90vh]">
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-400 pb-4 mr-6 pr-2">
            <div className="flex items-center">
              <div className="rounded-full w-14 h-14 bg-gray-200 flex items-center justify-center overflow-hidden">
                {fotoUser ? (
                  <img
                    src={fotoUser}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-gray-600" size={32} />
                )}
              </div>
              <div className="flex flex-col items-start justify-start text-center ml-3">
                <h2 className="font-bold text-xl">
                  {name} {surname}
                </h2>
                <p className="font-sans text-sm">Administrador</p>
              </div>
            </div>

            {/* Ícono de cámara con modal */}
            <div className="flex items-center">
              <button onClick={openModal} className="group relative">
                <Camera
                  className="text-gray-600 hover:text-[#A71424] transition"
                  size={22}
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] bg-yellow-100 text-yellow-800 px-2 py-1 rounded shadow-sm hidden group-hover:block">
                  Subir foto
                </div>
              </button>
            </div>
          </div>

          {/* Inicio */}
          <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-full md:w-[95%]">
            <Home size={27} className="text-gray-750" />
            <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
              <summary className="font-semibold text-xl w-full">
                <Link href="/DashboardAdmin" className="w-full block">
                  Inicio
                </Link>
              </summary>
            </details>
          </div>

          {/* Inmobiliarias */}
          <div className="mt-6 w-full md:w-[95%]">
            <details className="group bg-white rounded-md hover:bg-gray-300 transition-colors">
              <summary className="flex items-center gap-2 p-2 font-semibold text-xl cursor-pointer select-none">
                <Building size={24} className="text-gray-750" />
                Inmobiliarias
                <span className="ml-auto transition-transform duration-200 group-open:rotate-90">▶</span>
              </summary>
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1">
                <li>
                  <Link href="/DashboardAdmin?view=gestion-inmobiliarias" className="block text-gray-800 hover:text-[#A71424] transition-colors">
                    Gestión de inmobiliarias
                  </Link>
                </li>
                <li>
                  <Link href="/DashboardAdmin?view=todas-inmobiliarias" className="block text-gray-800 hover:text-[#A71424] transition-colors">
                    Todas las inmobiliarias
                  </Link>
                </li>
              </ul>
            </details>
          </div>

          {/* Gestión de pagos */}
          <div className="mt-6 w-full md:w-[95%]">
            <details className="group bg-white rounded-md hover:bg-gray-300 transition-colors">
              <summary className="flex items-center gap-2 p-2 font-semibold text-xl cursor-pointer select-none">
                <Wallet size={24} className="text-gray-750" />
                Gestión de pagos
                <span className="ml-auto transition-transform duration-200 group-open:rotate-90">▶</span>
              </summary>
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1">
                <li>
                  <Link href="/DashboardAdmin?view=gestion-pagos" className="block text-gray-800 hover:text-[#A71424] transition-colors">
                    Administrar pagos
                  </Link>
                </li>
              </ul>
            </details>
          </div>

          {/* Notificaciones */}
          <div className="mt-6 w-full md:w-[95%]">
            <details className="group bg-white rounded-md hover:bg-gray-300 transition-colors">
              <summary className="flex items-center gap-2 p-2 font-semibold text-xl cursor-pointer select-none">
                <Users size={24} className="text-gray-750" />
                Notificaciones
                <span className="ml-auto transition-transform duration-200 group-open:rotate-90">▶</span>
              </summary>
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1">
                <li>
                  <Link href="/DashboardAdmin?view=notificaciones" className="block text-gray-800 hover:text-[#A71424] transition-colors">
                    Enviar Notificación
                  </Link>
                </li>
              </ul>
            </details>
          </div>
        </div>

        {/* Botón de Logout */}
        <div className="flex items-center justify-start text-center w-full md:w-[200px] mt-auto mb-6 ml-4 rounded-2xl pt-2 pb-2 pl-3 pr-3 bg-[#A62F55] hover:bg-[#922749] transition-colors cursor-pointer">
          <LogOut size={27} className="text-white text-center" />
          <button onClick={handleLogout} className="block ml-2 font-semibold text-xl text-white text-center cursor-pointer">
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Modal para subir imagen */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0  flex items-center justify-center bg-black/70 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative z-50">
            <h3 className="text-lg font-bold mb-4">Subir nueva foto de perfil</h3>
            <label htmlFor="file-upload" className="flex items-center justify-center gap-2 mb-4 border text-black align-middle font-semibold text-lg py-2 px-4 rounded-lg cursor-pointer">
              <Upload size={22} /> Subir imagen
              <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {previewUrl && (
              <div className="mb-4 cursor-pointer">
                <img src={previewUrl} alt="Preview" className="rounded-full w-24 h-24 object-cover mx-auto" />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button onClick={closeModal} className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer">
                Cancelar
              </button>
              <button onClick={handleUpload} className="px-3 py-1 bg-[#A71424] text-white rounded hover:bg-[#870505] cursor-pointer" >
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarDashboard;
