/**
 * SUPER CONHECIMENTO - SCRIPT PRINCIPAL
 */

const CATALOG_URL = 'cursos.html';
const SUPPORT_EMAIL = 'superconhecimento7@gmail.com';

let currentPage = 1;
let currentFilter = '';
let searchTerm = '';
const cursosPorPagina = 8;

document.addEventListener('DOMContentLoaded', () => {
    renderLucideIcons();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initStickyCTA();
    initTestimonials();
    initCursosPage();
});

function renderLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
            renderLucideIcons();
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');

            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                renderLucideIcons();
            }
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const offset = 80;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });
}

function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    });

    document.querySelectorAll('.benefit-card, .course-card, .faq-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const syncHeader = () => {
        header.classList.toggle('shadow-md', window.pageYOffset > 24);
    };

    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
}

function initStickyCTA() {
    const stickyCTA = document.getElementById('cta-sticky');
    if (!stickyCTA) return;

    const syncStickyCTA = () => {
        const shouldShow = window.pageYOffset > 600;
        stickyCTA.classList.toggle('opacity-0', !shouldShow);
        stickyCTA.classList.toggle('pointer-events-none', !shouldShow);
    };

    syncStickyCTA();
    window.addEventListener('scroll', syncStickyCTA, { passive: true });
}

function initTestimonials() {
    const track = document.getElementById('depoimentos-main');
    const cards = Array.from(document.querySelectorAll('.depo-card'));
    const dots = Array.from(document.querySelectorAll('.depo-dot'));
    const prevButton = document.getElementById('prev-depo');
    const nextButton = document.getElementById('next-depo');

    if (!track || cards.length <= 1) return;

    let currentIndex = cards.findIndex(card => card.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;

    const render = index => {
        track.style.transform = `translateX(-${index * 100}%)`;

        cards.forEach((card, cardIndex) => {
            const isActive = cardIndex === index;
            card.classList.toggle('active', isActive);
            card.setAttribute('aria-hidden', String(!isActive));
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
            dot.setAttribute('aria-pressed', String(dotIndex === index));
        });
    };

    const goTo = index => {
        currentIndex = (index + cards.length) % cards.length;
        render(currentIndex);
    };

    prevButton?.addEventListener('click', () => goTo(currentIndex - 1));
    nextButton?.addEventListener('click', () => goTo(currentIndex + 1));

    dots.forEach((dot, index) => {
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        dot.addEventListener('click', () => goTo(index));
        dot.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                goTo(index);
            }
        });
    });

    render(currentIndex);
}

function handleCTA(location) {
    console.log(`CTA ${location} clicado`);

    if (document.getElementById('gridCursos')) {
        const cursosSection = document.getElementById('filtros') || document.getElementById('gridCursos');
        cursosSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Escolha um curso para continuar.');
        return;
    }

    showNotification('Abrindo o catalogo completo...');
    window.setTimeout(() => {
        window.location.href = CATALOG_URL;
    }, 350);
}

function showNotification(message) {
    const existingToast = document.querySelector('[data-toast="site-notification"]');
    existingToast?.remove();

    const toast = document.createElement('div');
    toast.dataset.toast = 'site-notification';
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-xl z-50';
    toast.textContent = message;
    document.body.appendChild(toast);

    window.setTimeout(() => toast.remove(), 2400);
}

function initCursosPage() {
    const grid = document.getElementById('gridCursos');
    const filtrosContainer = document.getElementById('filtrosCategorias');
    const buscaInput = document.getElementById('buscaCursos');
    const btnProxima = document.getElementById('btnProxima');
    const btnAnterior = document.getElementById('btnAnterior');

    if (!grid || !filtrosContainer || !buscaInput || !btnProxima || !btnAnterior) return;
    if (typeof cursosData === 'undefined' || typeof categorias === 'undefined') return;

    filtrosContainer.innerHTML = `
        <button class="filter-btn bg-white border-2 border-yellow-200 text-yellow-700 px-6 py-3 rounded-full font-semibold hover:bg-yellow-50 hover:border-yellow-400 hover:shadow-md transition-all text-sm active" data-categoria="">Todas as Categorias</button>
    `;

    categorias.forEach(categoria => {
        const button = document.createElement('button');
        button.className = 'filter-btn bg-white border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-full font-semibold hover:bg-yellow-50 hover:border-yellow-400 hover:text-yellow-700 hover:shadow-md transition-all text-sm';
        button.dataset.categoria = categoria;
        button.textContent = categoria;
        button.addEventListener('click', () => filtrarCursos(categoria));
        filtrosContainer.appendChild(button);
    });

    buscaInput.addEventListener('input', debounceSearch);
    btnProxima.addEventListener('click', proximaPagina);
    btnAnterior.addEventListener('click', paginaAnterior);

    const allCategoriesButton = document.querySelector('.filter-btn[data-categoria=""]');
    allCategoriesButton?.addEventListener('click', () => filtrarCursos(''));

    const params = new URLSearchParams(window.location.search);
    const initialSearch = params.get('busca')?.trim() || '';
    const initialCategory = getCategoryFromParam(params.get('categoria'));

    searchTerm = initialSearch;
    buscaInput.value = initialSearch;

    filtrarCursos(initialCategory, {
        preserveSearch: true,
        skipUrlUpdate: true
    });
}

