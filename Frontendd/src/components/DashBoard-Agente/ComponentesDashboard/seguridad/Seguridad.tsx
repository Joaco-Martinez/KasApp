"use client";

export default function Seguridad() {
  const secciones = [
    {
      id: "contraseña",
      titulo: "1. No compartas tu contraseña",
      texto:
        "Tu cuenta tiene permisos importantes: podés modificar tus propiedades, ver tus datos de facturación, editar tu inmobiliaria o gestionar tu plan de suscripción. Compartir tu contraseña pone en riesgo toda esa información. En caso de necesitar colaboración, contactanos para una solución segura.",
    },
    {
      id: "verifica-correo",
      titulo: "2. Verificá siempre el remitente del correo",
      texto:
        "Si recibís correos sobre cambios de plan, facturación, propiedades marcadas como vendidas o enlaces de soporte, asegurate de que provienen de una dirección oficial de nuestra plataforma. Nunca ingreses tus credenciales desde links sospechosos.",
    },
    {
      id: "cerrar-sesion",
      titulo: "3. Cerrá sesión si usás una computadora compartida",
      texto:
        "Si iniciás sesión en una computadora pública (por ejemplo, en una inmobiliaria con varios agentes), asegurate de cerrar sesión al terminar. Recordá que tu sesión da acceso completo a tu dashboard, donde podés eliminar propiedades o editar tu página web.",
    },
    {
      id: "2fa",
      titulo: "4. Activá la autenticación en dos pasos (2FA)",
      texto:
        "Si habilitás la verificación en dos pasos desde tu perfil, cada vez que inicies sesión necesitás confirmar tu identidad también por correo o código SMS. Esto es vital si gestionás muchas propiedades o trabajás con datos sensibles de clientes interesados.",
    },
    {
      id: "reporte-problemas",
      titulo: "5. Usá el canal oficial para reportar problemas",
      texto:
        "Si algo no funciona correctamente (por ejemplo, no podés subir una propiedad, editar tu inmobiliaria o ver tus datos de pago), usá el formulario de contacto para enviar un ticket. No compartas información crítica por redes sociales ni terceros.",
    },
    {
      id: "rol-responsabilidad",
      titulo: "6. Recordá que sos responsable de tu cuenta",
      texto:
        "Como agente, tus acciones afectan directamente a tu inmobiliaria: podés marcar propiedades como vendidas, agregar redes sociales, cambiar el diseño de tu sitio o renovar planes. Por eso es fundamental que mantengas tus datos y accesos protegidos en todo momento.",
    },
  ];

  const backgrounds = [
    "bg-blue-50",
    "bg-indigo-50",
    "bg-violet-50",
    "bg-purple-50",
    "bg-fuchsia-50",
    "bg-rose-50",
  ];

  return (
    <section className="flex flex-col items-center w-full max-w-3xl m-auto justify-start px-4 py-8 md:px-7">
      <div className="w-full bg-white border border-gray-300 rounded-lg p-9 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Seguridad para agentes inmobiliarios
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Como agente inmobiliario, tenés acceso a funcionalidades clave como subir propiedades, editar tu sitio, ver información de facturación, enviar mensajes, etc. Para proteger tu cuenta y la información de tus clientes, seguí estas recomendaciones de seguridad digital dentro de la plataforma.
        </p>

        <div className="flex flex-col w-full space-y-6">
          {secciones.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              className={`${backgrounds[index % backgrounds.length]} border border-gray-300 rounded-lg p-5 transition-all duration-300 transform hover:shadow-lg hover:scale-[1.02]`}
            >
              <h2 className="text-xl font-semibold text-blue-800">
                {item.titulo}
              </h2>
              <p className="text-lg text-gray-700 mt-2">{item.texto}</p>
              <a
                href={`#${item.id}`}
                className="text-base text-blue-600 hover:underline mt-3 inline-block"
              >
                Ir a esta sección
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
