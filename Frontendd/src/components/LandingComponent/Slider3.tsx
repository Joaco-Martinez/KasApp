import React from "react";
import Image from "next/image";
import Link from "next/link";

const Slider3: React.FC = () => {

    return(
        <div className="relative flex flex-col items-center text-left justify-between p-1  bg-[url('/imagenSlider3.png')] bg-cover bg-center w-full md:text-left md:bg-[radial-gradient(circle_at_right,_#F5C6C6_10%,_#421424_66%,_#421424_100%)] md:items-start md:h-[470px] md:flex-row md:p-6 md:justify-center">

            <div className="absolute inset-0 bg-gradient-to-r from-[#421424] to-[#120d0f57]  md:hidden" />

                <div className="relative z-10 pb-2 h-[208px]">
                    
                    <h1 className="text-2xl font-semibold mt-6 text-white max-w-[332px] md:text-3xl lg:text-5xl lg:max-w-[660px] ">¡Publica tus inmuebles con todas sus caracteristicas!</h1>

                  <p className="mt-2 text-white text-left max-w-[278px] md:mt-3 md:text-xl lg:text-2xl lg:max-w-[432px]">Conectá con miles de potenciales compradores o inquilinos en una plataforma diseñada para maximizar la visibilidad y el alcance de tus propiedades</p>
                    
                    <Link href="/home" className=" px-6 py-3 mt-7 lg:mx-40 max-w-[189px] sm:mx-auto rounded-lg text-center shadow-[0_4px_10px_rgba(0,0,0,0.8)] text-white font-semibold bg-[#A1375B] hover:bg-[#75233F] hidden md:block lg:mt-8 lg:text-xl lg:text-center lg:pl-8 lg:pr-8 lg:pt-3 lg:pb-3 ">COMENZAR</Link>
                </div>
                
                
                <div className="relative mt-8 w-[380px] h-[360px] lg:w-[740px] lg:h-[430px] hidden md:block">
                <Image
                    src="/imagenSlider3.png"
                    alt="imagen-slider1"
                    fill
                    className="object-contain lg:object-cover lg:mr-11 "
                />
                </div>

                <Link href="/home" className="relative z-10 pl-3 pr-3 pt-2 pb-2 m-4 mt-9 max-w-[155px] shadow-[0_4px_10px_rgba(0,0,0,1)] lg:max-w-[432px] rounded-lg text-center text-white font-semibold bg-[#A1375B] hover:bg-[#75233F] block md:hidden">COMENZAR</Link>
            </div>
)};

export default Slider3