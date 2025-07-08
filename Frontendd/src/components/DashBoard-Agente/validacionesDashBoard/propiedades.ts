import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .required('Campo obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(80, 'El nombre no puede superar los 80 caracteres'),



  type: Yup.string()
    .oneOf(['Alquiler', 'Venta'], 'Tipo inválido')
    .required('Campo obligatorio'),

  type_of_property_id: Yup.string()
    .uuid('ID de tipo de propiedad inválido')
    .required('Tipo de propiedad obligatorio'),

  city: Yup.string()
    .required('Campo obligatorio')
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad no puede superar los 50 caracteres'),

  address: Yup.string()
    .required('Campo obligatorio')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección no puede superar los 100 caracteres'),

  price: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser positivo')
    .required('Campo obligatorio'),

  m2: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser positivo')
    .required('Campo obligatorio'),

  bathrooms: Yup.number()
    .typeError('Debe ser un número')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo')
    .required('Campo obligatorio'),

  rooms: Yup.number()
    .typeError('Debe ser un número')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo')
    .required('Campo obligatorio'),

  description: Yup.string()
    .required('Campo obligatorio')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede superar los 500 caracteres'),

  id_images: Yup.array().of(
    Yup.mixed().test(
      'file-or-url',
      'Cada imagen debe ser un archivo válido o una URL válida',
      (value) =>
        value instanceof File ||
        (typeof value === 'string' && /^https?:\/\/.+/.test(value))
    )
  )
});


export const validationEditarPropiedad = Yup.object({
  name: Yup.string()
    .required('Campo obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(80, 'El nombre no puede superar los 80 caracteres'),

  status: Yup.string()
  .oneOf(['Disponible', 'Vendido'], 'Estado inválido') ,// ✅ BIEN

    type: Yup.string()
  .oneOf(['Alquiler', 'Venta'], 'Tipo inválido') ,// ✅ BIEN

  type_of_property_id: Yup.string()
    .uuid('ID de tipo de propiedad inválido')
    .required('Tipo de propiedad obligatorio'),

  city: Yup.string()
    .required('Campo obligatorio')
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad no puede superar los 50 caracteres'),

  address: Yup.string()
    .required('Campo obligatorio')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección no puede superar los 100 caracteres'),

  price: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser positivo')
    .required('Campo obligatorio'),

  m2: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser positivo')
    .required('Campo obligatorio'),

  bathrooms: Yup.number()
    .typeError('Debe ser un número')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo')
    .required('Campo obligatorio'),

  rooms: Yup.number()
    .typeError('Debe ser un número')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo')
    .required('Campo obligatorio'),

  description: Yup.string()
    .required('Campo obligatorio')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede superar los 500 caracteres'),

  // id_images: Yup.array().of(
  //   Yup.mixed().test(
  //     'file-or-url',
  //     'Cada imagen debe ser un archivo válido o una URL válida',
  //     (value) =>
  //       value instanceof File ||
  //       (typeof value === 'string' && /^https?:\/\/.+/.test(value))
// )
//   )
});


