import React from "react";
import Image from "next/image";
import { LogIn, HandCoins, Monitor, TrendingUp } from 'lucide-react';

const BodyLanding: React.FC = () => {
    return (

      <div className="relative flex flex-col items-center text-left justify-between bg-[#F8E2E1] w-full gap-4 ">

{/* PRIMER SECCIÓN: SOBRE NOSOTROS. */}
    {/* Título */}
    <h2 id="sección0" className=" w-full text-center text-xl text-white mt-8 mb-11   font-bold bg-[#833444] md:text-2xl lg:text-2xl">¿Quienes somos?</h2>
    <div className="w-full bg-[#F8E2E1] flex justify-center items-center py-2 px-4">
    <div className="bg-white rounded-2xl shadow-lg shadow-black max-w-3xl w-full p-8 pb-4 text-center">
    <p className="text-base text-gray-800 leading-relaxed font-semibold">
      Somos un equipo de desarrolladores y expertos en tecnología enfocados en transformar el sector inmobiliario. 
      Nuestra misión es brindarte una plataforma digital moderna, intuitiva y profesional, 
      pensada exclusivamente para agentes inmobiliarios que buscan destacarse sin necesidad de conocimientos técnicos 
      ni costosos desarrollos a medida. <br/><br/>
      Entendemos los desafíos que enfrentan los agentes hoy: la falta de un sitio web propio, el uso limitado de redes sociales 
      y la necesidad de mostrar propiedades de manera clara y organizada. Por eso creamos una solución centralizada y escalable 
      que te permite tener tu propio sitio web personalizado, con tu logo, tus colores, tus textos y tus propiedades, 
      todo gestionado desde un panel de control fácil de usar. <br/><br/>
      Queremos que puedas competir en igualdad de condiciones con grandes empresas, sin perder tiempo ni recursos. 
      Con nosotros, obtenés un sitio profesional, adaptable a cualquier dispositivo, con funciones como agenda de citas, 
      contacto por WhatsApp, integración con mapas, chatbot, notificaciones por email y mucho más. 
      <br/><br/>
      Nuestra visión es acompañarte en la digitalización de tu inmobiliaria, para que vos te enfoques en lo que mejor sabés hacer: 
      conectar personas con el hogar de sus sueños.
    </p>
    
    </div>
    </div>

{/* SEGUNDA SECCIÓN: COMO FUNCIÓNA. */}
    {/* Título */}
    <h2 id="sección1" className=" w-full text-center text-xl text-white mt-8 mb-11  font-bold bg-[#833444] md:text-2xl lg:text-2xl">
    Tu pagína paso a paso
    </h2>
    <div className="flex flex-col m-6 lg:w-[1200px] gap-4 lg:flex-col">

    {/* Contenedor Step 1 y 2 */}
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-center">

      {/* Step 1 */}
      <div className="relative flex bg-white w-full max-w-md overflow-hidden shadow-lg shadow-black h-[120px] md:h-[150px] lg:h-[200px] md:max-w-xl lg:max-w-2xl">
        <div className="flex items-center justify-center w-12 bg-[#833444] text-white font-bold text-lg z-10 md:text-2xl lg:text-3xl">
          1
        </div>
        <div className="flex-1 p-4 flex flex-col justify-center z-10">
          <h2 className="text-xl font-bold uppercase text-black md:text-2xl lg:text-2xl">ingresá tus datos</h2>
          <p className="text-sm text-black md:text-xl lg:text-xl">
            Ingresa los datos de tu agencia para acceder a nuestro plan lo más antes posible.
          </p>
        </div>
        <div className="flex items-center justify-center p-2">
          <LogIn size={44} className="text-[#833444] md:size-15 lg:size-18" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="relative flex bg-white w-full max-w-md overflow-hidden shadow-lg shadow-black h-[120px] md:h-[150px] lg:h-[200px] md:max-w-xl lg:max-w-2xl">
        <div className="flex items-center justify-center w-12 bg-[#833444] text-white font-bold text-lg z-10 md:text-2xl lg:text-3xl">
          2
        </div>
        <div className="flex-1 p-4 flex flex-col justify-center z-10">
          <h2 className="text-xl font-bold uppercase text-black md:text-2xl lg:text-2xl">pagá nuestro plan</h2>
          <p className="text-sm text-black md:text-xl lg:text-xl">
            Paga un pequeño monto y accede nuestro plan para poder crear tu página web.
          </p>
        </div>
        <div className="flex items-center justify-center p-2">
          <HandCoins size={44} className="text-[#833444] md:size-15 lg:size-18" />
        </div>
      </div>

    </div>

    {/* Contenedor Step 3 y 4 */}
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-center">

      {/* Step 3 */}
      <div className="relative flex bg-white w-full max-w-md overflow-hidden shadow-lg shadow-black h-[120px] md:h-[150px] lg:h-[200px] md:max-w-xl lg:max-w-2xl">
        <div className="flex items-center justify-center w-12 bg-[#833444] text-white font-bold text-lg z-10 md:text-2xl lg:text-3xl">
          3
        </div>
        <div className="flex-1 p-4 flex flex-col justify-center z-10">
          <h2 className="text-xl font-bold uppercase text-black md:text-2xl lg:text-2xl">crea tu página</h2>
          <p className="text-sm text-black md:text-xl lg:text-xl">
            Diseñá tu propia página web inmobiliaria de forma fácil y rápida. Mostrá tus propiedades y destacá tu agencia como nunca antes.
          </p>
        </div>
        <div className="flex items-center justify-center p-2">
          <Monitor size={44} className="text-[#833444] md:size-15 lg:size-18" />
        </div>
      </div>

      {/* Step 4 */}
      <div className="relative flex bg-white w-full max-w-md overflow-hidden shadow-lg shadow-black h-[120px] md:h-[150px] lg:h-[200px] md:max-w-xl lg:max-w-2xl">
        <div className="flex items-center justify-center w-12 bg-[#833444] text-white font-bold text-lg z-10 md:text-2xl lg:text-3xl">
          4
        </div>
        <div className="flex-1 p-4 flex flex-col justify-center z-10">
          <h2 className="text-xl font-bold uppercase text-black md:text-2xl lg:text-2xl">compite con otras agencias</h2>
          <p className="text-sm text-black md:text-xl lg:text-xl">
            Subí en el ranking y ganá visibilidad según tus visitas y propiedades publicadas.
          </p>
        </div>
        <div className="flex items-center justify-center p-2">
          <TrendingUp size={44} className="text-[#833444] md:size-15 lg:size-18" />
        </div>
      </div>
    </div>


    </div>


{/* TERCER SECCIÓN: QUE OFRECEMOS. */}
    {/* Título */}
    <h2  id="sección2" className="w-full text-center text-xl text-white mt-11 mb-11  font-bold bg-[#833444] md:text-2xl lg:text-2xl">
        ¿Qué ofrecemos en KasApp?
    </h2>
    <div className="flex flex-col items-center mb-11 m-6 shadow-lg bg-white shadow-black justify-between lg:w-[1200px] gap-4 p-4 rounded-2xl">
      

      {/* Contenedor principal */}
      <div className="flex flex-col items-center gap-4 lg:flex-row bg-white lg:items-center md:justify-between lg:w-[1200px] lg:justify-evenly  ">

        {/* Imagen */}
        <div className=" w-full max-w-sm mb-8 lg:mb-5 shadow-lg  shadow-black lg:w-[1500px] rounded-xl">
          <Image 
            src="/agenteInmobiliario.png" // reemplazá por tu imagen o static path
            alt="Agente inmobiliario usando laptop"
            width={900}
            height={300}
            className=" object-cover shadow-lg lg:h-[390px] lg:w-[900px] rounded-xl"
          />
        </div>

        {/* Texto / info */}
        <div className="flex flex-col gap-4 w-full max-w-2xl bg-white  rounded ">
          
          <div>
            <h2 className="text-lg text-center text-white font-bold bg-[#833444] p-1 md:text-xl lg:text-2xl">
              Tu web inmobiliaria
            </h2>
            <p className="text-sm md:text-base mt-2 font-semibold text-center lg:text-xl text-black">
              Muchos agentes solo usan sus redes sociales para mostrar sus propiedades. 
              Con KasApp podés tener tu propia página web profesional.
            </p>
          </div>

        <div className="flex flex-row">

        
        <div className="flex flex-col m-2">

          <h2 className="text-lg text-center text-white font-bold bg-[#833444]  md:text-xl lg:text-2xl">
            Fácil de usar
          </h2>
          <p className="text-sm md:text-base mt-2 font-semibold lg:text-xl text-black ml-2">
            Elegís tus colores preferidos, ponés tu logo, cargás tus propiedades y listo.
            Todo desde un panel simple, podés cambiar lo que quieras en tu web cuando lo necesites.
          </p>
            </div>

          <div className="flex flex-col m-2">

          <h2 className="text-lg text-center text-white font-bold bg-[#833444] p-1 md:text-xl lg:text-2xl">
            Profesional
          </h2>
          <p className="text-sm md:text-base mt-2 font-semibold lg:text-xl text-black ml-2">
            Con KasApp, cualquier agente o inmobiliaria chica puede tener una web de calidad,
            igual que las grandes empresas. Rápido, ordenado y con toda tu info bien presentada.
          </p>
          </div>
            </div>
        </div>
      </div>
      
    </div>

{/* CUARTA SECCIÓN: PREGUNTAS FRECUENTES. */}
    {/* Título  */}
    <h2 id="sección3" className="w-full text-center text-xl text-white mt-11 mb-8 font-bold bg-[#833444] md:text-2xl lg:text-2xl">
      Preguntas Más Frecuentes
    </h2>
    {/* Contenedor FAQ */}
    <div className="flex flex-col items-center mb-11 m-6 shadow-lg bg-white shadow-black justify-between lg:w-[1200px] gap-4 p-4 rounded-2xl">

    <div className="flex flex-col w-full gap-4">
    <details className="bg-white rounded-lg p-4 border border-[#833444] shadow-md">
      <summary className="cursor-pointer font-semibold text-[#833444] md:text-xl lg:text-2xl">
        ¿Cómo registro mi inmobiliaria en la plataforma?
      </summary>
      <p className="mt-2 text-black text-sm md:text-base lg:text-xl">
        Debes hacer clic en “Registrarse” en la página principal y completar los datos de tu agencia. Luego recibirás un correo de confirmación para activar tu cuenta.
      </p>
    </details>

    <details className="bg-white rounded-lg p-4 border border-[#833444] shadow-md">
      <summary className="cursor-pointer font-semibold text-[#833444] md:text-xl lg:text-2xl">
        ¿Puedo cambiar los colores y el diseño de mi sitio?
      </summary>
      <p className="mt-2 text-black text-sm md:text-base lg:text-xl">
        ¡Claro! Desde tu dashboard personal podés modificar colores, título, descripción y otras opciones de personalización en cualquier momento.
      </p>
    </details>

    <details className="bg-white rounded-lg p-4 border border-[#833444] shadow-md">
      <summary className="cursor-pointer font-semibold text-[#833444] md:text-xl lg:text-2xl">
        ¿Cómo subo una propiedad?
      </summary>
      <p className="mt-2 text-black text-sm md:text-base lg:text-xl">
        Desde tu panel, accede a “Mis Propiedades” y elige la opción “Agregar nueva propiedad”. Allí podés subir fotos, descripción, precio, ubicación y más.
      </p>
    </details>

    <details className="bg-white rounded-lg p-4 border border-[#833444] shadow-md">
      <summary className="cursor-pointer font-semibold text-[#833444] md:text-xl lg:text-2xl">
        ¿Cómo recibo las solicitudes de cita?
      </summary>
      <p className="mt-2 text-black text-sm md:text-base lg:text-xl">
        Cuando un visitante solicita una cita, recibirás una notificación en el dashboard y un correo electrónico con los detalles. También podés ver el historial de citas en tu panel.
      </p>
    </details>

    <details className="bg-white rounded-lg p-4 border border-[#833444] shadow-md">
      <summary className="cursor-pointer font-semibold text-[#833444] md:text-xl lg:text-2xl">
        ¿Qué hago si tengo un problema técnico?
      </summary>
      <p className="mt-2 text-black text-sm md:text-base lg:text-xl">
        Puedes enviar un ticket de soporte desde tu dashboard o reportar el error directamente a los administradores. Nuestro equipo te responderá lo antes posible.
      </p>
    </details>
    
  </div>


      
    </div>
    <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 bg-[#833444] hover:bg-[#a94e5e] text-white font-bold py-3 px-4 rounded-full shadow-lg shadow-black transition duration-300 h-12 w-12 flex items-center justify-center cursor-pointer"
        aria-label="Volver arriba"
      >
        ↑
      </button>
</div>


)};

export default BodyLanding;