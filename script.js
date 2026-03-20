/**
 * SUPER CONHECIMENTO - SCRIPT PRINCIPAL - FAQ SIMPLIFIEDO
 */

// ========================================
/**
 * INICIALIZAÇÃO
 */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initFAQAccordion();
});

// ========================================
/** MENU MOBILE */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
        lucide.createIcons();
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// ========================================
/** SCROLL SUAVE */
function initSmoothScroll() {
    document.querySelectorAll('a[href^=\"#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
/** ANIMAÇÕES SCROLL */
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    });
    document.querySelectorAll('.benefit-card, .course-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
/** HEADER SCROLL */
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        header.classList.toggle('shadow-md', scroll > 50);
        lastScroll = scroll;
    });
}

// ========================================
/** FAQ ACCORDION SIMPLIFICADO - BUG FREE */
function initFAQAccordion() {
    const faqButtons = document.querySelectorAll('.faq-btn');
    
    // Estado inicial: todos fechados
    document.querySelectorAll('.faq-content').forEach(content => {
        content.style.maxHeight = '0px';
    });

    faqButtons.forEach(button => {
        button.addEventListener('click', () => toggleFAQ(button));
    });
}

function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

    // Fechar todos os outros
    document.querySelectorAll('.faq-content').forEach(otherContent => {
        if (otherContent !== content) {
            otherContent.style.maxHeight = '0px';
        }
    });

    document.querySelectorAll('.faq-btn').forEach(otherButton => {
        if (otherButton !== button) {
            otherButton.classList.remove('active');
            const otherIcon = otherButton.querySelector('i');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
    });

    // Toggle atual
    if (isOpen) {
        content.style.maxHeight = '0px';
        button.classList.remove('active');
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        button.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

// ========================================
/** CTA HANDLER */
function handleCTA(location) {
    console.log(`CTA ${location} clicado`);
    showNotification('Redirecionando para checkout...');
}

// ========================================
/** NOTIFICATION TOAST */
function showNotification(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-xl z-50';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Resto do código permanece igual...

