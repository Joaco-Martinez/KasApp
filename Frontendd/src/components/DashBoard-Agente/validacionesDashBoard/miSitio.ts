import * as Yup from "yup";

// Validación para hex color:
// export const colorValidation = /^#([0-9A-F]{3}){1,2}$/i;

export const colorValidation = /^(#(?:[0-9a-fA-F]{3,8})|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|0?\.\d+|1(\.0)?)\s*\))$/;

export const colorValidationSchema = Yup.object().shape({
  information: Yup.string()
    .required("La información es obligatoria")
    .min(5, "Mínimo 5 caracteres"),

  mainColors: Yup.string()
    .required("El color principal es obligatorio")
    .matches(colorValidation, "Color inválido"),

  navbarColor: Yup.string()
    .required("El color de navbar es obligatorio")
    .matches(colorValidation, "Color inválido"),

  buttonColor: Yup.string()
    .required("El color de botón es obligatorio")
    .matches(colorValidation, "Color inválido"),

  backgroundColor: Yup.string()
    .required("El color de fondo es obligatorio")
    .matches(colorValidation, "Color inválido"),

  secondaryColor: Yup.string()
    .required("El color secundario es obligatorio")
    .matches(colorValidation, "Color inválido"),
});



// Validacion Editar titulo y descipción:
// Validación Editar título y descripción:

export const tituloValidations = Yup.object().shape({
  name: Yup.string()
    .trim("No puede tener espacios al inicio o final")
    .required("El título es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres")
    .max(60, "No debe superar los 60 caracteres")
    .matches(
      /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]*$/,
      "Solo se permiten letras, números y puntuación básica"
    ),

  description: Yup.string()
    .trim("No puede tener espacios al inicio o final")
    .required("La descripción es obligatoria")
    .min(10, "Debe tener al menos 10 caracteres")
    .max(300, "No debe superar los 300 caracteres")
    .matches(
      /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,-]*$/,
      "Solo se permiten letras, números y puntuación básica"
    ),
});
