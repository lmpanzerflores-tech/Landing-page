/**
 * SUPER CONHECIMENTO - SCRIPT PRINCIPAL
 * Funcionalidades: Menu mobile, Scroll suave, FAQ Accordion, CTA handlers
 */

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function () {
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
    menuBtn.addEventListener('click', function () {
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
    document.addEventListener('click', function (e) {
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
        link.addEventListener('click', function (e) {
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

// ========================================
/*
 * CARROSSEL DE DEPOIMENTOS - HOME PAGE
 */
let depoIndex = 0;
const depoCards = document.querySelectorAll('.depo-card');
const depoDots = document.querySelectorAll('.depo-dot');
const prevBtn = document.getElementById('prev-depo');
const nextBtn = document.getElementById('next-depo');

function initDepoimentos() {
    if (!depoCards.length) return;
    
    // Auto play
    setInterval(nextDepo, 5000);
    
    // Event listeners
    if (prevBtn) prevBtn.onclick = prevDepo;
    if (nextBtn) nextBtn.onclick = nextDepo;
    depoDots.forEach((dot, index) => {
        dot.onclick = () => goToDepo(index);
    });
}

function nextDepo() {
    depoIndex = (depoIndex + 1) % depoCards.length;
    updateDepo();
}

function prevDepo() {
    depoIndex = (depoIndex - 1 + depoCards.length) % depoCards.length;
    updateDepo();
}

function goToDepo(index) {
    depoIndex = index;
    updateDepo();
}

function updateDepo() {
    depoCards.forEach((card, i) => {
        card.classList.toggle('active', i === depoIndex);
    });
    depoDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === depoIndex);
    });
}

// ========================================
/*
 * FUNCIONALIDADES DA PÁGINA DE CURSOS
 * Filtro por categoria, busca, paginação
 */
let cursosFiltrados = [];
let categoriaSelecionada = '';
let termoBusca = '';
let paginaAtual = 1;
const CURSOS_POR_PAGINA = 12;

// Inicializar página de cursos
function initCursosPage() {
    if (document.querySelector('#gridCursos')) {
        carregarFiltros();
        filtrarCursos('');
        setupEventListenersCursos();
    }
}

// Criar botões de filtro dinamicamente
function carregarFiltros() {
    const container = document.getElementById('filtrosCategorias');
    if (!container) return;

    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 hover:border-yellow-400 hover:shadow-md transition-all text-sm whitespace-nowrap`;
        btn.dataset.categoria = cat;
        btn.textContent = cat;
        btn.onclick = () => filtrarCursos(cat);
        container.appendChild(btn);
    });
}

// Event listeners para cursos
function setupEventListenersCursos() {
    // Busca
    document.getElementById('buscaCursos').addEventListener('input', function(e) {
        termoBusca = e.target.value.toLowerCase().trim();
        paginaAtual = 1;
        filtrarCursos(categoriaSelecionada);
    });

    // Paginação
    document.getElementById('btnProxima').onclick = () => {
        if (paginaAtual < Math.ceil(cursosFiltrados.length / CURSOS_POR_PAGINA)) {
            paginaAtual++;
            renderizarCursos();
        }
    };

    document.getElementById('btnAnterior').onclick = () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            renderizarCursos();
        }
    };

    // Limpar busca
    document.querySelector('[onclick="limparBusca()"]').onclick = limparBusca;
}

// Filtrar e renderizar cursos
function filtrarCursos(categoria) {
    categoriaSelecionada = categoria;
    paginaAtual = 1;

    // Atualizar botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-yellow-100', 'border-yellow-400', 'text-yellow-700', 'font-bold', 'shadow-md');
        if (btn.dataset.categoria === categoria || (categoria === '' && btn.dataset.categoria === '')) {
            btn.classList.add('bg-yellow-100', 'border-yellow-400', 'text-yellow-700', 'font-bold', 'shadow-md');
        }
    });

    // Filtrar cursos
    cursosFiltrados = cursosData.filter(curso => {
        const matchCategoria = categoria === '' || curso.categoria === categoria;
        const matchBusca = termoBusca === '' || 
                          curso.titulo.toLowerCase().includes(termoBusca) || 
                          curso.descricao.toLowerCase().includes(termoBusca);
        return matchCategoria && matchBusca;
    });

    // Atualizar UI
    document.getElementById('totalCursos').textContent = cursosFiltrados.length;
    document.getElementById('totalPaginas').textContent = Math.ceil(cursosFiltrados.length / CURSOS_POR_PAGINA);
    
    renderizarCursos();
    atualizarPagButtons();
}

// Renderizar cursos da página atual
function renderizarCursos() {
    const grid = document.getElementById('gridCursos');
    const inicio = (paginaAtual - 1) * CURSOS_POR_PAGINA;
    const fim = inicio + CURSOS_POR_PAGINA;
    const cursosPagina = cursosFiltrados.slice(inicio, fim);

    // Mostrar loading
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('semResultados').classList.add('hidden');
    grid.innerHTML = '';

    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');

        if (cursosPagina.length === 0) {
            document.getElementById('semResultados').classList.remove('hidden');
            return;
        }

        cursosPagina.forEach(curso => {
            const card = criarCardCurso(curso);
            grid.appendChild(card);
        });

        // Re-inicializar icons
        lucide.createIcons();
    }, 400);
}

// Criar card de curso
function criarCardCurso(curso) {
    const card = document.createElement('div');
    card.className = 'course-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group cursor-pointer h-full flex flex-col';
    
    const badgeClass = {
        'Administração e Negócios': 'bg-yellow-100 text-yellow-700',
        'Direito': 'bg-red-100 text-red-700',
        'Auto Ajuda e Desenvolvimento Humano': 'bg-blue-100 text-blue-700'
    }[curso.categoria] || 'bg-gray-100 text-gray-700';

    card.innerHTML = `
        <div class="h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <img src="${curso.img}" alt="${curso.titulo}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute top-4 left-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${badgeClass} shadow-sm">${curso.categoria}</span>
            </div>
        </div>
        <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">${curso.titulo}</h3>
            <p class="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">${curso.descricao}</p>
            <a href="${curso.url}" class="text-yellow-600 font-semibold text-sm flex items-center gap-2 hover:gap-3 group-hover:translate-x-2 transition-all mt-auto">
                Ver detalhes
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>
    `;

    return card;
}

// Atualizar botões de paginação
function atualizarPagButtons() {
    const totalPaginas = Math.ceil(cursosFiltrados.length / CURSOS_POR_PAGINA);
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProxima = document.getElementById('btnProxima');
    const paginaAtualEl = document.getElementById('paginaAtual');

    paginaAtualEl.textContent = paginaAtual;
    
    btnAnterior.disabled = paginaAtual <= 1;
    btnProxima.disabled = paginaAtual >= totalPaginas;
}

// Limpar busca
function limparBusca() {
    document.getElementById('buscaCursos').value = '';
    termoBusca = '';
    paginaAtual = 1;
    filtrarCursos(categoriaSelecionada);
}

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
const testimonials = document.querySelectorAll(".testimonial-card");
let index = 0;

function showNextTestimonial() {
    testimonials[index].classList.remove("active");

    index = (index + 1) % testimonials.length;

    testimonials[index].classList.add("active");
}

setInterval(showNextTestimonial, 3000);
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');

    // Alterna a classe hidden
    content.classList.toggle('hidden');

    // Gira o ícone
    if (content.classList.contains('hidden')) {
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.style.transform = 'rotate(180deg)';
    }
}
