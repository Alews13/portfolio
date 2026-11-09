/**
 * ==========================================================================
 * PORTFOLIO PERSONAL — FASE 3: RESPONSIVE DESIGN & FUNCIONALIDAD
 * Archivo de scripts vanilla (main.js)
 * 
 * Funcionalidades perfeccionadas:
 * 1. Control accesible del menú desplegable (aria-expanded, aria-controls y teclado).
 * 2. Cierre automático del menú al hacer clic en enlaces, fondo o pulsar Escape.
 * 3. Indicador de enlace activo en navegación según posición de scroll (IntersectionObserver).
 * 4. Desplazamiento suave por anclas con compensación de la altura del encabezado.
 * 5. Actualización dinámica del año de copyright en el pie de página.
 * ==========================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initActiveNavObserver();
  initCurrentYear();
  initSmoothScrollFallback();
});

/**
 * --------------------------------------------------------------------------
 * 1. Control Accesible del Menú Móvil
 * --------------------------------------------------------------------------
 */
function initMobileNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  const brandLogo = document.querySelector('.brand-logo');

  if (!navToggle || !primaryNav) return;

  // Alternar apertura y cierre del menú
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded);
  });

  // Cerrar menú al hacer clic en cualquier enlace interno de navegación
  const navLinks = primaryNav.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        toggleMenu(false);
      }
    });
  });

  // Cerrar menú al hacer clic en el logotipo si estuviera desplegado
  if (brandLogo) {
    brandLogo.addEventListener('click', () => {
      if (window.innerWidth < 1024 && navToggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
      }
    });
  }

  // Cerrar menú al hacer clic fuera del contenedor de navegación (Click Outside)
  document.addEventListener('click', (event) => {
    if (
      navToggle.getAttribute('aria-expanded') === 'true' &&
      !primaryNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      toggleMenu(false);
    }
  });

  // Accesibilidad por teclado: tecla Escape y trampa de foco accesible
  document.addEventListener('keydown', (event) => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

    // Cerrar al pulsar Escape
    if (event.key === 'Escape' && isExpanded) {
      toggleMenu(false);
      navToggle.focus();
      return;
    }

    // Trampa de foco mientras el menú desplegable está abierto
    if (event.key === 'Tab' && isExpanded && window.innerWidth < 1024) {
      const focusableElements = [
        navToggle,
        ...primaryNav.querySelectorAll('a[href], button:not([disabled]), input, textarea')
      ];

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: al llegar al inicio, volver al final
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: al llegar al final, volver al inicio
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // Cerrar menú automáticamente si la ventana se redimensiona a tablet/desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && navToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
    }
  });

  /**
   * Modifica el estado del menú y actualiza los atributos ARIA y de bloqueo de scroll
   * @param {boolean} open - Estado deseado del menú
   */
  function toggleMenu(open) {
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute(
      'aria-label',
      open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
    primaryNav.classList.toggle('is-open', open);

    // Bloquear el desplazamiento de fondo mientras el menú desplegable está abierto.
    if (window.innerWidth < 1024) {
      document.body.style.overflow = open ? 'hidden' : '';
    } else {
      document.body.style.overflow = '';
    }
  }
}

/**
 * --------------------------------------------------------------------------
 * 2. Indicador de Sección Activa en Navegación (IntersectionObserver)
 * --------------------------------------------------------------------------
 */
function initActiveNavObserver() {
  const navLinks = document.querySelectorAll('.primary-nav .nav-link');
  if (navLinks.length === 0) return;

  const sections = [];
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const section = document.getElementById(targetId);
      if (section) {
        sections.push(section);
      }
    }
  });

  if (sections.length === 0 || !('IntersectionObserver' in window)) return;

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else if (href && href.startsWith('#')) {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * --------------------------------------------------------------------------
 * 3. Actualización Dinámica del Año en el Pie de Página
 * --------------------------------------------------------------------------
 */
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * --------------------------------------------------------------------------
 * 4. Soporte Seguro de Navegación por Anclas
 * --------------------------------------------------------------------------
 */
function initSmoothScrollFallback() {
  // Asegurar que enlaces ancla con hash lleven el foco accesible
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // En navegadores accesibles, asignar temporalmente tabindex si no es enfocable
        if (!targetElement.hasAttribute('tabindex')) {
          targetElement.setAttribute('tabindex', '-1');
          targetElement.addEventListener('blur', () => targetElement.removeAttribute('tabindex'), { once: true });
        }
      }
    });
  });
}
