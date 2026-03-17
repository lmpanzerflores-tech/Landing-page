/**
 * SUPER CONHECIMENTO - SCRIPT PRINCIPAL
 * Funcionalidades: Menu mobile, Scroll suave, FAQ Accordion, CTA handlers
 */

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ícones Lucide (caso não tenha sido inicializado no HTML)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
});

// ========================================
// MENU MOBILE (HAMBURGER)
// ========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!menuBtn || !mobileMenu) return;
    
    // Toggle do menu ao clicar no botão hamburger
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Mudar ícone entre menu e X
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.setAttribute('data-lucide', 'menu');
        } else {
            icon.setAttribute('data-lucide', 'x');
        }
        lucide.createIcons();
    });
    
    // Fechar menu ao clicar em qualquer link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
}

// ========================================
// SCROLL SUAVE PARA ÂNCORAS
// ========================================
function initSmoothScroll() {
    // Selecionar todos os links que começam com #
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular posição considerando o header fixo
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Scroll suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// ANIMAÇÕES AO SCROLLAR (INTERSECTION OBSERVER)
// ========================================
function initScrollAnimations() {
    // Verificar se o navegador suporta Intersection Observer
    if (!('IntersectionObserver' in window)) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Observador para elementos que devem aparecer ao scrollar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Adicionar classe específica de animação baseada no elemento
                if (entry.target.classList.contains('benefit-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                } else if (entry.target.classList.contains('course-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                } else if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
                
                // Parar de observar após animar uma vez
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos específicos
    const animateElements = document.querySelectorAll('.benefit-card, .course-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0'; // Inicialmente invisível
        observer.observe(el);
    });
}

// ========================================
// HEADER COM EFEITO AO SCROLLAR
// ========================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Adicionar sombra mais forte quando scrollar
        if (currentScroll > 50) {
            header.classList.add('shadow-md');
            header.classList.remove('shadow-sm');
        } else {
            header.classList.remove('shadow-md');
            header.classList.add('shadow-sm');
        }
        
        // Esconder/mostrar header ao scrollar para baixo/cima (opcional)
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrollando para baixo - pode esconder header se desejar
            // header.style.transform = 'translateY(-100%)';
        } else {
            // Scrollando para cima
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// FAQ ACCORDION
// ========================================
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    const isOpen = !content.classList.contains('hidden');
    
    // Fechar todos os outros itens (modo acordeão - opcional)
    // Remova este bloco se quiser permitir múltiplos abertos
    document.querySelectorAll('.faq-content').forEach(item => {
        if (item !== content && !item.classList.contains('hidden')) {
            item.classList.add('hidden');
            item.previousElementSibling.classList.remove('active');
            item.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle do item clicado
    if (isOpen) {
        content.classList.add('hidden');
        button.classList.remove('active');
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.remove('hidden');
        button.classList.add('active');
        icon.style.transform = 'rotate(180deg)';
    }
}

// ========================================
// HANDLERS DE CTA (CALL TO ACTION)
// ========================================
function handleCTA(location) {
    // Aqui você pode customizar o comportamento de cada botão
    // Por exemplo: redirecionar para checkout, abrir modal, etc.
    
    const messages = {
        'main': 'Bem-vindo! Você será redirecionado para a página de cadastro.',
        'courses': 'Veja nosso catálogo completo de cursos!',
        'offer': 'Ótima escolha! Aproveite esta oferta especial.',
        'final': 'Vamos lá! Clique em OK para garantir seu acesso.'
    };
    
    // Simular redirecionamento ou ação
    console.log(`CTA clicado em: ${location}`);
    
    // Opção 1: Alerta simples (para demonstração)
    // alert(messages[location] || 'Redirecionando...');
    
    // Opção 2: Redirecionamento real (descomente para usar)
    // window.location.href = 'https://sua-plataforma.com/checkout';
    
    // Opção 3: Abrir modal de cadastro (implementar se necessário)
    showNotification(messages[location] || 'Redirecionando para o checkout...');
}

// ========================================
// NOTIFICAÇÃO TOAST (EXTRA)
// ========================================
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-2xl z-50 transform translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-2';
    notification.innerHTML = `
        <i data-lucide="info" class="w-5 h-5 text-blue-400"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.remove('translate-y-20', 'opacity-0');
    }, 100);
    
    // Inicializar ícone
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// UTILITÁRIOS EXTRAS
// ========================================

// Lazy loading para imagens (melhoria de performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Formatação de preço (se necessário futuramente)
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Detectar quando usuário vai sair da página (exit intent)
// Útil para mostrar última oferta antes de sair
let exitIntentShown = false;
document.addEventListener('mouseout', (e) => {
    if (e.clientY < 0 && !exitIntentShown && !localStorage.getItem('exitIntentShown')) {
        exitIntentShown = true;
        localStorage.setItem('exitIntentShown', 'true');
        // Aqui pode mostrar um modal especial
        console.log('Exit intent detectado');
    }
});