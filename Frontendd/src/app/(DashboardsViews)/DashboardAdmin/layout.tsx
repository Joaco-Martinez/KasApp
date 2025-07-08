"use client";

import CeluSidebar from "@/components/Dashboard-Admin/LayoutDashboard/CeluSidebarDash";
import SidebarDashboard from "../../../components/Dashboard-Admin/LayoutDashboard/SideBarDash";

import { useAuthContext } from "../../../../context/authContext";
import Loader from "../../../components/Loader/Loader"

export default function LayoutSidebar({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuthContext()
  
     if (!user) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ); 
    }
  const User = user

  return (
    <>
      

      <div className="flex flex-col md:flex-row bg-[rgb(240,241,244)]">
        {/* Sidebar */}
        <div className="block md:hidden">
          <CeluSidebar
            name={User.name ?? ""}
            surname={User.surname ?? ""}
          />
        </div>
        <div className="hidden md:block">
          <SidebarDashboard
            name={User.name ?? ""}
            surname={User.surname ?? ""}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:ml-6 border-gray-300 border rounded-tr-none bg-white w-full md:w-auto rounded-lg mt-4 shadow-[4px_5px_8px_4px_rgba(0,0,0,0.4)]">
          {children }
        </main>
      </div>
    </>
  );
}
