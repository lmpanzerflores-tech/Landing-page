// Data dos cursos para filtro/busca
const cursosData = [
  {
    id: 1,
    titulo: 'Carreira, Remuneração e Avaliação de Desempenho',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-carreiraremuneracaoeavaliacaodedesempenho.png',
    descricao: 'Aprenda a estruturar planos de carreira, políticas salariais e avaliações de desempenho eficazes.',
    url: 'https://go.hotmart.com/T101687724I'
  },
  {
    id: 2,
    titulo: 'CompraNet',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-compranet.png',
    descricao: 'Entenda como operar no sistema de compras públicas e participar de processos governamentais.',
    url: 'https://go.hotmart.com/Q101742690O'
  },
  {
    id: 3,
    titulo: 'Cultura e Clima Organizacional',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-culturaeclimaorganizacional.png',
    descricao: 'Desenvolva ambientes organizacionais saudáveis e aumente o engajamento da equipe.',
    url: 'https://go.hotmart.com/Q101743317O'
  },
  {
    id: 4,
    titulo: 'Custos e Formação de Preço de Vendas',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-custodeprecodevendas.jpeg',
    descricao: 'Aprenda a calcular custos e definir preços estratégicos para maximizar lucros.',
    url: 'https://go.hotmart.com/S101743883X'
  },
  {
    id: 5,
    titulo: 'Desenvolvimento e Treinamento',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-desenvolvimentoetreinamento.jpeg',
    descricao: 'Crie programas de capacitação eficientes para desenvolver talentos dentro da empresa.',
    url: 'https://go.hotmart.com/K101745609C'
  },
  {
    id: 6,
    titulo: 'Empreendedorismo',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-empreendedorismo.jpeg',
    descricao: 'Aprenda a criar, estruturar e expandir seu próprio negócio com estratégias práticas.',
    url: 'https://go.hotmart.com/K101745609C'
  },
  {
    id: 7,
    titulo: 'Gestão de Estoque',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-gestaodeestoque.png',
    descricao: 'Controle e otimize estoques, evitando perdas e melhorando a eficiência operacional.',
    url: 'https://go.hotmart.com/I101745975C'
  },
  {
    id: 8,
    titulo: 'Gestão Financeira',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-gestaofinanceira.png',
    descricao: 'Controle finanças, fluxo de caixa e investimentos para garantir a saúde do negócio.',
    url: 'https://go.hotmart.com/U101747065L'
  },
  {
    id: 9,
    titulo: 'Gestão Econômica',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-gestaoeconomica.png',
    descricao: 'Entenda conceitos econômicos aplicados à gestão empresarial e tomada de decisões.',
    url: 'https://go.hotmart.com/K101746770W'
  },
  {
    id: 10,
    titulo: 'LGPD',
    categoria: 'Direito',
    img: 'img/capas/logo-LGPD.png',
    descricao: 'Aprenda a Lei Geral de Proteção de Dados e como aplicá-la na sua empresa.',
    url: 'https://go.hotmart.com/W101759023C'
  },
  {
    id: 11,
    titulo: 'Licitação na Prática',
    categoria: 'Direito',
    img: 'img/capas/logo-licitacaonapratica.png',
    descricao: 'Domine processos licitatórios e participe de contratos públicos com segurança.',
    url: 'https://go.hotmart.com/W101759252L'
  },
  {
    id: 12,
    titulo: 'Noções Básicas de Direito Tributário',
    categoria: 'Direito',
    img: 'img/capas/logo-nocoesdedireitotributario.png',
    descricao: 'Entenda os principais impostos e obrigações fiscais no Brasil.',
    url: 'https://go.hotmart.com/Y101761450H'
  },
  {
    id: 13,
    titulo: 'Gestão de Tempo',
    categoria: 'Auto Ajuda e Desenvolvimento Humano',
    img: 'img/capas/logo-gestaodetempo.png',
    descricao: 'Organize tarefas e aumente sua produtividade com técnicas modernas de gestão de tempo.',
    url: 'https://go.hotmart.com/U101746365G'
  },
  {
    id: 14,
    titulo: 'Liderança Inspiradora',
    categoria: 'Auto Ajuda e Desenvolvimento Humano',
    img: 'img/capas/logo-liderancainspiradora.png',
    descricao: 'Desenvolva habilidades para liderar equipes com motivação e alta performance.',
    url: 'https://go.hotmart.com/S101760239B'
  },
  {
    id: 15,
    titulo: 'Objetivos, Metas e Foco',
    categoria: 'Auto Ajuda e Desenvolvimento Humano',
    img: 'img/capas/logo-objetivosmetasefocos.png',
    descricao: 'Defina metas claras e mantenha o foco para alcançar resultados consistentes.',
    url: 'https://go.hotmart.com/F101762203N'
  },
  {
    id: 16,
    titulo: 'Proatividade e Protagonismo',
    categoria: 'Auto Ajuda e Desenvolvimento Humano',
    img: 'img/capas/logo-proatividadeeprotagonismo.png',
    descricao: 'Desenvolva atitude proativa e assuma o controle da sua carreira e resultados.',
    url: 'https://go.hotmart.com/U101762952H'
  },
  {
    id: 17,
    titulo: 'Processo Decisório',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-processodecisorio.png',
    descricao: 'Aprenda técnicas para tomar decisões estratégicas com mais segurança e eficiência.',
    url: 'https://go.hotmart.com/H101763090X'
  },
  {
    id: 18,
    titulo: 'Recrutamento e Seleção',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-recrutamentoesecao.png',
    descricao: 'Atraia, selecione e contrate os melhores talentos para sua empresa.',
    url: 'https://go.hotmart.com/K101802668B'
  },
  {
    id: 19,
    titulo: 'Maquina de Vendas',
    categoria: 'Administração e Negócios',
    img: 'img/capas/logo-maquinadevendas.png',
    descricao: 'Melhore sua técnica de vendas e aprimore seu negócio.',
    url: 'https://go.hotmart.com/H87487330E'
  }
];

// Categorias únicas para filtros
const categorias = [...new Set(cursosData.map(curso => curso.categoria))].sort();

