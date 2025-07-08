import apiService from "./apiService";
import { IPropertyForm } from "../../interface/DashboardAgente/subirPropiedadDTO";


export const CreateProperty = async (data: IPropertyForm) => {
  try {
    const response = await apiService.post('/property', data, true);
    return response;
  } catch (error) {
    console.error('Ocurrió un error al Crear la Propiedad:', error);
    throw error;
  }
};

