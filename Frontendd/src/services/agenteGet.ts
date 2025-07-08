import apiService from "./apiService";



export const getAgente = async (id:string) => {
  try {
    const response = await apiService.get(`/user/${id}`);
    return response;
  } catch (error) {
    console.error("Ocurrió un error al realizar el Register:", error);
    throw error;
  }
};

export const postNewsletter = async (email: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append("email", email);

    const response = await apiService.post('/schedule/subscribe', formData, true);
    return response;
  } catch (error) {
    console.error('Ocurrió un error al enviar el newsletter:', error);
    throw error;
  }
};