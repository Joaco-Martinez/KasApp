"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {getAllAgencies} from "../../../../services/agenciaService";
import { IAgency } from "../../../../../interface/Agency";


export default  function TodasInmobiliarias() {
  const [inmobiliarias, setInmobiliarias] = useState<IAgency[]>([]);
  
  useEffect(() => {
  getAllAgencies()
    .then((data) => {
      setInmobiliarias(data); 
    })
    .catch(() => {
      setInmobiliarias([]);
    });
}, []);

  
  return (
    
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[rgb(66,20,36)]">
        Inmobiliarias registradas
      </h2>

      {inmobiliarias.length === 0 ? (
        <p className="text-gray-500">No hay inmobiliarias para gestionar.</p>
      ) : (
        <ul className="space-y-4">
          {inmobiliarias.map((inmo) => (
            <li
              key={inmo.id}
              className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
            >

              <div className="flex flex-col md:flex-row justify-between items-start w-full gap-2">

                <div>
                  <p className="font-semibold text-lg">{inmo.name}</p>
                  <p className="text-sm text-gray-600">{inmo.user.name} {inmo.user.surname}</p>
                </div>


                <div className="md:ml-auto md:text-end mt-2 md:mt-0">
                  <Link
                    href={`/agencia/${inmo.slug}`}
                    className="text-sm text-[rgb(66,20,36)] font-semibold hover:underline"
                  >
                    Ver en la web
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
