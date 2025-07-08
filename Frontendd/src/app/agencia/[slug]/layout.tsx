// app/agencia/[slug]/layout.tsx
import { AgencyProvider } from "../../../../context/agencyContext";
import { ReactNode } from "react";
import NavbarAgente from "@/components/AgenciaComponents/NavbarAgente";
import FooterAgencia from "@/components/AgenciaComponents/FooterAgencia";


export  function generateMetadata({ params }: { params: { slug: string } }) {

   try {
        function slugToTitle(slug: string): string {
  return slug
    .split("-")              
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(" ");               
}
    const agency = slugToTitle(params.slug);
    return {
      title: `${agency} - KassApp`,
      description: "Página oficial de la agencia inmobiliaria",
      icons: `/iconoKasapp.png`,
    };
  } catch (error) {
    console.error("Error en generateMetadata:", error);
    return {
      title: "KassApp",
      description: "Página oficial de la agencia inmobiliaria",
    };
  }
}

export default function AgenciaLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return (
    <AgencyProvider slug={params.slug}>
      <div className="min-h-screen flex flex-col">
        <NavbarAgente />
        <main className="flex-grow bg-white">{children}</main>
        <FooterAgencia />
      </div>
    </AgencyProvider>
  );
}
