import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full bg-[#d6cfd1]  p-2 md:flex md:flex-row md:items-center md:justify-center">
  <ul className="flex flex-col flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:w-1/2 md:justify-center list-none m-0 p-0">
  
  <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:w-1/2 md:justify-center">
    <li>
      <Link
        href="/#secci n0"
        className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
        >
        Nosotros
      </Link>
    </li>
    <li>
      <Link
        href="/home"
        className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
        >
        Home
      </Link>
    </li>
    
    <li>
      <Link
        href="/contacto"
        className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
        >
        Contacto
      </Link>
    </li>
    <li>
      <Link
        href="/terminosYcondiciones"
        className="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
        >
        Términos y Condiciones
      </Link>
    </li>
          </div>
  </ul>
  </footer>
    )
}

export default Footer;