/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Home,
  Building,
  Wallet,
  Users,
  LogOut,
  Menu,
  X,
  User,
  Camera,
  Upload,
} from "lucide-react";
import { useAuthContext } from "../../../../context/authContext";
import apiService from "@/services/apiService";
import { postFotoDePerfil } from "@/services/adminService";

interface CeluSidebarDashboardProps {
  name: string;
  surname: string;
}

const CeluSidebar: React.FC<CeluSidebarDashboardProps> = ({ name, surname }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { ResetUserData, user, SaveUserData } = useAuthContext();




  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    apiService.post("/auth/logout", {}, true);
    toast.success("Cerrando sesión, redirigiendo a home...");
    ResetUserData();
    setTimeout(() => {
      window.location.href = '/home';
    }, 1000);
    setOpen(false);
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
    <div className="md:hidden">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
        <div>
          <h2 className="font-bold text-lg text-gray-800">{name} {surname}</h2>
          <p className="text-sm text-gray-500">Administrador</p>
        </div>
        <button onClick={toggleMenu}>
          <Menu size={28} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMenu} />

          <div className="relative z-50 w-72 h-full bg-white p-4 shadow-lg overflow-y-auto">
            <button onClick={toggleMenu} className="absolute top-4 left-4">
              <X size={26} />
            </button>

            <div className="flex items-center gap-3 mt-10 mb-4 border-b border-gray-300 pb-4">
              <div className="relative bg-gray-200 rounded-full w-14 h-14 overflow-hidden flex items-center justify-center">
                {user?.profilePictureUrl ? (
                  <img src={user.profilePictureUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-gray-600" size={32} />
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">{name} {surname}</h2>
                <p className="text-sm">Administrador</p>
              </div>
              <button
                onClick={openModal}
                className="bg-white p-2 rounded-full shadow-md ml-auto"
              >
                <Camera size={18} className="text-gray-700 hover:text-[#A71424] transition" />
              </button>
            </div>

            <nav className="space-y-4">
              <Link href="/DashboardAdmin" className="flex items-center gap-2 text-lg hover:bg-gray-100 p-2 rounded" onClick={toggleMenu}>
                <Home size={24} /> Inicio
              </Link>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <Building size={24} /> Inmobiliarias
                  <span className="ml-auto group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1 text-sm">
                  <li>
                    <Link href="/DashboardAdmin?view=gestion-inmobiliarias" onClick={toggleMenu} className="block hover:text-[#A71424]">Gestión de inmobiliarias</Link>
                  </li>
                  <li>
                    <Link href="/DashboardAdmin?view=todas-inmobiliarias" onClick={toggleMenu} className="block hover:text-[#A71424]">Todas las inmobiliarias</Link>
                  </li>
                </ul>
              </details>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <Wallet size={24} /> Gestión de pagos
                  <span className="ml-auto group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1 text-sm">
                  <li>
                    <Link href="/DashboardAdmin?view=gestion-pagos" onClick={toggleMenu} className="block hover:text-[#A71424]">Administrar pagos</Link>
                  </li>
                </ul>
              </details>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <Users size={24} /> Notificaciones
                  <span className="ml-auto group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1 text-sm">
                  <li>
                    <Link href="/DashboardAdmin?view=notificaciones" onClick={toggleMenu} className="block hover:text-[#A71424]">Enviar Notificación</Link>
                  </li>
                </ul>
              </details>

              <button onClick={handleLogout} className="flex items-center gap-2 text-lg text-white bg-[#9b0624] hover:bg-[#870505] p-2 mt-6 rounded-4xl w-full">
                <LogOut size={24} /> Cerrar sesión
              </button>
            </nav>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
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
              <button onClick={closeModal} className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancelar</button>
              <button onClick={handleUpload} className="px-3 py-1 bg-[#A71424] text-white rounded hover:bg-[#870505]">Subir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CeluSidebar;
