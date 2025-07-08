/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { UserIcon, IdCardIcon, HomeIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { useAuthContext } from "../../../../context/authContext";
import { RegisterSubmit, RegisterSubmitGoogle } from "@/services/authService";

const GoogleRegisterButton = dynamic(
  () => import("../../../components/FormRegister/googleButton"),
  { ssr: false }
);

interface RegisterUserDtoFront {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  document: string;
  agencyName: string;
  agencyDescription: string;
  slug: string;
  googleId: string;
  token?: string;
  [key: string]: any;
}

interface GoogleUserData {
  googleId: string;
  name: string;
  surname: string;
  email: string;
  token: string;
}

const steps = [
  { label: "Datos", icon: UserIcon },
  { label: "Documento", icon: IdCardIcon },
  { label: "Agencia", icon: HomeIcon },
];

const StepProgressBar: React.FC<{ step: number }> = ({ step }) => (
  <div className="flex justify-center mb-8">
    <div className="flex items-center gap-4">
      {steps.map((item, index) => {
        const isActive = step === index + 1;
        const isCompleted = step > index + 1;
        const Icon = item.icon;

        return (
          <React.Fragment key={item.label}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                  ${isActive ? "bg-[#f1efef] border-[#b3232f] text-[#b3232f]" : ""}
                  ${isCompleted ? "bg-green-100 border-green-600 text-green-600" : ""}
                  ${!isActive && !isCompleted ? "bg-white border-gray-300 text-gray-400" : ""}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-2 text-sm
                  ${isActive ? "text-[#b3232f] font-medium" : ""}
                  ${isCompleted ? "text-green-600" : ""}
                  ${!isActive && !isCompleted ? "text-gray-400" : ""}`}
              >
                {item.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-px border-t-2 border-dashed border-gray-300" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

const AutoFillForm: React.FC<{ googleData: GoogleUserData | null }> = ({ googleData }) => {
  const { setValues } = useFormikContext<RegisterUserDtoFront>();


  useEffect(() => {
    if (googleData) {
      setValues((prev) => ({
        ...prev,
        name: googleData.name,
        surname: googleData.surname,
        email: googleData.email,
        googleId: googleData.googleId,
      }));
    }
  }, [googleData, setValues]);

  return null;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  surname: Yup.string().required("Apellido requerido"),
  email: Yup.string().email("Email inválido").required("Email requerido"),
  password: Yup.string().when("googleId", {
    is: (val: string) => !val,
    then: (schema) => schema.required("Contraseña requerida"),
    otherwise: (schema) => schema,
  }),
  phone: Yup.string()
    .matches(/^\d+$/, "Teléfono debe ser numérico")
    .required("Teléfono requerido"),
  document: Yup.string()
    .matches(/^\d+$/, "Documento debe ser numérico")
    .required("Documento requerido"),
  agencyName: Yup.string().required("Nombre requerido"),
  agencyDescription: Yup.string().required("Descripción requerida"),
  slug: Yup.string().required("Slug requerido"),
});

const FormRegister: React.FC = () => {
  const [step, setStep] = useState(1);
  const [googleData, setGoogleData] = useState<GoogleUserData | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formikHelpers, setFormikHelpers] = useState<{
    values: RegisterUserDtoFront;
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean
    ) => void;
  } | null>(null);

  const router = useRouter();
  const { SaveUserData } = useAuthContext();

  // Validar campos por paso
  const validateStepFields = (
    step: number,
    values: RegisterUserDtoFront,
    errors: Record<string, string>
  ) => {
    const stepFields: Record<number, string[]> = {
      1: ["name", "surname", "email", ...(googleData ? [] : ["password"])],
      2: ["phone", "document"],
      3: ["agencyName", "agencyDescription", "slug"],
    };
    for (const field of stepFields[step]) {
      if (errors[field]) return false;
      if (values[field] === undefined || values[field] === null || values[field] === "") return false;
    }
    return true;
  };

  // Cargar datos de Google y setear
  const handleFillUpForm = (data: Partial<GoogleUserData> & { sub?: string; id?: string }) => {
    const fullName = data.name || "";
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    const userData: GoogleUserData = {
      googleId: data.sub || data.id || "",
      name: firstName || "",
      surname: lastName || "",
      email: data.email || "",
      token: data.token || "",
    };

    setGoogleData(userData);
    setStep(2)
    toast.success("Sesion iniciada con Google. Por favor, completa los campos restantes." );
  };

  const handleSubmit = async (values: RegisterUserDtoFront) => {
    try {
      const finalPassword = googleData ? null : values.password;

      const submitData = googleData
        ? { ...values, password: finalPassword, googleId: googleData.googleId, token: googleData.token }
        : values;

      if (googleData && submitData.token) {
        const response = await RegisterSubmitGoogle(submitData, SaveUserData);
        if (response) {
          setTimeout(() => {
            router.push("/stripe");
          }, 2000);
        }
      } else {
        const response = await RegisterSubmit(submitData, SaveUserData);
        if (response) {
          setTimeout(() => {
            router.push("/stripe");
          }, 2000);
        } 
      }
    } catch (error) {
      console.log("mensaje de error catch: ", error);
      toast.error("Hubo un problema al querer registrarse.", {
        duration: 2000,
      });
    }
  };


  useEffect(() => {
    if (formikHelpers && formikHelpers.values.agencyName && step === 3) {
      const slug = formikHelpers.values.agencyName
        .toLowerCase()
        .trim()
        .replace(/\d+/g, "") 
        .replace(/\s+/g, "-") 
        .replace(/[^a-z\-]/g, "") 
        .replace(/\-+/g, "-") 
        .replace(/^-+|-+$/g, ""); 
      formikHelpers.setFieldValue("slug", slug);
    }
  }, [formikHelpers, formikHelpers?.values.agencyName, step]);

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: "",
        document: "",
        agencyName: "",
        agencyDescription: "",
        slug: "",
        googleId: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
        validateForm,
      }) => {
        useEffect(() => {
          setFormikHelpers({ values, setFieldValue });
        }, [values, setFieldValue]);

        

        return (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center bg-white text-black border border-gray-300 p-8 rounded-md w-[600px] min-h-[700px] max-w-2xl mx-auto relative"
          >
            <Image
              src="/iconoKasapp.png"
              alt="Logo"
              width={120}
              height={120}
              className="mb-4"
            />
            <StepProgressBar step={step} />
            <AutoFillForm googleData={googleData} />

            {step === 1 && (
              <div className="w-full flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Nombre</label>
                    <input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={!!googleData}
                      className={`w-full border rounded p-2 ${
                        googleData ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Apellido</label>
                    <input
                      name="surname"
                      value={values.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={!!googleData}
                      className={`w-full border rounded p-2 ${
                        googleData ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                    {touched.surname && errors.surname && (
                      <p className="text-red-500 text-sm">{errors.surname}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly={!!googleData}
                    className={`w-full border rounded p-2 ${
                      googleData ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
  <label className="block mb-1 font-semibold">
    Contraseña {googleData ? "" : <span className="text-red-500">*</span>}
  </label>

  {googleData ? (
    <p className="text-sm text-gray-500">No requerida al iniciar con Google</p>
  ) : (
    <div className="relative">
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border rounded p-2 pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-2 flex items-center text-gray-600"
        tabIndex={-1}
      >
        {showPassword ? <Eye size={20} className="cursor-pointer"/> : <EyeOff size={20} className="cursor-pointer" />}
      </button>
      {touched.password && errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
      )}
    </div>
  )}
</div>
                <div className="flex flex-col items-center mt-4">
                  <p className="mb-2">O registrate con Google:</p>
                  <GoogleRegisterButton fillUpForm={handleFillUpForm} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold">Teléfono</label>
                  <input
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded p-2"
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Documento</label>
                  <input
                    type="text"
                    name="document"
                    value={values.document}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded p-2"
                  />
                  {touched.document && errors.document && (
                    <p className="text-red-500 text-sm">{errors.document}</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold">Nombre Agencia</label>
                  <input
                    type="text"
                    name="agencyName"
                    value={values.agencyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded p-2"
                  />
                  {touched.agencyName && errors.agencyName && (
                    <p className="text-red-500 text-sm">{errors.agencyName}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Descripción Agencia</label>
                  <input
                    type="text"
                    name="agencyDescription"
                    value={values.agencyDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded p-2"
                  />
                  {touched.agencyDescription && errors.agencyDescription && (
                    <p className="text-red-500 text-sm">{errors.agencyDescription}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 font-semibold">URL (slug)</label>
                  <input
                    type="text"
                    name="slug"

                    value={`kasapp.sytes.net/agencia/${values.slug}`}
                    readOnly
                    className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between w-full absolute bottom-10 left-0 px-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Volver
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={async () => {
                    const formErrors = await validateForm();
                    if (validateStepFields(step, values, formErrors)) {
                      setStep((prev) => prev + 1);
                    } else {
                      toast.error("Por favor, completá correctamente los campos antes de continuar.");
                    }
                  }}
                  className="ml-auto px-4 py-2 bg-[#A62F55] text-white rounded hover:bg-[#922749] cursor-pointer"
                >
                  Siguiente
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`ml-auto px-4 py-2 text-white rounded transition-colors duration-200 ${
                  isSubmitting
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                  }`} >
                  {isSubmitting ? "Creando..." : "Crear cuenta"}
                  </button>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormRegister;
