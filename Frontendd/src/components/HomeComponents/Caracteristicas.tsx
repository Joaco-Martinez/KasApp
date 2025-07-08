import { FaHome, FaCalendarAlt, FaUser, FaSearch } from "react-icons/fa";

const features = [
  {
    icon: <FaHome size={32} />,
    title: "Gestión de propiedades",
  },
  {
    icon: <FaCalendarAlt size={32} />,
    title: "Agenda de turnos",
  },
  {
    icon: <FaUser size={32} />,
    title: "Panel para agentes",
  },
  {
    icon: <FaSearch size={32} />,
    title: "Buscador inteligente",
  },
];

export default function Features() {
  return (
    <section className=" py-10 px-6 md:px-16 w-full mx-auto flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold   md:ml-[-38rem]">Qué ofrecemos</h2>
       <p className="text-base md:text-lg text-black mb-10  md:ml-[-47rem]">
              Tu página a tu medida
            </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[#A62F55] text-white rounded-md w-16 h-16 flex items-center justify-center mb-3">
              {feature.icon}
            </div>
            <p className="font-semibold text-sm">{feature.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
