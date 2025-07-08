'use client';  // Muy importante para que Swiper y componentes con estado funcionen

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BodyLanding from "@/components/LandingComponent/BodyLanging";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NavbarLanding from "@/components/LandingComponent/NavbarLanding";
import Slider1 from "@/components/LandingComponent/Slider1";
import Slider2 from "@/components/LandingComponent/Slider2"; // Por ejemplo otro slide
import Slider3 from "@/components/LandingComponent/Slider3";

export default function CarruselFullWidth() {
  return (
    <>
    <div className="bg-white h-16">
    <NavbarLanding/>
    </div>
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3400, disableOnInteraction: true }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="w-full"
        >
        <SwiperSlide>
          <Slider1 />
        </SwiperSlide>

        <SwiperSlide>
          <Slider2 />
        </SwiperSlide>

        <SwiperSlide>
          <Slider3 />
        </SwiperSlide>
      </Swiper>
    <BodyLanding />

    </div>
      </>
  );
}