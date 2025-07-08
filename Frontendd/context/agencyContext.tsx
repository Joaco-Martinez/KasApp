// context/AgencyContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAgencyBySlug } from "@/services/agenciaService";
import { IAgency } from "../interface/Agency";

interface AgencyContextType {
  agencia: IAgency | null;
  loading: boolean;
}

const AgencyContext = createContext<AgencyContextType>({
  agencia: null,
  loading: true,
});

export const useAgency = () => useContext(AgencyContext);

export const AgencyProvider = ({ children, slug }: { children: React.ReactNode; slug: string }) => {
  const [agencia, setAgencia] = useState<IAgency | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const data = await getAgencyBySlug(slug);
        setAgencia(data);
      } catch (e) {
        console.error("Error en AgencyContext:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAgency();
  }, [slug]);

  return (
    <AgencyContext.Provider value={{ agencia, loading }}>
      {children}
    </AgencyContext.Provider>
  );
};
