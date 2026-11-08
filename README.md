# Portfolio Web Personal — Fase 3: Responsive Design y Funcionalidad

Este proyecto corresponde al portfolio web personal desarrollado como trabajo final para la materia **Diseño de Interfaz de Usuario y Experiencia de Usuario (UX/UI)**, correspondiente a la **Licenciatura en Sistemas de Información**.

En esta **Fase 3**, se ha perfeccionado exhaustivamente el **comportamiento responsive, las microinteracciones y la accesibilidad** en todo el espectro de dispositivos (Mobile 375 px, Tablet 768 px y Desktop 1280 px), manteniendo la paleta monocromática y la arquitectura de nueve secciones obligatorias.

---

## 1. Perfil del Propietario

- **Rol objetivo:** Front-End Developer.
- **Formación:** Estudiante de segundo año de Licenciatura en Sistemas de Información.
- **Orientación:** Programación, lógica algorítmica y maquetación web limpia.
- **Nivel de idioma:** Español nativo, inglés básico con competencia para lectura y comprensión de documentación técnica.
- **Experiencia:** Proyectos académicos universitarios y prácticas personales de maquetación (sin experiencia laboral formal inventada).

---

## 2. Identidad Visual y Paleta Monocromática

El diseño adopta un enfoque editorial riguroso, caracterizado por la limpieza, el espaciado generoso, bordes finos de 1 px y la ausencia total de gradientes llamativos, neón o sombras pesadas.

### Paleta de Colores en `:root` (WCAG 2.2 AA)

```css
:root {
  --color-background: #FFFFFF;       /* Fondo principal de página y tarjetas */
  --color-surface: #F5F5F5;          /* Superficie secundaria / sección de contacto */
  --color-text: #171717;             /* Texto principal y encabezados */
  --color-text-secondary: #525252;   /* Texto secundario, descripciones y fechas */
  --color-border: #D4D4D4;           /* Bordes finos de componentes y divisores */
  --color-accent: #171717;           /* Elemento de acento activo (negro sólido) */
  --color-accent-contrast: #FFFFFF;  /* Contraste sobre acento (blanco puro) */
}
```

*Verificación de contraste:* La relación entre `--color-text` (`#171717`) y `--color-background` (`#FFFFFF`) es de **16.1:1**, y entre `--color-text-secondary` (`#525252`) y fondo es de **7.03:1**, superando los requisitos de contraste AA y AAA de WCAG 2.2.

---

## 3. Tipografía y Sistema de Espaciado

- **Fuente principal:** `Inter` (importada mediante Google Fonts con pesos 400, 500, 600 y 700).
- **Fallbacks nativos:** `Arial, sans-serif`.
- **Fuente monoespaciada:** Pila del sistema (`ui-monospace, Menlo, Consolas, monospace`) para etiquetas técnicas y datos provisionales.
- **Jerarquía tipográfica:**
  - `H1`: Título principal destacado en peso semibold (600), `letter-spacing: -0.03em`.
  - `H2`: Encabezados de sección intermedios con separación generosa (80-96 px).
  - `H3`: Títulos de tarjetas de componentes.
  - Párrafos: `line-height: 1.6 - 1.7` en color secundario para máxima legibilidad.
- **Sistema de espaciado modular en múltiplos de 8 px:**
  - 8 px (`var(--space-2)`), 16 px (`var(--space-4)`), 24 px (`var(--space-6)`), 32 px (`var(--space-8)`), 48 px (`var(--space-12)`), 64 px (`var(--space-16)`), 80 px (`var(--space-20)`), 96 px (`var(--space-24)`).

---

## 4. Matriz de Adaptación Responsive (Mobile-First)

El portfolio fue diseñado y verificado en tres resoluciones clave sin presentar scroll horizontal (`overflow-x: hidden`):

### Mobile (375 px)
- **Navegación:** Menú hamburguesa accesible con botón de 40 px (touch target accesible). Despliegue de cajón vertical con trampa de foco (`Tab` / `Shift+Tab`), cierre con tecla `Escape`, cierre al pulsar cualquier enlace ancla y cierre al hacer clic fuera del menú (*click-outside*). Bloqueo de scroll en body al estar abierto.
- **Layout y Grillas:** Tarjetas en una sola columna con padding horizontal de `1.25rem` (20 px).
- **Botones:** En pantallas `< 480px`, los botones de acción (`.hero-actions .btn`, `.project-card__links .btn`) se adaptan al ancho completo disponible (`width: 100%`) facilitando el toque táctil.
- **Imágenes:** Proporción 16:10 responsiva (`width: 100%; height: auto; object-fit: cover;`).
- **Timeline:** Indentación optimizada para pantallas estrechas (`padding-left: 1.25rem; margin-left: 0.5rem;`).

