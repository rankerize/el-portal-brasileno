# Guía de Configuración: WordPress Headless para El Portal Brasileño

Esta guía detalla los pasos para configurar tu sitio de WordPress y exponer la estructura de datos que la interfaz de tu sitio web espera recibir a través de la API REST de WordPress.

---

## 1. Extensiones (Plugins) Recomendadas en WordPress

Para habilitar y personalizar la API de WordPress de forma óptima, te recomendamos instalar los siguientes plugins:
1. **Custom Post Type UI (CPT UI):** Para crear los tipos de contenido personalizados (`productos` y `sedes`).
2. **Advanced Custom Fields (ACF) - Versión gratuita o Pro:** Para agregar los campos personalizados necesarios (precios, horarios, ubicaciones, etc.).
3. **ACF to REST API:** Habilita automáticamente los campos personalizados de ACF para que se expongan en la respuesta de la API REST.

---

## 2. Estructura de Custom Post Types y Taxonomías

### A. Productos (Custom Post Type: `productos`)
Crea un nuevo CPT con el slug `productos`.
- **IMPORTANTE:** Asegúrate de activar la casilla **"Mostrar en REST API"** (Show in REST) en los ajustes del CPT para que WordPress exponga el endpoint `/wp-json/wp/v2/productos`.
- **Campos Personalizados (ACF):**
  - `categoria` (Tipo: Select/Texto). Opciones sugeridas:
    - `sandwiches`
    - `hamburguesas`
    - `perros`
    - `especiales`
    - `carnes-frias`
  - `precio` (Tipo: Número). Ej: `18500`.
  - `descripcion` (Tipo: Área de texto).
  - `imagen` (Tipo: URL o Imagen expuesta como URL).
  - `badge` (Tipo: Texto). Ej: `El más vendido`, `Premium`.
  - `healthy` (Tipo: Texto). Ej: `Bajo en sodio`, `Alto en proteína`.

### B. Sedes (Custom Post Type: `sedes`)
Crea un nuevo CPT con el slug `sedes`.
- **IMPORTANTE:** Asegúrate de activar la casilla **"Mostrar en REST API"**. Habilita el endpoint `/wp-json/wp/v2/sedes`.
- **Campos Personalizados (ACF):**
  - `direccion` (Tipo: Texto). Dirección completa.
  - `telefono` (Tipo: Texto). Ej: `305 9248921`.
  - `horarios` (Tipo: Área de texto). Escribe cada horario en una línea nueva.
  - `mapa_embed` (Tipo: Texto/URL). El enlace src del iframe de Google Maps.

### C. Promociones (Categoría de Entradas: `promociones`)
Para los banners de promociones como el futbolero, utilizaremos las entradas comunes (Posts) de WordPress bajo la categoría con el slug `promociones`.
- **Campos Personalizados (ACF asignados a posts):**
  - `badge` (Tipo: Texto). Ej: `Campaña Oficial`, `Promoción`.
  - `gradiente_fondo` (Tipo: Texto). Código de degradado CSS. Ej: `linear-gradient(135deg, #1F5F3E 0%, #113422 100%)`.

---

## 3. Vinculación del Frontend al Servidor WordPress

Una vez que tengas tu WordPress activo y configurado:
1. Abre el archivo [cms.js](file:///Users/cesarjimenezarcia/Documents/Clientes/Elportalbrasile%C3%B1o/cms.js) de la página web.
2. Localiza la línea donde se define `WP_API_URL` (línea 8):
   ```javascript
   WP_API_URL: '',
   ```
3. Modifícala con el enlace a tu API REST de WordPress. Ejemplo:
   ```javascript
   WP_API_URL: 'https://elportalbrasileno.com/wp-json',
   ```
4. ¡Listo! El sitio automáticamente intentará consultar tu servidor WordPress. Si en algún momento tu servidor WP se cae o el enlace no responde, el sitio utilizará instantáneamente los datos de respaldo cargados en `cms.js` para asegurar que el restaurante nunca deje de vender.
