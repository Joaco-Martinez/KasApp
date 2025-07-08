"use client";

import React from "react";
import { useAgency } from "../../../context/agencyContext";

export default function FooterAgencia() {
  const { agencia, loading } = useAgency();

  if (loading || !agencia) return null;

  return (
    <footer className="border-t border-gray-300 py-2 text-center text-sm text-gray-600">
      <p>© {new Date().getFullYear()} {agencia.name}</p>
    </footer>
  );
}
