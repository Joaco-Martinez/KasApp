import Section1 from '@/components/HomeComponents/section1';
import Caracteristicas from '@/components/HomeComponents/Caracteristicas';
import PaginaClientes from '@/components/HomeComponents/PaginasClientes';
import PlanPago from '@/components/HomeComponents/PlanPago';
export default function Home() {
  return (
      <div>
    <div>
      <Section1 />
    </div>
    {/* Joaco cambié el color del fondo del home, a uno mas rosa como la Landin para tener coherencia */}
    {/* sola cambie el hexadecimal "#", si no te gusta y lo queres dejar 
    como estaba solo cambiá el: "#F8E2E1" por "#E2D2D2"  */}
      <div className='bg-gradient-to-b from-[#F8E2E1] to-white'>
      <Caracteristicas />
      <PaginaClientes />
      </div>
      <PlanPago />
    </div>
);
}