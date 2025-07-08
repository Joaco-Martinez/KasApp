import apiService from "./apiService";

export const deleteAgency = async (id: number) => {
  try {
    const response = await apiService.del(`/agency/${id}`, true);
    return response;
  } catch (error) {
    console.error("Error al eliminar agencia:", error);
    return null;
  }
};

export const softDeleteAgency = async (id: number) => {
  try {
    const response = await apiService.del(`/agency/soft/${id}`, true);
    return response;
  } catch (error) {
    console.error("Error al suspender agencia:", error);
    return null;
  }
}

export const postMaillerAll = async (subject: string = "", text: string = "") => {
  try {
    const encodedSubject = encodeURIComponent(subject);
    const encodedText = encodeURIComponent(text);

    const response = await apiService.post(
      `/mailer/all/${encodedSubject}/${encodedText}`, true
    );

    return response;
  } catch (error) {
    console.error("Error al enviar el mail:", error);
    return null;
  }
};

export const getPagos = async () => {
  try {
    const response = await apiService.get(`/stripe`, true);
    return response;
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return null;
  }
};


export const getAgencySoftDeleted = async () => {
  try {
    const response = await apiService.get(`/agency/soft-removed`, true);
    return response;
  } catch (error) {
    console.error("Error al obtener agencias suspendidas:", error);
    return null;
  }
};


export const postFotoDePerfil = async (id: string, formData: FormData) => {
  try {
    const response = await apiService.post(`/images/profile/${id}`, formData, true);
    return response;
  } catch (error) {
    console.error("Error al subir la foto de perfil:", error);
    return null;
  }
};

export const getAdmin = async (id: string) => {
  try {
    const response = await apiService.get(`/user/${id}`, true);
    return response;
  } catch (error) {
    console.error("Error al obtener el admin:", error);
    return null;
  }
};