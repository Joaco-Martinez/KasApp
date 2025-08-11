import { ReactNode } from "react";
import { AgencyProvider } from "../../../../context/agencyContext";

export default function AgenciaTemplate({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return <AgencyProvider slug={params.slug}>{children}</AgencyProvider>;
}