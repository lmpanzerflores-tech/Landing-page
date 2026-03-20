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

// ========================================
/**
 * CURSOS PAGE FUNCTIONALITY - NEW
 */
// ========================================

// Estado global dos cursos
let currentPage = 1;
let currentFilter = '';
let searchTerm = '';
const cursosPorPagina = 8;

// Inicializar página de cursos (chamado se elementos existem)
function initCursosPage() {
    if (!document.getElementById('gridCursos')) return;

    // Popular filtros
    const filtrosContainer = document.getElementById('filtrosCategorias');
    filtrosContainer.innerHTML = `
        <button class="filter-btn bg-white border-2 border-yellow-200 text-yellow-700 px-6 py-3 rounded-full font-semibold hover:bg-yellow-50 hover:border-yellow-400 hover:shadow-md transition-all text-sm active" data-categoria="">Todas as Categorias</button>
    `;
    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn bg-white border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-full font-semibold hover:bg-yellow-50 hover:border-yellow-400 hover:text-yellow-700 hover:shadow-md transition-all text-sm';
        btn.dataset.categoria = cat;
        btn.textContent = cat;
        btn.onclick = () => filtrarCursos(cat);
        filtrosContainer.appendChild(btn);
    });

    // Listeners
    document.getElementById('buscaCursos').addEventListener('input', debounceSearch);
    document.getElementById('btnProxima').onclick = proximaPagina;
    document.getElementById('btnAnterior').onclick = paginaAnterior;
    document.querySelector('.filter-btn[data-categoria=""]').onclick = () => filtrarCursos('');

    // Carregar inicial
    filtrarCursos('');
}

// Função de renderização dos cursos
function renderCursos() {
    const grid = document.getElementById('gridCursos');
    const loading = document.getElementById('loading');
    const semResultados = document.getElementById('semResultados');

    loading.classList.remove('hidden');
    grid.innerHTML = '';

    // Filtrar cursos
    let cursosFiltrados = cursosData.filter(curso => {
        const matchCategoria = !currentFilter || curso.categoria === currentFilter;
        const matchBusca = !searchTerm || 
            curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.descricao.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategoria && matchBusca;
    });

    // Paginação
    const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);
    const inicio = (currentPage - 1) * cursosPorPagina;
    const fim = inicio + cursosPorPagina;
    const cursosPagina = cursosFiltrados.slice(inicio, fim);

    setTimeout(() => {
        loading.classList.add('hidden');

        if (cursosPagina.length === 0) {
            semResultados.classList.remove('hidden');
            document.getElementById('totalCursos').textContent = '0';
            document.getElementById('paginaAtual').textContent = '1';
            document.getElementById('totalPaginas').textContent = '1';
            return;
        }

        semResultados.classList.add('hidden');
        cursosPagina.forEach(curso => {
            const card = document.createElement('div');
            card.className = 'group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-100 overflow-hidden course-card';
            card.innerHTML = `
                <div class="relative mb-6">
                    <img src="${curso.img}" alt="${curso.titulo}" class="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ${curso.categoria}
                    </div>
                </div>
                <h3 class="font-black text-2xl text-gray-900 mb-4 leading-tight group-hover:text-yellow-600 transition-colors">${curso.titulo}</h3>
                <p class="text-gray-600 mb-8 leading-relaxed">${curso.descricao}</p>
                <a href="${curso.url}" target="_blank" class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-yellow-500/50 hover:-translate-y-1 transition-all group-hover:scale-[1.02] w-full">
                    Ver Detalhes <i data-lucide="arrow-right" class="w-6 h-6"></i>
                </a>
            `;
            grid.appendChild(card);
        });

        lucide.createIcons();

        // Atualizar controles
        document.getElementById('totalCursos').textContent = `${cursosFiltrados.length} curso${cursosFiltrados.length !== 1 ? 's' : ''}`;
        document.getElementById('paginaAtual').textContent = currentPage;
        document.getElementById('totalPaginas').textContent = totalPaginas;

        document.getElementById('btnProxima').disabled = currentPage >= totalPaginas;
        document.getElementById('btnAnterior').disabled = currentPage <= 1;
    }, 800);
}

// Filtrar por categoria
function filtrarCursos(categoria) {
    currentFilter = categoria;
    currentPage = 1;
    searchTerm = '';

    // Atualizar botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('bg-yellow-400', btn.dataset.categoria === categoria);
        btn.classList.toggle('text-white', btn.dataset.categoria === categoria);
        btn.classList.toggle('border-yellow-400', btn.dataset.categoria === categoria);
        btn.classList.toggle('bg-white', btn.dataset.categoria !== categoria);
        btn.classList.toggle('text-yellow-700', btn.dataset.categoria !== categoria);
        btn.classList.toggle('border-yellow-200', btn.dataset.categoria !== categoria);
        btn.classList.toggle('active', btn.dataset.categoria === categoria);
    });

    document.getElementById('buscaCursos').value = '';
    renderCursos();
}

// Busca com debounce
function debounceSearch(e) {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        searchTerm = e.target.value;
        currentPage = 1;
        renderCursos();
    }, 300);
}

// Paginação
function proximaPagina() {
    const totalPaginas = Math.ceil(getCursosFiltrados().length / cursosPorPagina);
    if (currentPage < totalPaginas) {
        currentPage++;
        renderCursos();
    }
}

function paginaAnterior() {
    if (currentPage > 1) {
        currentPage--;
        renderCursos();
    }
}

function limparBusca() {
    searchTerm = '';
    currentFilter = '';
    currentPage = 1;
    document.getElementById('buscaCursos').value = '';
    document.querySelector('.filter-btn[data-categoria=""]').click();
}

function getCursosFiltrados() {
    return cursosData.filter(curso => {
        const matchCategoria = !currentFilter || curso.categoria === currentFilter;
        const matchBusca = !searchTerm || 
            curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.descricao.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategoria && matchBusca;
    });
}

// Atualizar inicialização global para incluir cursos se página existir
const originalDOMContentLoaded = document.addEventListener;
document.addEventListener('DOMContentLoaded', function () {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    
    // NOVA: Inicializar cursos se página existir
    if (typeof initCursosPage === 'function' && document.getElementById('gridCursos')) {
        initCursosPage();
    }
});

