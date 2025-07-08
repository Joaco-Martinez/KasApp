'use client';
import React, { useState, useEffect } from 'react';
import { Upload, X, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import apiService from '@/services/apiService';

interface UploadGalleryProps {
  propertyId: string;
  setShowImageEditor: (id: boolean) => void;
}

// Definimos la interfaz para las imágenes que vienen del backend
interface BackendImage {
  id: string;
  file: string; // URL de la imagen
  publicId?: string;
  title?: string;
  description?: string;
  propertyId?: string;
  deletedAt?: string;
}

const EditarImagenesPropiedades: React.FC<UploadGalleryProps> = ({ propertyId, setShowImageEditor }) => {
  
  
  // Estado para las imágenes nuevas que el usuario selecciona antes de subir
  const [images, setImages] = useState<File[]>([]);
  // Estado para las imágenes que ya existen en la propiedad (vienen del backend)
  const [existingImages, setExistingImages] = useState<BackendImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Cuando cambia propertyId, hacemos fetch para traer las imágenes existentes
  useEffect(() => {
    if (!propertyId) return;
    
    const fetchPropertyImages = async () => {
      try {
        const response = await apiService.get(`/property/${propertyId}`, true);
        // response.images es el array con las imágenes que ya están guardadas
        setExistingImages(response.images || []);
      } catch (error) {
        toast.error('No se pudieron cargar las imágenes existentes');
        console.warn(error)
      }
    };
    
    fetchPropertyImages();
  }, [propertyId]);
  
 
  // Función para validar y agregar imágenes nuevas al estado local
  const handleFiles = (files: FileList) => {
    const validImages = Array.from(files).filter((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Algunos archivos no son imágenes válidas');
        return false;
      }
      
      // Evitar agregar imágenes duplicadas (comparando nombre, tamaño y fecha)
      const isDuplicate = images.some(
        (img) =>
          img.name === file.name &&
          img.size === file.size &&
          img.lastModified === file.lastModified
      );

      if (isDuplicate) {
        toast.error(`Imagen duplicada: "${file.name}"`);
        return false;
      }

      return true;
    });

    // Agregamos las nuevas imágenes válidas al estado
    setImages((prev) => [...prev, ...validImages]);
  };

  // Drag & Drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    };
    const handleDragLeave = () => setIsDragging(false);
    
    // Cambio de input tipo file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
            e.target.value = '';
        }
    };
    
    // Quitar una imagen nueva del preview antes de subir
    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };
    
    // Aquí podrías implementar eliminar imágenes existentes, si tu backend lo soporta.
    // Por ahora solo mostramos.
    
    // Cancelar subida: limpiar todo y cerrar modal
    const handleOnCancel = () => {
        setShowModal(false);
        setImages([]);
        setShowImageEditor(false);
    };
    
    // Subir imágenes nuevas al backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) return toast.error('Selecciona al menos una imagen');
        
        const formData = new FormData();
        images.forEach((img) => formData.append('files', img));
        
        try {
            setLoading(true);
            const res = await apiService.post(`images/property/${propertyId}/gallery`, formData, true);
            if (!res) throw new Error('Error al subir las imágenes');
            toast.success('Imágenes subidas con éxito');
            setImages([]);
            // Actualizamos la lista de imágenes existentes para que se vean las nuevas
            const refreshedProperty = await apiService.get(`/property/${propertyId}`, true);
            setExistingImages(refreshedProperty.images || []);
        } catch (err) {
            console.error(err);
            toast.error('No se pudieron subir las imágenes');
        } finally {
            setLoading(false);
        }
    };
    
    // Renderizamos previews: tanto las imágenes existentes como las nuevas
   const renderPreviews = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-3 w-full">
    {/* Imágenes existentes */}
    {existingImages.map((img) => (
      <div
        key={`existing-${img.id}`}
        className="relative bg-white p-2 rounded shadow border border-gray-300 flex flex-col items-center"
      >
        <img
          src={img.file}
          alt={img.title || 'Imagen existente'}
          className="w-full h-32 object-cover rounded-md"
        />
        <button
          type="button"
          onClick={async () => {
            try {
              await apiService.del(`/images/property/${propertyId}/gallery/${img.id}`, true);
              toast.success('Imagen eliminada');
              // Actualizamos el estado para remover la imagen del frontend
              setExistingImages((prev) => prev.filter((i) => i.id !== img.id));
            } catch (error) {
              console.error(error);
              toast.error('Error al eliminar la imagen');
            }
          }}
          className="mt-3 text-sm bg-[#A62F55] hover:bg-[#831F40] text-white font-semibold py-1 px-3 rounded"
        >
          Eliminar
        </button>
      </div>
    ))}

      {/* Imágenes nuevas (preview local) */}
      {images.map((img, idx) => (
          <div
          key={`new-${idx}`}
          className="relative bg-white p-2 rounded shadow border border-gray-300"
          >
          <img
            src={URL.createObjectURL(img)}
            alt={`Imagen nueva ${idx + 1}`}
            className="w-full h-32 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={() => removeImage(idx)}
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-800 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full px-1 pt-0 md:px-1 py-4 ">
      <div className="max mx-auto mb-10">
        <form onSubmit={handleSubmit} className="w-full ">
          <div className="flex flex-col items-start justify-start rounded-2xl p-1 md:p-2  bg-white  w-full space-y-6 min-h-[700px] md:min-h-[400px] ">
            <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] tracking-wide w-full">
              Imágenes de la propiedad
            </h2>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative w-full h-[420px] p-2 transition-all duration-300 rounded-lg overflow-hidden ${
                isDragging
                  ? "bg-blue-200 border-4 border-dashed border-blue-500"
                  : (images.length > 0 || existingImages.length > 0)
                    ? "bg-gray-300 border border-gray-300"
                    : "bg-gray-700 border-4 border-gray-700"
              }`}
            >
              {/* Si no hay imágenes nuevas ni existentes, mostramos mensaje */}
              {(images.length === 0 && existingImages.length === 0) ? (
                <>
                  {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                    <div
                      key={i}
                      className={`absolute ${pos} w-3 h-3 border-2 ${
                        pos.includes("top") ? "border-t-2" : "border-b-2"
                      } ${pos.includes("left") ? "border-l-2" : "border-r-2"} ${
                        isDragging ? "border-blue-500 scale-125" : "border-blue-500"
                      } transition-transform duration-300`}
                    />
                  ))}
                  <div className="text-white text-base md:text-lg font-semibold text-center mt-12 flex flex-col items-center px-4 md:px-6">
                    Arrastrá una imagen aquí o seleccioná una desde tu dispositivo.
                    <div className="relative w-14 h-14 bg-[#1e1e1e] flex items-center justify-center rounded-md mt-5">
                      <Image size={28} className="text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="overflow-y-auto max-h-full  p-2">{renderPreviews()}</div>
              )}
            </div>

            <div className="flex justify-center mt-4 w-full border-b border-gray-300 pb-6">
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-base md:text-lg py-2 px-5 rounded-lg cursor-pointer hover:bg-blue-800 transition"
              >
                <Upload size={22} /> Seleccionar imágenes
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row justify-center md:w-full items-center w-full gap-4 pt-2 mt-auto">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                disabled={loading}
                className="text-white bg-[#A62F55] hover:bg-[#831F40] transition-all duration-200 py-2.5 px-6 text-base md:text-lg rounded-xl font-medium w-full md:w-auto cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`text-white py-2.5 px-6 rounded-xl font-medium w-full md:w-auto text-base md:text-lg cursor-pointer ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-800 hover:bg-blue-900 transition-all duration-200"
                }`}
              >
                {loading ? "Subiendo..." : "Subir Imágenes"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal para confirmar cancelación */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">¿Cancelar la subida de imágenes?</h3>
            <p className="text-gray-600 mb-6">
            Si cancelás ahora, tu propiedad podría quedar publicada sin imágenes. ¿Estás seguro?
            </p>
            <div className="flex justify-end gap-4">
            <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg border border-gray-300 cursor-pointer"
            >
                Volver
            </button>
            <button
                onClick={handleOnCancel}
                className="bg-[#A62F55] hover:bg-[#831F40] text-white font-medium px-4 py-2 rounded-lg transition cursor-pointer"
            >
                Confirmar Cancelación
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarImagenesPropiedades;
