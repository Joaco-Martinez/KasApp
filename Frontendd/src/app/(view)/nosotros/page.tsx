
import React from "react";

const AboutUsPage = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 py-20 md:px-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#421424] mb-12 text-center">
          Sobre Nosotros
        </h1>

        <div className="space-y-10 md:space-y-16 text-lg md:text-xl leading-relaxed text-gray-800">
          <section className="bg-[#f9f6f7] p-6 md:p-8 rounded-2xl shadow-md border-l-8 border-[#a62f55]">
            <p className="text-justify">
              Somos un equipo de desarrolladores y expertos en tecnología enfocados en transformar el sector inmobiliario. Nuestra misión es brindarte una plataforma digital moderna, intuitiva y profesional, pensada exclusivamente para agentes inmobiliarios que buscan destacarse sin necesidad de conocimientos técnicos ni costosos desarrollos a medida.
            </p>
          </section>

          <section className="p-6 md:p-8 rounded-2xl bg-[#f1e7e9] shadow-sm border border-[#bd8b8e]">
            <p className="text-justify">
              Entendemos los desafíos que enfrentan los agentes hoy: la falta de un sitio web propio, el uso limitado de redes sociales y la necesidad de mostrar propiedades de manera clara y organizada. Por eso creamos una solución centralizada y escalable que te permite tener tu propio sitio web personalizado, con tu logo, tus colores, tus textos y tus propiedades, todo gestionado desde un panel de control fácil de usar.
            </p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-200">
            <p className="text-justify">
              Queremos que puedas competir en igualdad de condiciones con grandes empresas, sin perder tiempo ni recursos. Con nosotros, obtenés un sitio profesional, adaptable a cualquier dispositivo, con funciones como agenda de citas, contacto por WhatsApp, integración con mapas, chatbot, notificaciones por email y mucho más.
            </p>
          </section>

          <section className="text-center p-6 md:p-8 bg-[#a62f55] text-white rounded-2xl shadow-lg">
            <p className="text-xl md:text-2xl font-semibold text-justify">
              Nuestra visión es acompañarte en la digitalización de tu inmobiliaria, para que vos te enfoques en lo que mejor sabés hacer: conectar personas con el hogar de sus sueños.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;