### Tablet (768 px)
- **Navegación:** Cabecera adaptada en dos niveles continuos que evita el colapso horizontal:
  - Nivel 1: Logotipo a la izquierda, botones de GitHub y Contacto a la derecha.
  - Nivel 2: Barra horizontal con las 9 secciones (`nav-list`) distribuida equitativamente en los 704 px disponibles sin saltos de línea ni desbordamientos.
- **Grillas:**
  - Métricas: 2 columnas (`repeat(2, 1fr)`).
  - Skills: 2 columnas con la tercera categoría abarcando el ancho completo (`grid-column: span 2`) para dar espacio generoso a los tags.
  - Proyectos: Tarjetas horizontales (2fr imagen, 3fr cuerpo) con imagen fija en proporción.
  - About Me: 2 columnas (260 px imagen, 1fr contenido).
  - Contacto: 2 columnas (1fr canales, 1fr formulario).
  - Footer: 3 columnas (2fr marca, 1fr navegación, 1fr redes).

### Desktop (1280 px)
- **Contenedor:** Ancho máximo centralizado de `1200px` con padding horizontal de `3rem` (48 px).
- **Navegación:** Barra horizontal unificada en un solo nivel con espaciado amplio y estados hover/active de borde inferior negro.
- **Grillas:**
  - Métricas: 4 columnas en una sola fila (`repeat(4, 1fr)`).
  - Skills: 3 columnas simétricas (`repeat(3, 1fr)`).
  - Proyectos: Proporción editorial amplia (5fr imagen, 7fr contenido).
  - About Me: 2 columnas (320 px imagen, 1fr contenido).
  - Contacto: 2 columnas con separación generosa (`gap: 3rem`).

---

## 5. Implementación de las Nueve Secciones Obligatorias

1. **`01. Header / Navigation` (`#header`):**
   - Sticky header con compensación responsiva de scroll (`scroll-margin-top: calc(var(--header-height) + 1.25rem)`).
   - Logotipo tipográfico `<[IN]>` y nombre del propietario.
   - 9 enlaces ancla a todas las secciones del portfolio.
   - Enlace externo a GitHub y botón CTA de contacto.
   - Menú móvil accesible con atributos `aria-expanded` y `aria-controls`.

2. **`02. Hero` (`#hero`):**
   - Único `<h1>` de la página (`clamp(2rem, 8vw, 3.5rem)`).
   - Rol profesional y breve reseña académica orientada a código limpio.
   - Botón principal negro ("Visualizar proyectos" -> `#projects`), secundario blanco ("Contactar" -> `#contact`) y CV en PDF.
   - Indicador de disponibilidad discreto con punto negro sólido.

3. **`03. Métricas / Highlights` (`#metrics`):**
   - Tarjetas simples con valores provisionales identificados (`[DATO PROVISIONAL: 2°]`, `3+`, `6+`, `100%`).
   - Cifras grandes semibold, etiquetas en gris secundario `#525252`, bordes finos.

4. **`04. Skills` (`#skills`):**
   - 3 áreas: Front-End Development, Programming & Lógica, Tools & Technologies.
   - Tags con bordes finos `#D4D4D4` y fondo `#F5F5F5` con ajuste flexible sin desbordamiento.

5. **`05. Projects` (`#projects`):**
   - 3 tarjetas con mockups esquemáticos monocromáticos (16:10).
   - Microinteracción hover discreta: borde oscurecido a `#171717` y elevación de 2 px.
   - Cuadros de resultado/aprendizaje y enlaces al repositorio y caso de estudio.

6. **`06. Experience / Education` (`#experience`):**
   - Timeline vertical minimalista con marcadores circulares sólidos y fechas en gris.
   - Formación universitaria actual y capacitaciones complementarias.
   - Espacio preparado con borde punteado para registrar futuras experiencias laborales sin datos inventados.

