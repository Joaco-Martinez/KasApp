/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useState } from "react";
import { Upload, X, Image } from "lucide-react";
import toast from "react-hot-toast";
import apiService from "@/services/apiService";

interface UploadGalleryProps {
  propertyId: string;
}

const UploadGallery: React.FC<UploadGalleryProps> = ({ propertyId }) => {
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = (files: FileList) => {
    const currentImages = images;

    const validImages = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Algunos archivos no son imágenes válidas");
        return false;
      }

      const isDuplicate = currentImages.some(
        (img) =>
          img.name === file.name &&
          img.size === file.size &&
          img.lastModified === file.lastModified
      );

      if (isDuplicate) {
        toast.error(`No puedes agregar imágenes repetidas: "${file.name}"`);
        return false;
      }

      return true;
    });

    setImages((prev) => [...prev, ...validImages]);
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return toast.error("Selecciona al menos una imagen");

    const formData = new FormData();
    images.forEach((img) => formData.append("files", img));

    try {
      setLoading(true);
      const res = apiService.post(`images/property/${propertyId}/gallery`,formData ,true)
      if (!res) throw new Error("Error al subir las imágenes");

      toast.success("Imágenes subidas con éxito");
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron subir las imágenes");
    } finally {
      setLoading(false);
    }
  };

  const renderPreviews = () => (
    <div className="flex flex-col gap-4 w-full">
      {images.map((img, idx) => (
        <div key={idx} className="relative border-2 border-gray-300 bg-white p-2 rounded shadow w-full">
          <img
            src={URL.createObjectURL(img)}
            alt={`preview-${idx}`}
            className="w-full h-60 object-contain bg-black"
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
  <div className="w-full px-4 md:px-6 py-4">
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-start justify-start rounded-2xl p-6 shadow-md bg-white border border-gray-200 w-full space-y-6 min-h-[900px]">
          <h2 className="text-3xl font-bold text-[#230c89] tracking-wide w-full">
            Imágenes de la propiedad
          </h2>

          {/* Área de arrastre */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative w-full h-[320px] transition-all duration-300 rounded-lg overflow-hidden ${
              isDragging
                ? "bg-blue-200 border-4 border-dashed border-blue-500"
                : images.length > 0
                ? "bg-gray-100 border border-gray-300"
                : "bg-gray-700 border-4 border-gray-700"
            }`}
          >
            {/* Esquinas decorativas */}
            {images.length === 0 && (
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
              </>
            )}

            {images.length > 0 ? (
              <div className="overflow-y-auto max-h-[300px] p-2">{renderPreviews()}</div>
            ) : (
              <div className="text-white text-lg font-semibold text-center mt-12 flex flex-col items-center px-6">
                Arrastrá una imagen aquí o seleccioná una desde tu dispositivo.
                <div className="relative w-14 h-14 bg-[#1e1e1e] flex items-center justify-center rounded-md mt-5">
                  <Image size={28} className="text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Botón seleccionar imágenes */}
          <div className="flex justify-center mt-4 w-full border-b border-gray-300 pb-6">
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-lg py-2 px-5 rounded-lg cursor-pointer hover:bg-blue-800 transition"
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

          {/* Botones */}
          <div className="flex flex-col md:flex-row justify-end items-center w-full gap-4 pt-2 mt-auto">
            <button
              type="submit"
              disabled={loading}
              className={`text-white py-2.5 px-6 rounded-xl font-medium w-full md:w-auto text-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-800 hover:bg-blue-900 transition-all duration-200"
              }`}
            >
              {loading ? "Subiendo..." : "Subir Imágenes"}
            </button>
            <button
              type="button"
              onClick={() => setImages([])}
              disabled={loading}
              className="text-white bg-[#A62F55] hover:bg-[#831F40] transition-all duration-200 py-2.5 px-6 text-lg rounded-xl font-medium w-full md:w-auto"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
};

export default UploadGallery;
