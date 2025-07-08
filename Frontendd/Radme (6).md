# 📸 Guía para Subir Múltiples Imágenes de Propiedades

Este `README` te explica cómo tu aplicación frontend debe interactuar con el endpoint de tu API de NestJS para subir varias imágenes a la galería de una propiedad. ¡Vamos a darle un toque profesional a esas galerías!

---

## 1. El Endpoint de Backend: Tu Destino para las Imágenes

Tu API está lista para recibir un conjunto de imágenes para la galería de una propiedad específica.

* **Método HTTP:** `POST`
* **URL:** `/images/property/:propertyId/gallery`
    * **¡Importante!** Recordá reemplazar `:propertyId` con el **ID real** de la propiedad a la que querés adjuntar las imágenes. Por ejemplo: `https://tu-api.com/images/property/a1b2c3d4-e5f6-7890-1234-567890abcdef/gallery`.
* **Tipo de Contenido:** `multipart/form-data`
    * Este formato es clave, ya que es el estándar para enviar archivos a través de peticiones HTTP.
* **Campo Esperado por el Backend:** Tu servidor espera los archivos de imagen bajo un único nombre de campo: **`files`**.

---

## 2. Preparación en el Frontend: Tu Selector de Archivos (HTML)

Para que tus usuarios puedan seleccionar varias imágenes a la vez, tu elemento `<input type="file">` en HTML necesita el atributo `multiple`. Además, para una mejor experiencia, podés usar `accept="image/*"` para sugerir la selección de archivos de imagen.

```html
<input type="file" id="galleryFilesInput" multiple accept="image/*">