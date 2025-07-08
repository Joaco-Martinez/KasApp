import * as Yup from 'yup';

const registerValidations = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no debe superar los 50 caracteres'),
    
    surname: Yup.string()
        .required('El apellido es obligatorio')
        .min(2, 'El apellido debe tener al menos 2 caracteres')
        .max(50, 'El apellido no debe superar los 50 caracteres'),
    
    phone: Yup.number()
        .typeError('El teléfono debe ser un número')
        .required('El teléfono es obligatorio'),
    
    email: Yup.string()
        .required('El correo es obligatorio')
        .email('Debe ser un correo válido'),
    
    password: Yup.string()
        .when('googleId', {
            is: (googleId: string) => !googleId, // Si no hay googleId
            then: (schema) => schema
                .required('La contraseña es obligatoria')
                .min(8, 'La contraseña debe tener al menos 8 caracteres')
                .max(100, 'La contraseña no debe superar los 100 caracteres')
                .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
                .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
                .matches(/\d/, 'La contraseña debe tener al menos un número')
                .matches(/[@$!%*?&#]/, 'La contraseña debe tener al menos un carácter especial'),
            otherwise: (schema) => schema.notRequired()
        }),
    
    document: Yup.string()
        .matches(/^[0-9]+$/, 'El documento debe contener solo números'),
    
    agencyName: Yup.string()
        .required('El nombre de la agencia es obligatorio')
        .min(2, 'El nombre de la agencia debe tener al menos 2 caracteres')
        .max(50, 'El nombre de la agencia no debe superar los 50 caracteres'),
    
    agencyDescription: Yup.string()
        .required('La descripción de la agencia es obligatoria')
        .min(2, 'La descripción de la agencia debe tener al menos 2 caracteres')
        .max(100, 'La descripción de la agencia no debe superar los 100 caracteres'),
    
    slug: Yup.string()
        .required('La url de la agencia es obligatorio')
        .min(2, 'La url de la agencia debe tener al menos 2 caracteres')
        .max(50, 'La url de la agencia no debe superar los 50 caracteres'),

    googleId: Yup.string().nullable()
});

export default registerValidations;