function renderCursos() {
    const grid = document.getElementById('gridCursos');
    const loading = document.getElementById('loading');
    const semResultados = document.getElementById('semResultados');

    if (!grid || !loading || !semResultados) return;

    loading.classList.remove('hidden');
    grid.innerHTML = '';

    const cursosFiltrados = getCursosFiltrados();
    const totalPaginas = Math.max(1, Math.ceil(cursosFiltrados.length / cursosPorPagina));
    currentPage = Math.min(currentPage, totalPaginas);

    const inicio = (currentPage - 1) * cursosPorPagina;
    const fim = inicio + cursosPorPagina;
    const cursosPagina = cursosFiltrados.slice(inicio, fim);

    window.setTimeout(() => {
        loading.classList.add('hidden');

        if (cursosPagina.length === 0) {
            semResultados.classList.remove('hidden');
            updatePaginationControls(0, 1);
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
                <a href="${curso.url}" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-yellow-500/50 hover:-translate-y-1 transition-all group-hover:scale-[1.02] w-full">
                    Ver detalhes <i data-lucide="arrow-right" class="w-6 h-6"></i>
                </a>
            `;
            grid.appendChild(card);
        });

        renderLucideIcons();
        updatePaginationControls(cursosFiltrados.length, totalPaginas);
    }, 250);
}

function updatePaginationControls(totalCursos, totalPaginas) {
    const totalCursosElement = document.getElementById('totalCursos');
    const paginaAtualElement = document.getElementById('paginaAtual');
    const totalPaginasElement = document.getElementById('totalPaginas');
    const btnProxima = document.getElementById('btnProxima');
    const btnAnterior = document.getElementById('btnAnterior');

    if (totalCursosElement) {
        totalCursosElement.textContent = `${totalCursos} curso${totalCursos !== 1 ? 's' : ''}`;
    }

    if (paginaAtualElement) {
        paginaAtualElement.textContent = String(currentPage);
    }

    if (totalPaginasElement) {
        totalPaginasElement.textContent = String(totalPaginas);
    }

    btnProxima?.toggleAttribute('disabled', currentPage >= totalPaginas);
    btnAnterior?.toggleAttribute('disabled', currentPage <= 1);
}

function filtrarCursos(categoria, options = {}) {
    const { preserveSearch = false, skipUrlUpdate = false } = options;

    currentFilter = categoria;
    currentPage = 1;

    if (!preserveSearch) {
        searchTerm = '';
        const buscaInput = document.getElementById('buscaCursos');
        if (buscaInput) buscaInput.value = '';
    }

    document.querySelectorAll('.filter-btn').forEach(button => {
        const isActive = button.dataset.categoria === categoria;
        button.classList.toggle('bg-yellow-400', isActive);
        button.classList.toggle('text-white', isActive);
        button.classList.toggle('border-yellow-400', isActive);
        button.classList.toggle('bg-white', !isActive);
        button.classList.toggle('text-yellow-700', !isActive && button.dataset.categoria === '');
        button.classList.toggle('border-yellow-200', !isActive && button.dataset.categoria === '');
        button.classList.toggle('text-gray-600', !isActive && button.dataset.categoria !== '');
        button.classList.toggle('border-gray-200', !isActive && button.dataset.categoria !== '');
        button.classList.toggle('active', isActive);
    });

    if (!skipUrlUpdate) {
        syncCursosUrl();
    }

    renderCursos();
}

function debounceSearch(event) {
    window.clearTimeout(window.searchTimeout);
    window.searchTimeout = window.setTimeout(() => {
        searchTerm = event.target.value.trim();
        currentPage = 1;
        syncCursosUrl();
        renderCursos();
    }, 250);
}

function proximaPagina() {
    const totalPaginas = Math.max(1, Math.ceil(getCursosFiltrados().length / cursosPorPagina));
    if (currentPage >= totalPaginas) return;

    currentPage += 1;
    renderCursos();
}

function paginaAnterior() {
    if (currentPage <= 1) return;

    currentPage -= 1;
    renderCursos();
}

function limparBusca() {
    searchTerm = '';
    currentFilter = '';
    currentPage = 1;

    const buscaInput = document.getElementById('buscaCursos');
    if (buscaInput) buscaInput.value = '';

    syncCursosUrl();
    filtrarCursos('');
}

function getCursosFiltrados() {
    if (typeof cursosData === 'undefined') return [];

    return cursosData.filter(curso => {
        const matchCategoria = !currentFilter || curso.categoria === currentFilter;
        const termoNormalizado = normalizeText(searchTerm);
        const matchBusca = !termoNormalizado
            || normalizeText(curso.titulo).includes(termoNormalizado)
            || normalizeText(curso.descricao).includes(termoNormalizado);

        return matchCategoria && matchBusca;
    });
}

function syncCursosUrl() {
    if (!document.getElementById('gridCursos')) return;

    const params = new URLSearchParams();
    if (currentFilter) params.set('categoria', currentFilter);
    if (searchTerm) params.set('busca', searchTerm);

    const query = params.toString();
    const newUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
    window.history.replaceState({}, '', newUrl);
}

function getCategoryFromParam(param) {
    if (!param || typeof categorias === 'undefined') return '';

    const normalizedParam = normalizeText(param);

    const exactMatch = categorias.find(categoria => normalizeText(categoria) === normalizedParam);
    if (exactMatch) return exactMatch;

    const partialMatch = categorias.find(categoria =>
        normalizeText(categoria).includes(normalizedParam) || normalizedParam.includes(normalizeText(categoria))
    );

    return partialMatch || '';
}

function normalizeText(value) {
    return (value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}
