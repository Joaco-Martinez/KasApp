import apiService from "./apiService";
import { IEditarNombreYdescAgency } from "../../interface/DashboardAgente/EditarNombreYDescp";

export const editarAgencia = async ( data: IEditarNombreYdescAgency, id:string) => {
  try {
    const response = await apiService.patch(`/agency/update/${id}`, data, true);
    return response;
  } catch (error) {
    console.error("Ocurrió un error al Editar el titulo y descripcion:", error);
    throw error;
  }
};

