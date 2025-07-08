import apiService from "./apiService";

interface ICustomizationValues {
  information: string;
  mainColors: string;
  navbarColor: string;
  buttonColor: string;
  backgroundColor: string;
  secondaryColor: string;
  logoImage?: string;
  banner?: string;
}

export const cambiarColoresPost = async (id: string, data: ICustomizationValues) => {
  try {
    const response = await apiService.post(`/agencies/${id}/customization`, data, true);
    return response;
  } catch (error) {
    console.error("Error al cambiar los colores:", error);
    return null;
  }
};

export const cambiarColoresPatch = async (id: string, data: ICustomizationValues) => {
  try {
    const response = await apiService.patch(`/agencies/${id}/customization`, data, true);
    return response;
  } catch (error) {
    console.error("Error al cambiar los colores:", error);
    return null;
  }
};