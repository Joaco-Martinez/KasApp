'use client';
import {useRouter} from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Carousel2() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const imagesCount = 3;

  const startCarousel = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagesCount);
    }, 7000);
  };

  const pauseCarousel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

   const handleClick = (slug: string) => {
    router.push(`/agencia/${slug}`);
  };

  useEffect(() => {
    startCarousel();
    return pauseCarousel;
  }, []);

  return (
    <div
      className="relative w-full max-w-md mx-auto overflow-hidden  shadow-lg  border-2 border-black rounded-md text-center text-black"

    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        <Image
          className="w-full h-auto object-cover cursor-pointer"
          src="/UrbanLiving.png"
          onClick={() => handleClick('urban-living')}
          alt="Logo2"
          width={400}
          height={300}
        />
        <Image
          className="w-full h-auto object-cover cursor-pointer"
          src="/luxuryEstates.png"
          onClick={() => handleClick('luxury-estates')}
          alt="Logo3"
          width={400}
          height={300}
        />
              <Image
                  className="w-full h-auto object-cover cursor-pointer"
                  src="/dreamhomes.png"
                  onClick={() => handleClick('dream-homes')}
                  alt="Logo"
                  width={400}
                  height={300}
                />
      </div>
    </div>
  );
}
