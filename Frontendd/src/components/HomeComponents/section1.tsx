import Image from 'next/image';

const Section1 = () => {
  return (
    <div className="bg-[#4A0E1B]">
      <div className="flex items-center justify-center">
        <section className="bg-[#4A0E1B] text-white py-16 px-6 md:px-16 w-full mx-auto flex flex-col md:flex-row items-center justify-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Llevamos tu <br /> inmobiliaria al <br /> siguiente nivel
            </h1>
            <p className="text-base md:text-lg text-gray-200">
              Creamos sitios web modernos y personalizados para potenciar tu presencia digital
            </p>
          </div>

          <div className="relative mt-12 md:mt-0 md:ml-10 flex items-end">
            {/* Desktop preview */}
            <div className="bg-[#FCEAE5] text-black w-[240px] h-[170px] md:w-[350px] md:h-[230px] rounded-xl shadow-lg flex items-center justify-center text-center border border-black">
              <Image src="/dreamhomes.png" alt="Logo" fill className="object-cover  rounded-xl shadow-lg flex items-center justify-center text-center border-2 border-black " />
            </div>

            {/* Mobile preview */}
            <div className="bg-[#FCEAE5] text-black md:w-[100px] md:h-[180px] w-[60px] h-[120px] rounded-xl shadow-lg flex items-center justify-center text-center border border-black absolute -right-8 -bottom-6">
              <Image src="/dreamhomemobile.png" alt="Logo" fill className="object-cover  rounded-xl shadow-lg flex items-center justify-center text-center border-2 border-black " />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Section1;
