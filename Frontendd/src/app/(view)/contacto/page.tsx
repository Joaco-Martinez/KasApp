import Image from 'next/image';
import ContactForm from '../../../components/FormContacto/FormContacto';
export default function Contacto() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-4">Contáctanos</h2>
        <p className="text-lg mb-6">
          Si tienes alguna pregunta o necesitas ayuda, no dudes en
          comunicarte con nosotros.
        </p>
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-1">
            <p className="text-lg mb-2">
              Teléfono: <span className="font-bold">+54 11 1234 5678</span>
            </p>
            <p className="text-lg mb-2">
              Email: <span className="font-bold">kasapproyecto@gmail.com</span>
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-6">
            <Image
              src="/iconoKasapp.png"
              alt="Imagen de Kasapp"
              width={150}
              height={150}
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
