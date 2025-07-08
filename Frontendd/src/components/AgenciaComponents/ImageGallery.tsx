import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

interface Image {
  id: number;
  file: string;
  description: string;
}

interface ImageGalleryProps {
  images: Image[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [actualImage, setActualImage] = useState(0);

  return (
    <div className="relative">
      <img
        src={images[actualImage].file}
        alt={images[actualImage].description}
        className="w-full h-[400px] object-cover rounded-xl"
      />
      {images.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-1.5 rounded-full shadow"
            onClick={() =>
              setActualImage((actualImage - 1 + images.length) % images.length)
            }
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-1.5 rounded-full shadow"
            onClick={() => setActualImage((actualImage + 1) % images.length)}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}