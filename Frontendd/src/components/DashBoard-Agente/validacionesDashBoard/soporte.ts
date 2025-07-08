import * as Yup from "yup";

export const reportarErrorSchema = Yup.object({
  emailAdmin: Yup.string()
    .email("Email inválido")
    .required("Requerido"),
  emailAgente: Yup.string()
    .email("Email inválido")
    .required("Requerido"),
  descripcion: Yup.string()
    .min(10, "Debe tener al menos 10 caracteres")
    .required("Requerido"),
});