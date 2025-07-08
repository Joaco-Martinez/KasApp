import * as Yup from "yup";

// Validaciónes de Cambiar Contraseña

export const validationCambiarContraseña = Yup.object({
  currentPassword: Yup.string()
    .required("La contraseña actual es obligatoria")
    .max(20, "No puede tener más de 15 caracteres"),

  newPassword: Yup.string()
    .required("La nueva contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres")
    .max(15, "No puede tener más de 15 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.,])/,
      "Debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&)"
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden")
    .required("Debes confirmar tu nueva contraseña"),
});