7. **`07. About Me` (`#about`):**
   - Composición de dos columnas en desktop/tablet y apilada en mobile.
   - Fotografía de perfil monocromática e idiomas (español nativo, lectura técnica en inglés).
   - 3 principios de trabajo numerados (`01. Semántica y Accesibilidad`, `02. Aprendizaje Continuo`, `03. Empatía UX`).

8. **`08. Contact` (`#contact`):**
   - Fondo diferenciado en gris muy claro `#F5F5F5`.
   - Canales directos con tarjetas blancas (Email con `mailto:`, LinkedIn, GitHub, otra plataforma).
   - Formulario demostrativo accesible con validación HTML5 nativa y feedback con `aria-live`.

9. **`09. Footer` (`#footer`):**
   - Fondo blanco con borde superior gris fino.
   - Navegación completa repetida para retorno ágil.
   - Redes sociales, créditos técnicos y botón funcional "Volver arriba".

---

## 6. Página Interna: Caso de Estudio

La página [`projects/project-case-study.html`](projects/project-case-study.html) comparte la misma hoja de estilos centralizada y scripts:
- Migas de pan (*breadcrumbs*) accesibles.
- Único `<h1>` independiente y ficha técnica en cuadrícula `#F5F5F5`.
- Mockup esquemático en 16:10.
- Secciones estructuradas: Resumen Ejecutivo, El Desafío UX/UI, Objetivos, Arquitectura de Información, Implementación Técnica, Resultados y Próximos Pasos.
- Botones de retorno rápido hacia la galería de proyectos del portfolio.

---

## 7. Microinteracciones y Accesibilidad

- **Estados interactivos:** `:hover`, `:active` y `:focus-visible` aplicados con sutileza en botones, tarjetas y enlaces.
- **Teclado:** Foco visible mediante contorno sólido negro de 2 px y separación de 3 px. Enlace skip-link operativo al inicio del documento.
- **Animaciones:** Todas las transiciones están limitadas a `0.18s ease-in-out`.
- **Preferencia de movimiento reducido:** Bloque `@media (prefers-reduced-motion: reduce)` que inhabilita el desplazamiento suave y anula cualquier transformación visual para usuarios sensibles.
- **Atributos de accesibilidad:** Atributos ARIA actualizados dinámicamente (`aria-expanded`, `aria-label`, `aria-current="page"`).

---

## 8. Guía de Configuración Personal

Todos los campos editables continúan identificados mediante comentarios `<!-- CONFIGURAR: ... -->` y marcadores entre corchetes `[CONFIGURAR: ...]`:

| Campo a personalizar | Ubicación en `index.html` | Descripción sugerida |
| :--- | :--- | :--- |
| **Nombre completo** | Header, Hero, About, Footer, Metadatos | Reemplazar `[NOMBRE Y APELLIDO]` |
| **Iniciales / Monograma** | Header, Footer | Reemplazar `[IN]` por tus iniciales |
| **Ubicación** | Hero, Footer | Ciudad y País de residencia |
| **Email personal** | Contact, Footer | Modificar `mailto:[CONFIGURAR_EMAIL@EJEMPLO.COM]` |
| **URL de GitHub** | Header, Contact, Footer | Tu perfil en `https://github.com/usuario` |
| **URL de LinkedIn** | Contact, Footer | Tu perfil en `https://linkedin.com/in/usuario` |
| **URL de CV en PDF** | Hero, Contact, Footer | Enlace a tu archivo PDF en assets o nube |
| **URL de otras redes** | Contact | Perfil opcional (Discord, Twitter/X, etc.) |
| **Fotografía de perfil** | About Me (`assets/images/`) | Guardar tu foto en `assets/images/` y actualizar la ruta |
| **Descripción profesional** | Hero, About Me | Adaptar el texto a tu experiencia real |
| **Estado de disponibilidad** | Hero | Pasantías, proyectos colaborativos, etc. |
| **Idiomas** | About Me | Detalle de niveles de idiomas |
| **Tecnologías / Skills** | Skills | Confirmar o editar las herramientas dominadas |
| **Proyectos** | Projects | Reemplazar títulos, repositorios y capturas |

---

## 9. Visualización Local

Al ser un proyecto estático sin dependencias ni compiladores, puede visualizarse de forma inmediata abriendo `index.html` en cualquier navegador web moderno o mediante una extensión como **Live Server** en Visual Studio Code.
