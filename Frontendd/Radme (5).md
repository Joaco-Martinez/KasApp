# Gestión de Imágenes en la API

Este documento explica cómo interactuar con los endpoints de gestión de imágenes de la API. Utilizamos **Cloudinary** para el almacenamiento, y todas las subidas de imágenes requieren el envío de archivos como `multipart/form-data`.

---

## Cómo Enviar Imágenes desde el Frontend

Para subir cualquier imagen, tu frontend debe enviar una solicitud `POST` con el encabezado `Content-Type` establecido automáticamente por `FormData`. El archivo de imagen debe adjuntarse al campo del formulario llamado **`file`**.



LISTO MATI YA LO HICISTE 
### 1. Subir o Actualizar Foto de Perfil de Usuario

Utiliza este endpoint para actualizar la foto de perfil de un usuario existente.

* **URL:** `POST /images/profile/:userId`
* **Parámetros de URL:**
    * `userId` (UUID): El ID único del usuario cuya foto de perfil quieres actualizar.
* **Seguridad:**
    * **`AuthGuard`**: Requiere que el usuario esté **autenticado**.
    * **`IsOwnerOrAdminGuard`**: Asegura que el usuario autenticado sea el **dueño** del perfil (o un administrador) para cambiar la foto.
* **Cuerpo de la Solicitud (FormData):**
    * `file`: El archivo de imagen **(requerido)**.

---

### 2. Subir o Actualizar Logo de Personalización (Customization)

Este endpoint te permite subir o actualizar el logo de una entidad de personalización.

* **URL:** `POST /images/customization/:customizationId/logo`
* **Parámetros de URL:**
    * `customizationId` (UUID): El ID único de la personalización cuyo logo quieres actualizar.
* **Seguridad:**
    * **`AuthGuard`**: Requiere que el usuario esté **autenticado**.
    * **`CustomizationOwnershipGuard`**: Asegura que el usuario autenticado sea el **propietario** de la personalización (o un administrador) para cambiar el logo.
* **Cuerpo de la Solicitud (FormData):**
    * `file`: El archivo de imagen **(requerido)**.

---

### 3. Subir o Actualizar Banner de Personalización (Customization)

De manera similar al logo, este endpoint es para subir o actualizar el banner de una entidad de personalización.

* **URL:** `POST /images/customization/:customizationId/banner`
* **Parámetros de URL:**
    * `customizationId` (UUID): El ID único de la personalización cuyo banner quieres actualizar.
* **Seguridad:**
    * **`AuthGuard`**: Requiere que el usuario esté **autenticado**.
    * **`CustomizationOwnershipGuard`**: Asegura que el usuario autenticado sea el **propietario** de la personalización (o un administrador) para cambiar el banner.
* **Cuerpo de la Solicitud (FormData):**
    * `file`: El archivo de imagen **(requerido)**.

---

### 4. Eliminar Imagen de Galería de una Propiedad

Usa este endpoint para eliminar una imagen específica de la galería de una propiedad.

* **URL:** `DELETE /images/property/:propertyId/gallery/:imageId`
* **Parámetros de URL:**