/* ========================================
   JAVASCRIPT PRINCIPAL - SEI Website
   ======================================== */

// ========================================
// CARRUSEL
// ========================================

let currentSlide = 0;
let autoplayInterval;

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function getSlides() {
    return document.querySelectorAll('.carousel-slide');
}

function showSlide(index) {
    const slides = getSlides();
    const total = slides.length;
    if (total === 0) return;

    if (index >= total) currentSlide = 0;
    else if (index < 0) currentSlide = total - 1;
    else currentSlide = index;

    slides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('active');
    });

    slides[currentSlide].style.display = 'flex';
    slides[currentSlide].classList.add('active');

    // Actualizar dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function initCarousel() {
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');

    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoplay();
        showSlide(currentSlide + 1);
        startAutoplay();
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoplay();
        showSlide(currentSlide - 1);
        startAutoplay();
    });

    // Dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showSlide(parseInt(dot.getAttribute('data-slide')));
            startAutoplay();
        });
    });

    // Mostrar primer slide
    showSlide(0);
    
    // Iniciar autoplay
    startAutoplay();

    // Swipe en móvil
    const container = document.querySelector('.carousel-container');
    if (container) {
        let startX = 0;
        container.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        container.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? showSlide(currentSlide + 1) : showSlide(currentSlide - 1);
        });
    }
}

// ========================================
// TOGGLE GALERÍA / CARRUSEL
// ========================================

function initCarouselViewToggle() {
    const btnCarousel = document.getElementById('btn-carousel');
    const btnGallery  = document.getElementById('btn-gallery');
    const container   = document.querySelector('.carousel-container');
    const controls    = document.querySelector('.carousel-controls');
    const dots        = document.querySelector('.carousel-dots');

    if (!btnCarousel || !btnGallery || !container) return;

    btnCarousel.addEventListener('click', () => {
        container.classList.remove('gallery-mode');
        btnCarousel.classList.add('active');
        btnGallery.classList.remove('active');
        if (controls) controls.style.display = '';
        if (dots) dots.style.display = '';
        showSlide(0);
    });

    btnGallery.addEventListener('click', () => {
        // Redirigir a la página de proyectos
        window.location.href = 'proyectos.html';
    });
}

// ========================================
// MENÚ HAMBURGUESA
// ========================================

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');
    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// SCROLL SUAVE
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

// ========================================
// SCROLL TO TOP AL TOCAR EL LOGO
// ========================================

function initLogoScrollTop() {
    const logo = document.getElementById('logo-home');
    if (!logo) return;
    logo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.info-card, .team-member, .achievement-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// NAVBAR: sombra al hacer scroll
// ========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 10
            ? '0 2px 20px rgba(0,0,0,0.15)'
            : '0 2px 10px rgba(0,0,0,0.1)';
    });
}

// ========================================
// NOTIFICACIONES
// ========================================

function showNotification(message, type = 'info') {
    const n = document.createElement('div');
    n.textContent = message;
    n.style.cssText = `
        position:fixed; top:20px; right:20px; padding:15px 20px;
        background:${type === 'success' ? '#28a745' : type === 'error' ? '#DC3545' : '#0066cc'};
        color:white; border-radius:5px; box-shadow:0 2px 10px rgba(0,0,0,.2);
        z-index:3000; animation:slideIn .3s ease; max-width:300px;
    `;
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'slideOut .3s ease';
        setTimeout(() => n.remove(), 300);
    }, 3000);
}

// ========================================
// INICIALIZACIÓN
// ========================================

function initSite() {
    initHamburgerMenu();
    initCarousel();
    initCarouselViewToggle();
    initLogoScrollTop();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
}

// Ejecutar cuando el DOM esté listo
// (el script está al final del body, así que el DOM ya existe)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
} else {
    initSite();
}

// Animaciones CSS inyectadas
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to   { transform: translateX(0);     opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0);     opacity: 1; }
        to   { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Exportar para uso global si hace falta
window.SEI = { showNotification };


// Email confirmacion
const form = document.querySelector('.contact-form');
const modal = document.getElementById('modal-confirmacion');
const modalEmailTexto = document.getElementById('modal-email-texto');
const btnCorregir = document.getElementById('btn-corregir');
const btnEnviar = document.getElementById('btn-enviar'); // Esta línea faltaba arriba
const inputEmail = document.getElementById('email');
const submitBtn = form.querySelector('button[type="submit"]');

let emailConfirmado = false;

// 1. Al intentar enviar el formulario, mostramos el modal
form.addEventListener('submit', function(e) {
  if (!emailConfirmado) {
    e.preventDefault();
    modalEmailTexto.textContent = inputEmail.value;
    modal.classList.add('activo');
  }
});

// 2. Si toca "Corregir"
btnCorregir.addEventListener('click', function() {
  modal.classList.remove('activo');
  inputEmail.focus();
  inputEmail.select();
});

// 3. Si confirma el envío (AJAX / Segundo plano)
btnEnviar.addEventListener('click', function() {
  emailConfirmado = true;
  modal.classList.remove('activo');
  
  // Cambiamos el texto y bloqueamos el botón para que no hagan doble clic
  submitBtn.textContent = 'Enviando consulta...';
  submitBtn.style.background = '#0066cc';
  submitBtn.disabled = true;
  
  const formData = new FormData(form);

  fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
          'Accept': 'application/json'
      }
  })
  .then(response => {
      if (response.ok) {
          // ÉXITO
          submitBtn.textContent = '¡Mensaje Enviado con éxito! ✓';
          submitBtn.style.background = '#28a745';
          form.reset(); 
          
          // Reseteamos el botón después de 4 segundos
          setTimeout(() => {
              submitBtn.textContent = 'Enviar Consulta';
              submitBtn.style.background = '';
              submitBtn.disabled = false;
              emailConfirmado = false;
          }, 4000);
      } else {
          // ERROR DE FORMSUBMIT
          submitBtn.textContent = 'Error al enviar. Intenta de nuevo.';
          submitBtn.style.background = '#dc3545';
          submitBtn.disabled = false;
      }
  })
  .catch(error => {
      // ERROR DE INTERNET / CONEXIÓN
      submitBtn.textContent = 'Error de conexión.';
      submitBtn.style.background = '#dc3545';
      submitBtn.disabled = false;
  });
});

// 4. Cerrar modal si hacen clic afuera
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('activo');
  }
});
// Email reveal en móvil (tap toggle)
document.querySelectorAll('.email-reveal-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', function (e) {
        const tooltip = this.querySelector('.email-reveal-tooltip');

        // Si ya está activo y el click fue en el link, dejar que navegue
        if (this.classList.contains('activo') && e.target === tooltip) {
            return; // abre el mailto normalmente
        }

        e.preventDefault();

        // Toggle
        const estaActivo = this.classList.contains('activo');

        // Cerrar todos los demás
        document.querySelectorAll('.email-reveal-wrapper').forEach(w => w.classList.remove('activo'));

        if (!estaActivo) {
            this.classList.add('activo');
        }
    });
});

// Cerrar al tocar fuera
document.addEventListener('click', function (e) {
    if (!e.target.closest('.email-reveal-wrapper')) {
        document.querySelectorAll('.email-reveal-wrapper').forEach(w => w.classList.remove('activo'));
    }
});