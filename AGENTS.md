# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Repository state

This is a static website — no build system, package manager, linter, or test suite. It's plain HTML/CSS/JS served as-is (open `index.html` directly or serve the folder statically; no install/build step exists or is needed). There's a `.vercel/` folder and `.env.local`, so it may also be deployed via Vercel — check those before assuming zero infra.

- `index.html` — single-page site (top promo bar, header/nav, video hero, features, football/combos promo banner, menu, about, recipes, location for both sedes, footer, cart drawer, product modal).
- `style.css` — all styling via CSS custom properties (`:root` variables). Variables were renamed during the 2026-07-09 rebrand but kept as aliases for compatibility (e.g. `--color-primary: var(--color-sage)`, `--color-gold: var(--color-beige)`, `--color-green: var(--color-green-deep)`) — prefer the new semantic names (`--color-sage`, `--color-beige`, `--color-green-deep`) in new code, but old names still resolve correctly. No preprocessor, no Tailwind. Dark mode was removed (theme is now forced light).
- `app.js` — vanilla JS: hardcoded `products` array (menu data lives in code, not a CMS/API) with categories `sandwiches`, `hamburguesas`, `perros`, `combos`, `especiales`, `carnes-frias`; cart state persisted to `localStorage` (`portal_cart`); WhatsApp checkout (builds a message and opens `wa.me/<phone>?text=...`).
- `.agents/AGENTS.md` — business rules and brand guidelines (authoritative source for business facts; keep in sync with `agente.md`, which duplicates similar content with additional menu/pricing detail — when updating one, check the other). This root-level `AGENTS.md` mirrors `CLAUDE.md`'s content for Codex — keep both in sync when editing.
- `agente.md` — extended business/menu reference (full menu with real prices in COP, verified against Rappi); largely overlaps `.agents/AGENTS.md` but has more product detail.
- `propuesta-comercial.md` / `propuesta/` — commercial proposal being built for the client (marketing/ads/web scope and pricing) — not site content, don't treat as product copy source.
- `productos fotos/` — real product photos (`.webp`) used as image sources in `index.html`/`app.js`, plus `propuesta de logo.png` (source file for the current official logo — sample colors from this file directly rather than guessing hex values), `logo-nuevo.png`/`logo-nuevo-crop.png`, and the generated recipe images used in the recipes section.
- `la-brasilena/` — product photos for the "Carnes Frías La Brasileña" cold-cuts/deli line (jamones, embutidos, especialidades, variedades) sold as a secondary product line (distributor tie-in), rendered under the `carnes-frias` menu category.
- `Fotos producidas/` — produced hero video/poster assets (`video hero.mp4` + `magnific_*.png` posters) used as the hero section background.
- Vercel deployment — production alias is `https://el-portal-brasileno.vercel.app`; the latest deploy is the source of truth for the public site.

There's no dev server config, so "running" this project just means opening `index.html` in a browser or serving the directory with any static file server.

## Business context

**El Portal Brasileño** — restaurante de comida rápida premium y saludable, Bogotá, 5+ años en el mercado. Diferenciador: jamones artesanales bajos en grasa/sodio, embutidos y carnes seleccionadas. También distribuidor autorizado de La Brasileña (carnes frías/embutidos) como línea de negocio adicional.

**Sedes:**
- Subazar: Centro Comercial Subazar, Local 91-92, Carrera 91 # 145-83, Suba.
- Ciudad Montes: Carrera 50 # 18-03 Sur, Ciudad Montes, Tercer Sector.

**El fuerte del negocio son los sándwiches y las hamburguesas** (confirmado por el cliente). Menú real verificado contra la ficha de Rappi del negocio (no inventar productos/precios — confirmar ahí o con el cliente ante cualquier duda):
- Sándwiches (6): Premium Brasileño, Del Huerto, Consentido, Cubano, Boyacense, Italiano.
- Hamburguesas (5, pan brioche con ajonjolí negro): Tradicional, Brasileña, Portal, Doble Carne, Clásica.
- Perros calientes (4): Brasileño, Americano, Boyacense, Callejero.
- Combos (incluyen papa a la francesa + gaseosa): Combo Sandwich, Combo Hamburguesa.
- Papa: Salchipapa, Porción de Papa.
- Carnes frías La Brasileña: jamones, embutidos, especialidades y variedades para llevar a casa.

**Contenido web actual ya publicado**
- Home comercial con hero en video, CTA a menú y branding dorado/negro con verde solo como acento.
- Sección `Recetas` en la home con dos posts base:
  - Desayuno fresco de jamón de pavo.
  - Lunch práctico de jamón de pavo para la oficina.
- Ambos posts están pensados como base para un futuro blog SEO/headless.

Pilares de mensaje: saludable/fresco, precio accesible, máxima calidad en carnes/jamones, sabor auténtico brasileño-local.

## Brand identity (updated 2026-07-09 — approved owner logo)

The logo features a golden yellow/black/green design with red accents (source: `productos fotos/propuesta de logo.png` approved by owner). Colors are balanced on the web in the same proportions as the logo:

- **Amarillo/Oro Portal (principal):** `#F2B800` — color de los contornos del pan y semillas. Es el color principal de marca para botones primarios, bordes activos y elementos destacados.
- **Oscuro Elegante (secundario):** `#1E1E1E` / `#000000` — color de la tipografía "EL PORTAL". Se usa en textos principales y fondos de paneles oscuros.
- **Verde Acento (moderado):** `#008744` — color del texto "BRASILEÑO" y la lechuga. Se usa moderadamente en tags saludables o de vegetales.
- **Rojo Acento (llamativo):** `#E53935` — color de la franja superior de las banderas. Se usa en precios y etiquetas de alerta.
- **Fondo Neutral (limpio):** `#FFFFFF` / `#FAF9F6` — fondo limpio del logo. Reemplaza cualquier tono verdoso para asegurar máxima legibilidad.
- **Tipografía:** sans-serif bold (Outfit para títulos, Plus Jakarta Sans para cuerpo). No se usa serif.

When editing `style.css`/`index.html`, use the CSS custom properties above — don't hardcode hex values inline.

## Design/dev directives for future code in this repo

- **Stack default:** HTML5 + CSS3 moderno + JS vanilla. Usar Next.js o Vite/React solo si la complejidad lo requiere.
- **Estilos:** Vanilla CSS (glassmorphism, gradientes suaves, paletas HSL vía CSS custom properties). Evitar Tailwind salvo que se pida explícitamente.
- **SEO/accesibilidad:** semántica HTML estricta, meta tags completos, atención a Core Web Vitals.
- **Tono de contenido:** cercano, familiar, apetitoso, confiable; enfatizar "rápido pero bien y saludable".
- **Precisión de menú:** cualquier nombre, ingrediente o precio de producto debe verificarse contra `agente.md` (que refleja Rappi) o preguntarle al cliente — no inventar productos a partir de fotos.
