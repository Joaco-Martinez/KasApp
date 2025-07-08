import Carousel from "./components/carrusel";
import Carousel2 from "./components/carrusel2";
import Carousel3 from "./components/carrusel3";

export default function PaginaClientes() {
  return (
    <section className="py-16 px-6 md:px-16 w-full mx-auto flex flex-col items-center">
      <h2 className="text-[30px] font-bold mb-10  md:ml-[-30rem] md:text-[40px]">Explorá nuestros clientes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div
            className="font-medium flex items-center justify-center w-64 h-36 md:w-80 md:h-48 mx-auto"
          >
            <Carousel />
          </div>
          <div
            className="font-medium flex items-center justify-center w-64 h-36 md:w-80 md:h-48 mx-auto"
          >
            <Carousel2 />
          </div>
          <div
            className="font-medium flex items-center justify-center w-64 h-36 md:w-80 md:h-48 mx-auto"
          >
            <Carousel3 />
          </div>

      </div>
    </section>
  );
}