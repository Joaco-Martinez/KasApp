import apiService from "./apiService";


export const getAllAgencies = async () => {
  try {
    const response = await apiService.get("/agency", true );
    return response;
  } catch (error) {
    console.error("Error al obtener agencias:", error);
    return null;
  }
};


export const getAgencyBySlug = async (slug: string) => {
  try {
    const response = await apiService.get(`/agency/by-slug/${slug}`, true);
    return response;
  } catch (error) {
    console.error("Error al obtener la agencia por slug:", error);
    return null;
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const response = await apiService.get(`/property/${id}`, true);
    return response;
  } catch (error) {
    console.error("Error al obtener la agencia por ID:", error);
    return null;
  }
};


export const getByUserAgencia = async (id:string) => {
  try {

    const response = await apiService.get(`/agency/getByUser/${id}`, true);
    return response;
  } catch (error) {
    console.error("Error al obtener la agencia by el id de user", error);
    return null
  }
} 