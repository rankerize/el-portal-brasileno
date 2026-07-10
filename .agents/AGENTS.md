# Reglas y Contexto del Negocio - El Portal Brasileño

Este archivo contiene las directrices, el contexto de negocio y las reglas de desarrollo específicas para el proyecto de **El Portal Brasileño**. El agente de IA (Antigravity) utilizará esta información para guiar todas las decisiones de diseño, contenido, desarrollo de software e interacción en este espacio de trabajo.

---

## 🥪 Información General del Negocio

- **Nombre:** El Portal Brasileño
- **Giro:** Restaurante de comida rápida premium y saludable.
- **Trayectoria:** Más de 5 años en el mercado ofreciendo productos saludables, de máxima calidad y a precios cómodos.
- **Especialidad/Diferenciador:** Jamones de muy alta calidad (artesanales, bajos en grasa y sodio, muy sabrosos), embutidos y carnes seleccionadas que permiten ofrecer opciones más saludables dentro de la comida rápida tradicional.
- **Línea adicional de negocio:** distribuidores autorizados de Brasilena, con respaldo de fábrica de carnes frías y portafolio para consumo inmediato y para llevar a casa.

### 📍 Ubicación y Contacto
- **Ciudad:** Bogotá, Colombia.
- **Sede 1 (Subazar):** Centro Comercial Subazar, Local 91-92 (Carrera 91 # 145-83, Suba, Bogotá, D.C.).
- **Sede 2 (Ciudad Montes):** Carrera 50 # 18-03 Sur, Ciudad Montes, Tercer Sector, Bogotá, D.C.
- **Teléfono/Contacto:** 305 9248921.
- **Horario de Atención:**
  - Martes a Jueves: 11:00 a.m. - 8:15 p.m.
  - Viernes y Sábado: 11:15 a.m. - 9:30 p.m.
  - Domingo: 9:00 a.m. - 5:45 p.m.
  - Lunes: Cerrado

---

## 🍔 Menú Real (verificado en Rappi, 2026-07-09)

**El fuerte del negocio son los sándwiches y las hamburguesas.** Los perros calientes, combos (con papa + gaseosa) y salchipapas son líneas complementarias. Ver detalle completo con precios en `agente.md`.

### 1. Sándwiches (fuerte)
6 variedades reales: Premium Brasileño, Del Huerto, Consentido, Cubano, Boyacense e Italiano — todos con jamones/embutidos seleccionados, quesos y pan variado (focaccia, baguette, pan sellado, almojabanado).

### 2. Hamburguesas (fuerte)
5 variedades en pan brioche con ajonjolí negro: Tradicional, Brasileña, Portal, Doble Carne, Clásica.

### 3. Perros Calientes
Brasileño, Americano, Boyacense, Callejero.

### 4. Combos y Acompañamientos
Combo Sandwich y Combo Hamburguesa (incluyen papa a la francesa + gaseosa), Salchipapa, Porción de Papa.

---

## 🎯 Pilares del Negocio a Comunicar en la Web/App

1. **Saludable y Fresco:** Resaltar que usamos ingredientes de alta calidad, lechugas sumamente frescas, tomates del día y procesos limpios con menor contenido graso.
2. **Precios Cómodos (Accesibilidad):** Gran relación calidad-precio. Comida deliciosa, abundante y premium al alcance de todos.
3. **Calidad Máxima en Carnes/Jamones:** Nuestro jamón es nuestro orgullo. Es de calidad superior, artesanal y con sabor inigualable.
4. **Sabor Auténtico:** La fusión de la comida rápida tradicional con toques de la gastronomía brasileña y local.
5. **Respaldo de Origen:** comunicar que el negocio está conectado con Brasilena como distribuidor autorizado, lo que refuerza confianza, trazabilidad y variedad de productos.

## 🧭 Contexto Actual del Proyecto

La estrategia digital en curso busca convertir la operación física y la base de marca en un sistema comercial más visible, medible y escalable.

- **Canales prioritarios:** Instagram, TikTok, Google, Google Maps, Rappi y sitio web.
- **Objetivo comercial:** atraer más clientes, aumentar pedidos por sede, aprovechar horas valle y reforzar ventas de producto para consumo en casa.
- **Capacidad operativa estimada:** alta rotación de producción y despacho diario, con capacidad para atender picos fuertes de demanda.
- **Horario comercial de oportunidad:** foco en franjas de 11:00 a.m. a 12:00 p.m. y de 5:00 p.m. a 8:00 p.m., además de campañas específicas en horas valle.

## 📣 Alcance de la Propuesta Comercial en Construcción

La propuesta que se está armando para el negocio incluye:

- **Redes sociales:** creación de piezas para pauta en Instagram y TikTok.
- **Gestión de pauta:** administración de campañas pagas y optimización continua.
- **Sitio web:** desarrollo de una web administrable en WordPress para publicar productos, promociones y contenido.
- **Infraestructura web:** hosting por 1 año y configuración base del sitio.
- **Funcionalidades web:** catálogo, carrito de compra, sincronización con bot y pasarela de pago.
- **SEO local:** optimización para Google Search, Google Maps y fichas de negocio por sede.
- **Marketplaces:** mejora de presencia y conversión dentro de Rappi.

## 💵 Referencia de Inversión en la Propuesta

- **Piezas + administración de pauta en Instagram y TikTok:** $3.000.000 COP.
- **Página web + hosting por 1 año:** $3.000.000 COP.
- **Administración de pauta:** servicio continuo con permanencia mínima por definir con el cliente.

---

## 💻 Directrices de Desarrollo y Diseño (Reglas para el Agente)

### Tecnologías Preferidas
- **Core:** HTML5, CSS3 moderno (Custom Properties, Flexbox, Grid), Javascript vanilla.
- **Frameworks (si se requiere complejidad):** Next.js o Vite (React).
- **Estilos:** Vanilla CSS con diseño visual de alto nivel (Glassmorphism, gradientes suaves, paletas HSL). Evitar Tailwind a menos que se solicite explícitamente.
- **SEO y Accesibilidad:** Semántica HTML estricta, meta etiquetas completas, optimización de rendimiento (Core Web Vitals).

### Estilo Visual e Identidad (Basado en el Logo — aprobado por el dueño)
- **Logo Oficial:** Dos contornos en línea (line-art) color amarillo/oro (`#F2B800`) que representan un pan de hamburguesa (superior con 6 semillas e inferior), la tipografía sans-serif bold en negro sólido que lee "EL PORTAL", con "BRASILEÑO" en verde bandera (`#008744`) centrado abajo flanqueado por barras de banderas tricolores (Rojo, Amarillo, Verde), y una onda de lechuga verde. Archivo fuente: `productos fotos/propuesta de logo.png`.
- **Paleta de Colores** (proporcionada en base al logo real):
  - **Color Principal (Amarillo/Oro):** `#F2B800` (pan de hamburguesa y semillas). Se usa en botones principales, bordes de elementos activos y decoración destacada.
  - **Color Secundario (Negro/Oscuro):** `#1E1E1E` (del texto principal "EL PORTAL"). Se usa para textos importantes y fondos de paneles oscuros (footer, etc.).
  - **Acento Verde (frescura):** `#008744` (del texto "BRASILEÑO" y lechuga). Se usa con moderación para tags saludables y acentos ecológicos/vegetales.
  - **Acento Rojo (atención):** `#E53935` (de las franjas de banderas). Se usa para resaltar precios y badges de prioridad.
  - **Fondo Neutral (limpio):** `#FFFFFF` / `#FAF9F6` (el fondo limpio del logotipo). Asegura que el sitio se vea ordenado, luminoso y con excelente legibilidad.
- **Tipografía:** Sans-serif moderna y legible (Outfit para títulos, Plus Jakarta Sans para cuerpo). Se prohíbe el uso de tipografía serif (Playfair Display).
- **Animaciones:** Transiciones suaves en hovers y micro-interacciones para dar vida a la interfaz.

### Tono de Voz en Contenido
- Cercano, familiar, apetitoso y confiable.
- Enfoque en resaltar el bienestar y el sabor de comer "rápido pero bien y saludable".
